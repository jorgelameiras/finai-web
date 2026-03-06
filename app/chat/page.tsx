"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { Bot, Send, Loader2 } from "lucide-react";
import { loadAIConfig, saveCustomTab, CustomTab } from "@/lib/aiProviders";
import { DEMO_TRANSACTIONS } from "@/lib/demo";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  time: string;
  isAction?: boolean;
}

const SUGGESTIONS = [
  "Where did I spend the most this month?",
  "How much have I spent on subscriptions?",
  "Give me 3 tips to save money",
  "What is my biggest expense category?",
  "Create a tab to track my gas spending",
  "Add a coffee shop tracker",
];

const TX_KEYWORDS = ["gas", "coffee", "uber", "amazon", "starbucks", "netflix", "spotify", "whole foods", "grocery", "food", "transport", "shopping", "entertainment", "health", "fitness"];

function formatTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

function parseAction(text: string): { clean: string; action: { action: string; label: string; icon?: string; description?: string; categoryFilter?: string; keywordFilter?: string; chartType?: string } | null } {
  const match = text.match(/\[FINAI_ACTION\]([\s\S]*?)\[\/FINAI_ACTION\]/);
  if (!match) return { clean: text, action: null };
  try {
    const action = JSON.parse(match[1]);
    const clean = text.replace(match[0], "").trim();
    return { clean, action };
  } catch {
    return { clean: text, action: null };
  }
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasAI, setHasAI] = useState<boolean | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setHasAI(!!loadAIConfig());
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const config = loadAIConfig();
    if (!config) {
      setHasAI(false);
      return;
    }

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text: text.trim(), time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Filter transactions by keyword if message relates to spending
    const lowerMsg = text.toLowerCase();
    const relevantTx = DEMO_TRANSACTIONS.filter((t) => {
      const merchant = t.merchant.toLowerCase();
      const category = t.category.toLowerCase();
      return TX_KEYWORDS.some((kw) => lowerMsg.includes(kw) && (merchant.includes(kw) || category.includes(kw)));
    });

    let aiText = "Sorry, I am having trouble connecting. Please try again.";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          provider: config.provider,
          apiKey: config.apiKey,
          openclawUrl: config.openclawUrl,
          transactions: relevantTx.length > 0 ? relevantTx : undefined,
        }),
      });
      const data = await res.json();
      if (data.error) {
        aiText = `Error: ${data.error}`;
      } else {
        aiText = data.text || aiText;
      }
    } catch (err) {
      console.error("Chat API error:", err);
    }

    // Parse for action blocks
    const { clean, action } = parseAction(aiText);

    const aiMsg: Message = { id: crypto.randomUUID(), role: "ai", text: clean, time: formatTime() };
    setMessages((prev) => [...prev, aiMsg]);

    if (action && action.action === "create_tab") {
      const tab: CustomTab = {
        id: crypto.randomUUID(),
        label: action.label,
        icon: action.icon || "BarChart2",
        description: action.description || "",
        categoryFilter: action.categoryFilter,
        keywordFilter: action.keywordFilter,
        chartType: (action.chartType as "line" | "bar" | "pie") || "bar",
        createdAt: new Date().toISOString(),
      };
      saveCustomTab(tab);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          text: `Created new tab: **${tab.label}**. Check the sidebar!`,
          time: formatTime(),
          isAction: true,
        },
      ]);
      window.dispatchEvent(new Event("storage"));
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  if (hasAI === null) {
    return <DashboardLayout title="AI Assistant"><div /></DashboardLayout>;
  }

  return (
    <DashboardLayout title="AI Assistant">
      <div className="flex flex-col h-[calc(100vh-7rem)] -m-6">
        {/* Header badge */}
        <div className="px-6 py-3 border-b border-white/[0.06] flex items-center gap-2 shrink-0">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {hasAI ? `Connected: ${loadAIConfig()?.provider || "AI"}` : "No AI Connected"}
          </span>
        </div>

        {/* Chat area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {!hasAI ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mb-5">
                <Bot size={48} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Connect your AI first</h3>
              <p className="text-gray-400 text-sm max-w-md mb-6">
                Go to Settings to plug in Claude, ChatGPT, or OpenClaw
              </p>
              <button
                onClick={() => router.push("/settings")}
                className="px-6 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/80 transition-colors"
              >
                Go to Settings
              </button>
            </div>
          ) : messages.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mb-5">
                <Bot size={48} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Ask me anything about your finances
              </h3>
              <p className="text-gray-400 text-sm max-w-md mb-6">
                I can analyze your spending, find savings opportunities, create custom tracking tabs, and answer questions about your money.
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "ai" && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-1 shrink-0 ${msg.isAction ? "bg-green-500/20 text-green-400" : "bg-indigo-500/20 text-indigo-400"}`}>
                      {msg.isAction ? "\u2713" : "F"}
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent/20 border border-accent/30 text-white rounded-2xl rounded-br-sm"
                        : msg.isAction
                        ? "bg-green-500/10 border border-green-500/20 text-green-300 rounded-2xl rounded-bl-sm"
                        : "bg-surface/50 border border-white/[0.06] text-gray-200 rounded-2xl rounded-bl-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{renderText(msg.text)}</div>
                    <p className={`text-[10px] mt-1.5 ${msg.role === "user" ? "text-accent/50" : "text-gray-500"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold mr-2 mt-1 shrink-0">
                    F
                  </div>
                  <div className="bg-surface/50 border border-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input bar */}
        {hasAI && (
          <div className="px-6 py-4 border-t border-white/[0.06] shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your finances..."
                disabled={loading}
                className="flex-1 resize-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="h-11 w-11 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors shrink-0"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
