"use client";

import DashboardLayout from "@/components/DashboardLayout";
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

const stats = [
  {
    label: "Total Balance",
    value: `$${DEMO_BALANCE.toLocaleString()}`,
    icon: DollarSign,
    change: "+2.4%",
    positive: true,
  },
  {
    label: "Monthly Income",
    value: "$4,200.00",
    icon: TrendingUp,
    change: "+4.1%",
    positive: true,
  },
  {
    label: "Monthly Spend",
    value: "$277.88",
    icon: TrendingDown,
    change: "-12.3%",
    positive: true,
  },
  {
    label: "Savings Rate",
    value: "34%",
    icon: PiggyBank,
    change: "+5.2%",
    positive: true,
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">{stat.label}</span>
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <stat.icon size={18} className="text-accent" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p
                className={`text-xs mt-1 ${
                  stat.positive ? "text-positive" : "text-negative"
                }`}
              >
                {stat.change} from last month
              </p>
            </div>
          ))}
        </div>

        {/* Balance History Chart */}
        <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">
            Balance History
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={DEMO_BALANCE_HISTORY}>
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#818CF8" stopOpacity={0} />
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
                  backgroundColor: "#1E1F30",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, "Balance"]}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#818CF8"
                strokeWidth={2}
                fill="url(#balanceGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-base font-semibold text-white mb-4">
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
                      backgroundColor: `${CATEGORY_COLORS[tx.category] || "#818CF8"}20`,
                      color: CATEGORY_COLORS[tx.category] || "#818CF8",
                    }}
                  >
                    {tx.merchant[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">
                      {tx.merchant}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${CATEGORY_COLORS[tx.category] || "#818CF8"}15`,
                          color: CATEGORY_COLORS[tx.category] || "#818CF8",
                        }}
                      >
                        {tx.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {format(parseISO(tx.date), "MMM d")}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      tx.amount > 0 ? "text-positive" : "text-negative"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Spending by Category */}
          <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-base font-semibold text-white mb-4">
              Spending by Category
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
                    <span className="text-gray-300 text-sm">{value}</span>
                  )}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E1F30",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
