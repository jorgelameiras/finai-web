"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
    } else if (data.user && data.user.identities && data.user.identities.length === 0) {
      setError("An account with this email already exists. Please sign in instead.");
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-white">Fin</span>
            <span className="text-accent">AI</span>
          </h1>
          <p className="text-gray-400 mt-2">Create your account</p>
        </div>

        <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Sign Up</h2>

          {error && (
            <div className="bg-negative/10 border border-negative/20 text-negative text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center space-y-4">
              <div className="text-5xl mb-2">📬</div>
              <h3 className="text-white font-semibold text-lg">Check your email</h3>
              <p className="text-gray-400 text-sm">
                We sent a confirmation link to <span className="text-accent">{email}</span>.
                Click it to activate your account and start using FinAI.
              </p>
              <p className="text-gray-500 text-xs">
                Didn't receive it? Check your spam folder or{" "}
                <button
                  onClick={() => { setSuccess(false); setEmail(""); setPassword(""); }}
                  className="text-accent hover:underline"
                >
                  try again
                </button>
              </p>
              <Link
                href="/login"
                className="text-accent text-sm hover:underline block mt-4"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-surface border border-white/10 rounded-lg p-3 w-full text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-surface border border-white/10 rounded-lg p-3 w-full text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-surface border border-white/10 rounded-lg p-3 w-full text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Create a password"
                  required
                  minLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-accent text-white rounded-lg p-3 w-full font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}

          {!success && (
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-accent text-sm hover:underline"
              >
                Already have an account? Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
