"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { upsertProfile } from "@/lib/profile";

const TOTAL_STEPS = 6;

const goals = [
  { emoji: "💰", label: "Save more" },
  { emoji: "📉", label: "Get out of debt" },
  { emoji: "🧠", label: "Understand spending" },
  { emoji: "📈", label: "Build wealth" },
];

const incomeRanges = [
  "Under $2k",
  "$2k-$4k",
  "$4k-$7k",
  "$7k-$12k",
  "$12k+",
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [goal, setGoal] = useState("");
  const [name, setName] = useState("");
  const [incomeRange, setIncomeRange] = useState("");
  const [bankConnected, setBankConnected] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUserId(session.user.id);
    });
  }, []);

  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const finish = async () => {
    if (userId) {
      await upsertProfile({
        id: userId,
        name,
        goal,
        income_range: incomeRange,
        bank_connected: bankConnected,
        onboarding_complete: true,
      });
    }
    router.push("/dashboard");
  };

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-[#08080E] flex flex-col">
      {/* Progress bar */}
      <div className="h-1 w-full bg-white/5">
        <motion.div
          className="h-full bg-[#818CF8]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Back button */}
      {step >= 2 && step <= 5 && (
        <button
          onClick={back}
          className="absolute top-6 left-6 text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors z-10"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="rotate-180"
          >
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      )}

      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full max-w-lg"
          >
            {step === 1 && <StepWelcome onNext={next} />}
            {step === 2 && (
              <StepGoal goal={goal} setGoal={setGoal} onNext={next} />
            )}
            {step === 3 && (
              <StepName name={name} setName={setName} onNext={next} />
            )}
            {step === 4 && (
              <StepIncome
                incomeRange={incomeRange}
                setIncomeRange={setIncomeRange}
                onNext={next}
              />
            )}
            {step === 5 && (
              <StepBank
                onConnect={() => {
                  setBankConnected(true);
                  next();
                }}
                onSkip={next}
              />
            )}
            {step === 6 && <StepDone name={name} onFinish={finish} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Step 1: Welcome ── */
function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <h1 className="text-5xl font-bold">
          <span className="text-white">Fin</span>
          <span className="text-[#818CF8]">AI</span>
        </h1>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-gray-400 text-lg mb-10"
      >
        Your AI-powered financial companion
      </motion.p>
      <motion.button
        onClick={onNext}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="px-8 py-3 bg-[#818CF8] hover:bg-[#6E7BF5] text-white font-semibold rounded-xl transition-colors"
      >
        Get Started
      </motion.button>
    </div>
  );
}

/* ── Step 2: Goal ── */
function StepGoal({
  goal,
  setGoal,
  onNext,
}: {
  goal: string;
  setGoal: (g: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-white mb-8">
        What&apos;s your main financial goal?
      </h2>
      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        {goals.map((g, i) => (
          <motion.button
            key={g.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
            onClick={() => setGoal(g.label)}
            className={`p-5 rounded-xl border text-left transition-all ${
              goal === g.label
                ? "border-[#818CF8] bg-[#818CF8]/10 scale-[1.05] shadow-[0_0_20px_rgba(129,140,248,0.15)]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20"
            }`}
          >
            <span className="text-2xl block mb-2">{g.emoji}</span>
            <span className="text-white font-medium text-sm">{g.label}</span>
          </motion.button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!goal}
        className="px-8 py-3 bg-[#818CF8] hover:bg-[#6E7BF5] text-white font-semibold rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}

/* ── Step 3: Name ── */
function StepName({
  name,
  setName,
  onNext,
}: {
  name: string;
  setName: (n: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-white mb-8">
        What should we call you?
      </h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        autoFocus
        className="w-full max-w-xs px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#818CF8] transition-colors text-center text-lg"
      />
      <button
        onClick={onNext}
        disabled={!name.trim()}
        className="mt-8 px-8 py-3 bg-[#818CF8] hover:bg-[#6E7BF5] text-white font-semibold rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}

/* ── Step 4: Income ── */
function StepIncome({
  incomeRange,
  setIncomeRange,
  onNext,
}: {
  incomeRange: string;
  setIncomeRange: (r: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-white mb-8">
        Roughly, what&apos;s your monthly income?
      </h2>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {incomeRanges.map((range, i) => (
          <motion.button
            key={range}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            onClick={() => setIncomeRange(range)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              incomeRange === range
                ? "bg-[#818CF8] text-white"
                : "bg-white/[0.05] text-gray-300 border border-white/10 hover:border-white/20"
            }`}
          >
            {range}
          </motion.button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!incomeRange}
        className="px-8 py-3 bg-[#818CF8] hover:bg-[#6E7BF5] text-white font-semibold rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}

/* ── Step 5: Bank ── */
function StepBank({
  onConnect,
  onSkip,
}: {
  onConnect: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#818CF8]/10 flex items-center justify-center mb-6">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#818CF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">
        Connect your bank for real insights
      </h2>
      <p className="text-gray-400 text-sm mb-8 max-w-sm">
        Link your bank account so FinAI can analyze your real transactions and
        give personalized advice.
      </p>
      <button
        onClick={onConnect}
        className="px-8 py-3 bg-[#818CF8] hover:bg-[#6E7BF5] text-white font-semibold rounded-xl transition-colors mb-4"
      >
        Connect Bank Account
      </button>
      <button
        onClick={onSkip}
        className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
      >
        I&apos;ll do this later
      </button>
    </div>
  );
}

/* ── Step 6: Done ── */
function StepDone({
  name,
  onFinish,
}: {
  name: string;
  onFinish: () => void;
}) {
  const features = [
    { icon: "✅", label: "Spending overview", status: "Unlocked" },
    { icon: "✅", label: "AI chat", status: "Unlocked" },
    {
      icon: "🔒",
      label: "AI Insights",
      status: "Add your AI key to unlock",
    },
  ];

  return (
    <div className="flex flex-col items-center text-center">
      {/* Animated checkmark */}
      <div className="mb-6">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#818CF8"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.path
            d="M25 42 L35 52 L55 30"
            fill="none"
            stroke="#818CF8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
          />
        </svg>
      </div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-2xl font-bold text-white mb-8"
      >
        You&apos;re all set, {name}!
      </motion.h2>

      <div className="w-full space-y-3 mb-8">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
            className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4"
          >
            <span className="text-xl">{f.icon}</span>
            <span className="text-white font-medium text-sm flex-1 text-left">
              {f.label}
            </span>
            <span
              className={`text-xs ${
                f.icon === "🔒" ? "text-[#C084FC]" : "text-emerald-400"
              }`}
            >
              {f.status}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onFinish}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.4 }}
        className="px-8 py-3 bg-[#818CF8] hover:bg-[#6E7BF5] text-white font-semibold rounded-xl transition-colors"
      >
        Go to dashboard →
      </motion.button>
    </div>
  );
}
