"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import FeatureGate from "@/components/FeatureGate";
import ThemeToggle from "@/components/ThemeToggle";
import {
  DEMO_BALANCE,
  DEMO_TRANSACTIONS,
  DEMO_SPENDING,
  DEMO_BALANCE_HISTORY,
  CATEGORY_COLORS,
} from "@/lib/demo";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";
import { supabase } from "@/lib/supabase";
import { getProfile } from "@/lib/profile";

const stats = [
  {
    label: "Total Balance",
    value: `$${DEMO_BALANCE.toLocaleString()}`,
    icon: DollarSign,
    change: "+2.4%",
    positive: true,
    isKpi: true,
  },
  {
    label: "Monthly Income",
    value: "$4,200.00",
    icon: TrendingUp,
    change: "+4.1%",
    positive: true,
    isKpi: false,
  },
  {
    label: "Monthly Spend",
    value: "$277.88",
    icon: TrendingDown,
    change: "-12.3%",
    positive: true,
    isKpi: true,
  },
  {
    label: "Savings Rate",
    value: "34%",
    icon: PiggyBank,
    change: "+5.2%",
    positive: true,
    isKpi: false,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [hasAiKey, setHasAiKey] = useState(false);
  const [userName, setUserName] = useState<string | undefined>();

  useEffect(() => {
    const checkOnboarding = async () => {
      // Skip onboarding check for demo mode
      const demoMode = localStorage.getItem("demoMode");
      if (demoMode === "true") {
        setHasAiKey(!!localStorage.getItem("aiApiKey"));
        setReady(true);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      const profile = await getProfile(session.user.id);
      if (!profile || !profile.onboarding_complete) {
        router.push("/onboarding");
        return;
      }

      setUserName(profile.name);
      setHasAiKey(!!localStorage.getItem("aiApiKey"));
      setReady(true);
    };
    checkOnboarding();
  }, [router]);

  if (!ready) return null;

  return (
    <DashboardLayout title="Dashboard" userName={userName}>
      <div className="space-y-6">
        {/* Header with ThemeToggle */}
        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{stat.label}</span>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(197,160,89,0.1)' }}
                >
                  <stat.icon size={18} style={{ color: 'var(--primary)' }} />
                </div>
              </div>
              {stat.isKpi ? (
                <div className="indigo-glow rounded-lg">
                  <p className="text-2xl font-bold gold-glow" style={{ color: 'var(--primary)' }}>{stat.value}</p>
                </div>
              ) : (
                <p className="text-2xl font-bold" style={{ color: 'var(--on-surface)' }}>{stat.value}</p>
              )}
              <p
                className="text-xs mt-1"
                style={{ color: stat.positive ? '#34D399' : '#F87171' }}
              >
                {stat.change} from last month
              </p>
            </div>
          ))}
        </div>

        {/* Balance History Chart */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
            Balance History
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={DEMO_BALANCE_HISTORY}>
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C5A059" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#C5A059" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="#4B5563"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#4B5563"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F1F25",
                  border: "1px solid rgba(197,160,89,0.2)",
                  borderRadius: "8px",
                  color: "#E4E1E9",
                }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, "Balance"]}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#C5A059"
                strokeWidth={2}
                fill="url(#balanceGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
              Recent Transactions
            </h3>
            <div className="space-y-3">
              {DEMO_TRANSACTIONS.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center gap-3 py-2"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                    style={{
                      backgroundColor: `${CATEGORY_COLORS[tx.category] || "#C5A059"}20`,
                      color: CATEGORY_COLORS[tx.category] || "#C5A059",
                    }}
                  >
                    {tx.merchant[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                      {tx.merchant}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${CATEGORY_COLORS[tx.category] || "#C5A059"}15`,
                          color: CATEGORY_COLORS[tx.category] || "#C5A059",
                        }}
                      >
                        {tx.category}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                        {format(parseISO(tx.date), "MMM d")}
                      </span>
                    </div>
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: tx.amount > 0 ? '#34D399' : '#F87171' }}
                  >
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights — gated behind API key */}
          <FeatureGate
            unlocked={hasAiKey}
            message="Add your AI API key in Settings to unlock AI Insights"
          >
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
              AI Insights
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={DEMO_SPENDING}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {DEMO_SPENDING.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  formatter={(value) => (
                    <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem' }}>{value}</span>
                  )}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F1F25",
                    border: "1px solid rgba(197,160,89,0.2)",
                    borderRadius: "8px",
                    color: "#E4E1E9",
                  }}
                  formatter={(value) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          </FeatureGate>
        </div>
      </div>
    </DashboardLayout>
  );
}
