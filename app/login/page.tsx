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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1">
            <span className="text-4xl font-bold" style={{ color: 'var(--on-surface)' }}>Fin</span>
            <span className="text-4xl font-bold gold-glow" style={{ color: 'var(--primary)' }}>AI</span>
          </div>
          <p className="mt-2" style={{ color: 'var(--on-surface-variant)' }}>Smart financial management</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--on-surface)' }}>Sign In</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: 'var(--on-surface-variant)' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg p-3 w-full focus:outline-none transition-colors"
                style={{
                  background: 'var(--surface-container)',
                  color: 'var(--on-surface)',
                  border: '1px solid rgba(197,160,89,0.15)',
                }}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: 'var(--on-surface-variant)' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg p-3 w-full focus:outline-none transition-colors"
                style={{
                  background: 'var(--surface-container)',
                  color: 'var(--on-surface)',
                  border: '1px solid rgba(197,160,89,0.15)',
                }}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg p-3 w-full font-medium transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: 'var(--primary)',
                color: '#0A0A0F',
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <Link
              href="/signup"
              className="text-sm hover:underline block"
              style={{ color: 'var(--primary)' }}
            >
              Create Account
            </Link>
            <button
              onClick={handleDemo}
              className="w-full rounded-lg p-3 text-sm font-medium transition-all hover:opacity-80"
              style={{
                border: '1px solid rgba(197,160,89,0.3)',
                color: 'var(--primary)',
                background: 'rgba(197,160,89,0.05)',
              }}
            >
              Try Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
