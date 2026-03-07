"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  const handleDemo = () => {
    localStorage.setItem("demoMode", "true");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1">
            <span className="text-4xl font-bold text-white">Fin</span>
            <span className="text-4xl font-bold text-accent">AI</span>
          </div>
          <p className="text-gray-400 mt-2">Smart financial management</p>
        </div>

        <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Sign In</h2>

          {error && (
            <div className="bg-negative/10 border border-negative/20 text-negative text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-surface border border-white/10 rounded-lg p-3 w-full text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-surface border border-white/10 rounded-lg p-3 w-full text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-accent text-white rounded-lg p-3 w-full font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <Link
              href="/signup"
              className="text-accent text-sm hover:underline block"
            >
              Create Account
            </Link>
            <button
              onClick={handleDemo}
              className="w-full border border-accent text-accent rounded-lg p-3 text-sm font-medium hover:bg-accent/10 transition-colors"
            >
              Try Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
