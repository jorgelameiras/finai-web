"use client";

import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { DEMO_TRANSACTIONS, CATEGORY_COLORS } from "@/lib/demo";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { format, parseISO } from "date-fns";

const categories = ["All", ...Array.from(new Set(DEMO_TRANSACTIONS.map((t) => t.category)))];
const PER_PAGE = 10;

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return DEMO_TRANSACTIONS.filter((tx) => {
      const matchSearch = tx.merchant.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || tx.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const exportCSV = () => {
    const header = "Date,Merchant,Category,Amount,Notes\n";
    const rows = filtered
      .map((tx) => `${tx.date},${tx.merchant},${tx.category},${tx.amount},"${tx.notes}"`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout title="Transactions">
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search transactions..."
              className="bg-surface border border-white/10 rounded-lg pl-9 pr-3 py-2.5 w-full text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="bg-surface border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent appearance-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/20 transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-[rgba(30,31,48,0.8)] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Date</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Merchant</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Category</th>
                  <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((tx) => (
                  <tr key={tx.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {format(parseISO(tx.date), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-sm text-white font-medium">{tx.merchant}</td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${CATEGORY_COLORS[tx.category] || "#818CF8"}15`,
                          color: CATEGORY_COLORS[tx.category] || "#818CF8",
                        }}
                      >
                        {tx.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-medium text-right ${tx.amount > 0 ? "text-positive" : "text-negative"}`}>
                      {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{tx.notes || "—"}</td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.06]">
            <p className="text-sm text-gray-400">
              {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-gray-400">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
