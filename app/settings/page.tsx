"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { DEMO_USER } from "@/lib/demo";
import { LogOut, Bot, Trash2 } from "lucide-react";
import {
  AIProvider,
  AI_PROVIDERS,
  loadAIConfig,
  saveAIConfig,
  loadCustomTabs,
  deleteCustomTab,
  CustomTab,
} from "@/lib/aiProviders";

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors relative ${
        enabled ? "bg-accent" : "bg-white/10"
      }`}
    >
      <span
        className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
          enabled ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [push, setPush] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [privacy, setPrivacy] = useState(true);

  // AI Config
  const [aiProvider, setAiProvider] = useState<AIProvider>("claude");
  const [aiKey, setAiKey] = useState("");
  const [openclawUrl, setOpenclawUrl] = useState("");
  const [aiSaved, setAiSaved] = useState(false);
  const [customTabs, setCustomTabs] = useState<CustomTab[]>([]);
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "ok" | "error">("idle");

  useEffect(() => {
    const config = loadAIConfig();
    if (config) {
      setAiProvider(config.provider);
      setAiKey(config.apiKey);
      setOpenclawUrl(config.openclawUrl || "");
    }
    setCustomTabs(loadCustomTabs());
  }, []);

  const initials = DEMO_USER.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const handleSignOut = () => {
    localStorage.removeItem("demoMode");
    router.push("/login");
  };

  const saveAI = () => {
    saveAIConfig({ provider: aiProvider, apiKey: aiKey, openclawUrl });
    setAiSaved(true);
    setTimeout(() => setAiSaved(false), 2000);
  };

  const testConnection = async () => {
    setTestStatus("testing");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: 'Say "connected" in one word',
          provider: aiProvider,
          apiKey: aiKey,
          openclawUrl,
        }),
      });
      const data = await res.json();
      setTestStatus(data.text ? "ok" : "error");
    } catch {
      setTestStatus("error");
    }
    setTimeout(() => setTestStatus("idle"), 3000);
  };

  const handleDeleteTab = (id: string) => {
    deleteCustomTab(id);
    setCustomTabs(loadCustomTabs());
    window.dispatchEvent(new Event("storage"));
  };

  const selectedProvider = AI_PROVIDERS.find((p) => p.id === aiProvider);

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl space-y-6">
        {/* AI Assistant */}
        <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bot size={20} className="text-accent" />
            <h3 className="text-base font-semibold text-white">AI Assistant</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Provider</label>
              <select
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value as AIProvider)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 appearance-none"
              >
                {AI_PROVIDERS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#13131F]">
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">API Key</label>
              <input
                type="password"
                value={aiKey}
                onChange={(e) => setAiKey(e.target.value)}
                placeholder={selectedProvider?.placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent/50"
              />
            </div>
            {aiProvider === "openclaw" && (
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">OpenClaw URL</label>
                <input
                  type="text"
                  value={openclawUrl}
                  onChange={(e) => setOpenclawUrl(e.target.value)}
                  placeholder="https://your-openclaw-instance.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent/50"
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <button
                onClick={testConnection}
                disabled={!aiKey || testStatus === "testing"}
                className="px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-300 hover:bg-white/5 transition-colors disabled:opacity-40"
              >
                {testStatus === "testing" ? "Testing..." : "Test Connection"}
              </button>
              <button
                onClick={saveAI}
                disabled={!aiKey}
                className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/80 transition-colors disabled:opacity-40"
              >
                {aiSaved ? "Saved!" : "Save"}
              </button>
              {testStatus === "ok" && (
                <span className="text-sm text-green-400">Connected!</span>
              )}
              {testStatus === "error" && (
                <span className="text-sm text-red-400">Connection failed</span>
              )}
            </div>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-base font-semibold text-white">My Custom Tabs</h3>
            {customTabs.length > 0 && (
              <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                {customTabs.length}
              </span>
            )}
          </div>
          {customTabs.length === 0 ? (
            <p className="text-sm text-gray-400">
              No custom tabs yet. Ask your AI to create one in the Chat!
            </p>
          ) : (
            <div className="space-y-3">
              {customTabs.map((tab) => (
                <div
                  key={tab.id}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <div>
                    <p className="text-sm text-white font-medium">{tab.label}</p>
                    <p className="text-xs text-gray-500">{tab.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTab(tab.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">Profile</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xl font-bold">
              {initials}
            </div>
            <div>
              <p className="text-lg font-medium text-white">{DEMO_USER.name}</p>
              <p className="text-sm text-gray-400">{DEMO_USER.email}</p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">Email Alerts</p>
                <p className="text-xs text-gray-500">Receive transaction alerts via email</p>
              </div>
              <Toggle enabled={emailAlerts} onToggle={() => setEmailAlerts(!emailAlerts)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">Push Notifications</p>
                <p className="text-xs text-gray-500">Get push notifications on your device</p>
              </div>
              <Toggle enabled={push} onToggle={() => setPush(!push)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">Weekly Summary</p>
                <p className="text-xs text-gray-500">Receive a weekly spending summary</p>
              </div>
              <Toggle enabled={weekly} onToggle={() => setWeekly(!weekly)} />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">Privacy</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">Data Sharing</p>
              <p className="text-xs text-gray-500">Allow anonymous data for AI improvements</p>
            </div>
            <Toggle enabled={privacy} onToggle={() => setPrivacy(!privacy)} />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-[rgba(30,31,48,0.8)] border border-negative/20 rounded-xl p-6">
          <h3 className="text-base font-semibold text-negative mb-2">Danger Zone</h3>
          <p className="text-sm text-gray-400 mb-4">
            Permanently delete your account and all associated data.
          </p>
          <button className="bg-negative/10 text-negative px-4 py-2 rounded-lg text-sm font-medium hover:bg-negative/20 transition-colors">
            Delete Account
          </button>
        </div>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 bg-white/5 text-gray-300 px-4 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors w-full justify-center"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </DashboardLayout>
  );
}
