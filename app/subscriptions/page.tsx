"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { DEMO_SUBSCRIPTIONS } from "@/lib/demo";
import { CreditCard, Calendar, Hash, PiggyBank } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";

const monthlyBurn = DEMO_SUBSCRIPTIONS.reduce((s, sub) => s + sub.price, 0);
const annualCost = monthlyBurn * 12;

const pieData = DEMO_SUBSCRIPTIONS.map((s) => ({
  name: s.name,
  value: s.price,
  color: s.color,
}));

const stats = [
  { label: "Monthly Burn", value: `$${monthlyBurn.toFixed(2)}`, icon: CreditCard },
  { label: "Annual Cost", value: `$${annualCost.toFixed(2)}`, icon: Calendar },
  { label: "Active Subscriptions", value: DEMO_SUBSCRIPTIONS.length.toString(), icon: Hash },
  { label: "Potential Savings", value: "$23.40", icon: PiggyBank },
];

export default function SubscriptionsPage() {
  return (
    <DashboardLayout title="Subscriptions">
      <div className="space-y-6">
        {/* Stats */}
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
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subscription Cards */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">Active Subscriptions</h3>
            {DEMO_SUBSCRIPTIONS.map((sub) => (
              <div
                key={sub.id}
                className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold"
                    style={{ backgroundColor: `${sub.color}20`, color: sub.color }}
                  >
                    {sub.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{sub.name}</p>
                    <p className="text-xs text-gray-500">
                      Renews {format(parseISO(sub.renewalDate), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-semibold text-white">
                    ${sub.price.toFixed(2)}/mo
                  </p>
                  <button className="text-xs text-negative hover:underline">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pie Chart */}
          <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-base font-semibold text-white mb-4">
              Cost Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend formatter={(value) => <span className="text-gray-300 text-sm">{value}</span>} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E1F30", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                  formatter={(value) => [`$${Number(value).toFixed(2)}/mo`, "Cost"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
