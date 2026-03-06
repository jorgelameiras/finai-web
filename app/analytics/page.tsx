"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  DEMO_SPENDING,
  DEMO_MONTHLY_SPENDING,
} from "@/lib/demo";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { TrendingDown, Lightbulb, ArrowUpRight } from "lucide-react";

const timeTabs = ["7D", "1M", "3M", "6M", "1Y"];

const spendingTrend = [
  { day: "Mon", amount: 45 },
  { day: "Tue", amount: 120 },
  { day: "Wed", amount: 80 },
  { day: "Thu", amount: 35 },
  { day: "Fri", amount: 200 },
  { day: "Sat", amount: 150 },
  { day: "Sun", amount: 60 },
];

const insights = [
  {
    title: "Spending Alert",
    description: "Your entertainment spending is 23% higher than last month. Consider reviewing subscriptions.",
    icon: TrendingDown,
  },
  {
    title: "Savings Opportunity",
    description: "You could save $45/month by switching to annual billing on 3 subscriptions.",
    icon: Lightbulb,
  },
  {
    title: "Income Trend",
    description: "Your income has grown 12% over the past 6 months. Great progress!",
    icon: ArrowUpRight,
  },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("1M");

  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6">
        {/* Time Tabs */}
        <div className="flex gap-2">
          {timeTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-accent text-white"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Spending Trend */}
        <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">
            Spending Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={spendingTrend}>
              <defs>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#818CF8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1E1F30", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                formatter={(value) => [`$${value}`, "Spending"]}
              />
              <Area type="monotone" dataKey="amount" stroke="#818CF8" strokeWidth={2} fill="url(#spendGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Bar Chart */}
          <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-base font-semibold text-white mb-4">
              By Category
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={DEMO_SPENDING} layout="vertical">
                <XAxis type="number" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="name" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} width={90} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E1F30", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                  formatter={(value) => [`${value}%`, "Share"]}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                  {DEMO_SPENDING.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Month Comparison */}
          <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-base font-semibold text-white mb-4">
              Monthly Comparison
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={DEMO_MONTHLY_SPENDING}>
                <XAxis dataKey="month" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E1F30", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Spending"]}
                />
                <Bar dataKey="amount" fill="#818CF8" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight) => (
            <div
              key={insight.title}
              className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-5 border-l-4 border-l-accent"
            >
              <div className="flex items-center gap-2 mb-2">
                <insight.icon size={18} className="text-accent" />
                <h4 className="text-sm font-semibold text-white">
                  {insight.title}
                </h4>
              </div>
              <p className="text-sm text-gray-400">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
