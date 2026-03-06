"use client";

import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Bot, Send, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  time: string;
}

const SYSTEM_CONTEXT =
  "You are FinAI, a personal finance assistant. The user is in demo mode with the following financial data: Balance: 12840.50, Monthly income: 4200, Monthly spend: 3200, Top categories: Housing 1850, Food 642, Transport 380, Shopping 280. Subscriptions: Netflix 15.99, Spotify 9.99, iCloud 0.99, Adobe 54.99. Be helpful, concise, and specific. Always reference their actual numbers.";

const SUGGESTIONS = [
  "Where did I spend the most this month?",
  "How much have I spent on subscriptions?",
  "Give me 3 tips to save money",
  "What is my biggest expense category?",
];

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

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text: text.trim(), time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    let aiText = "Sorry, I am having trouble connecting. Please try again.";
    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBVcv7P0VfotL40WoiQRUwqOeEl9sstjPE",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: SYSTEM_CONTEXT + "\n\nUser: " + text.trim() }] }],
          }),
        }
      );
      const data = await res.json();
      aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || aiText;
    } catch (err) {
      console.error('Gemini API error:', err);
      // fallback message already set
    }

    const aiMsg: Message = { id: crypto.randomUUID(), role: "ai", text: aiText, time: formatTime() };
    setMessages((prev) => [...prev, aiMsg]);
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

  return (
    <DashboardLayout title="AI Assistant">
      <div className="flex flex-col h-[calc(100vh-7rem)] -m-6">
        {/* Header badge */}
        <div className="px-6 py-3 border-b border-white/[0.06] flex items-center gap-2 shrink-0">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Powered by Gemini
          </span>
        </div>

        {/* Chat area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mb-5">
                <Bot size={48} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Ask me anything about your finances
              </h3>
              <p className="text-gray-400 text-sm max-w-md mb-6">
                I can analyze your spending, find savings opportunities, and answer questions about your money.
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
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold mr-2 mt-1 shrink-0">
                      F
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent/20 border border-accent/30 text-white rounded-2xl rounded-br-sm"
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
      </div>
    </DashboardLayout>
  );
}
