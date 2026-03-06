"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BarChart2,
  MessageSquare,
  List,
  RefreshCw,
  Settings,
  LogOut,
  X,
  Fuel,
  ShoppingCart,
  Coffee,
  Dumbbell,
  Home,
  Car,
  Plane,
  Music,
  Gamepad2,
  Heart,
  Zap,
  Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DEMO_USER } from "@/lib/demo";
import { loadCustomTabs, CustomTab } from "@/lib/aiProviders";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard, BarChart2, MessageSquare, List, RefreshCw, Settings,
  Fuel, ShoppingCart, Coffee, Dumbbell, Home, Car, Plane, Music, Gamepad2, Heart, Zap, Package,
};

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || BarChart2;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BarChart2, label: "Analytics", href: "/analytics" },
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: List, label: "Transactions", href: "/transactions" },
  { icon: RefreshCw, label: "Subscriptions", href: "/subscriptions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [customTabs, setCustomTabs] = useState<CustomTab[]>([]);

  useEffect(() => {
    const load = () => setCustomTabs(loadCustomTabs());
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("demoMode");
    router.push("/login");
  };

  const initials = DEMO_USER.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-bg border-r border-white/[0.06] flex flex-col transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <h1 className="text-xl font-bold">
            <span className="text-white">Fin</span>
            <span className="text-accent">AI</span>
          </h1>
          <button onClick={onClose} className="lg:hidden text-gray-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            );
          })}

          {customTabs.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 px-2">
                My Tabs
              </p>
              {customTabs.map((tab) => {
                const Icon = getIcon(tab.icon);
                const href = `/custom/${tab.id}`;
                const active = pathname?.includes(tab.id);
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      router.push(href);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-medium">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {DEMO_USER.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {DEMO_USER.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
