"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { DEMO_USER } from "@/lib/demo";
import { LogOut } from "lucide-react";

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

  const initials = DEMO_USER.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const handleSignOut = () => {
    localStorage.removeItem("demoMode");
    router.push("/login");
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl space-y-6">
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
          <h3 className="text-base font-semibold text-white mb-4">
            Notifications
          </h3>
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
          <h3 className="text-base font-semibold text-negative mb-2">
            Danger Zone
          </h3>
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
