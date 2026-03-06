"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { loadCustomTabs, CustomTab } from "@/lib/aiProviders";
import { DEMO_TRANSACTIONS } from "@/lib/demo";
import DashboardLayout from "@/components/DashboardLayout";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CHART_COLORS = ["#818CF8", "#C084FC", "#34D399", "#F97316", "#22D3EE", "#F87171"];

export default function CustomTabPage() {
  const { tabId } = useParams();
  const [tab, setTab] = useState<CustomTab | null>(null);

  useEffect(() => {
    const tabs = loadCustomTabs();
    const found = tabs.find((t) => t.id === tabId);
    setTab(found || null);
  }, [tabId]);

  if (!tab)
    return (
      <DashboardLayout title="Tab not found">
        <p className="text-gray-400">This tab doesn&apos;t exist.</p>
      </DashboardLayout>
    );

  const filtered = DEMO_TRANSACTIONS.filter((t) => {
    const merchant = t.merchant.toLowerCase();
    const category = t.category.toLowerCase();
    const kw = tab.keywordFilter?.toLowerCase() || "";
    const cat = tab.categoryFilter?.toLowerCase() || "";
    return (kw && merchant.includes(kw)) || (cat && category.includes(cat)) || (!kw && !cat);
  });

  const total = filtered.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const avg = filtered.length > 0 ? total / filtered.length : 0;

  const chartData = filtered.map((t) => ({
    date: t.date,
    amount: Math.abs(t.amount),
    name: t.merchant,
  }));

  const renderChart = () => {
    if (filtered.length === 0) return null;

    if (tab.chartType === "line") {
      return (
        <LineChart data={chartData}>
          <XAxis dataKey="name" stroke="#6B7280" tick={{ fontSize: 12 }} />
          <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
          <Tooltip
            contentStyle={{ background: "#13131F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(v: any) => [`$${v}`, "Amount"]}
          />
          <Line type="monotone" dataKey="amount" stroke="#818CF8" strokeWidth={2} dot={{ fill: "#818CF8" }} />
        </LineChart>
      );
    }

    if (tab.chartType === "pie") {
      return (
        <PieChart>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Pie data={chartData} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }: any) => `${name}: $${value}`}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "#13131F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(v: any) => [`$${v}`, "Amount"]}
          />
        </PieChart>
      );
    }

    return (
      <BarChart data={chartData}>
        <XAxis dataKey="name" stroke="#6B7280" tick={{ fontSize: 12 }} />
        <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
        <Tooltip
          contentStyle={{ background: "#13131F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(v: any) => [`$${v}`, "Amount"]}
        />
        <Bar dataKey="amount" fill="#818CF8" radius={[4, 4, 0, 0]} />
      </BarChart>
    );
  };

  return (
    <DashboardLayout title={tab.label}>
      <p className="text-gray-400 mb-6">{tab.description}</p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface/50 border border-white/[0.06] rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Spent</p>
          <p className="text-2xl font-bold text-negative mt-1">${total.toFixed(2)}</p>
        </div>
        <div className="bg-surface/50 border border-white/[0.06] rounded-xl p-4">
          <p className="text-gray-400 text-sm">Transactions</p>
          <p className="text-2xl font-bold text-white mt-1">{filtered.length}</p>
        </div>
        <div className="bg-surface/50 border border-white/[0.06] rounded-xl p-4">
          <p className="text-gray-400 text-sm">Avg per Transaction</p>
          <p className="text-2xl font-bold text-accent mt-1">${avg.toFixed(2)}</p>
        </div>
      </div>

      {/* Chart */}
      {filtered.length > 0 ? (
        <div className="bg-surface/50 border border-white/[0.06] rounded-xl p-6 mb-6">
          <h3 className="text-white font-semibold mb-4">Spending Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            {renderChart()!}
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="bg-surface/50 border border-white/[0.06] rounded-xl p-6 mb-6 text-center text-gray-400">
          No transactions found for this category
        </div>
      )}

      {/* Transaction list */}
      <div className="bg-surface/50 border border-white/[0.06] rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Transactions</h3>
        {filtered.length === 0 ? (
          <p className="text-gray-400">No transactions found.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((t, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                    {t.merchant[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.merchant}</p>
                    <p className="text-gray-500 text-xs">{t.date}</p>
                  </div>
                </div>
                <span className={t.amount < 0 ? "text-negative font-semibold" : "text-positive font-semibold"}>
                  {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
