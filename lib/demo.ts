export const DEMO_USER = {
  name: "Alex Chen",
  email: "demo@finai.app",
};

export const DEMO_BALANCE = 12840.5;

export const DEMO_TRANSACTIONS = [
  { id: 1, merchant: "Whole Foods", amount: -127.43, category: "Groceries", date: "2026-03-04", notes: "" },
  { id: 2, merchant: "Netflix", amount: -15.99, category: "Entertainment", date: "2026-03-03", notes: "" },
  { id: 3, merchant: "Salary", amount: 4200, category: "Income", date: "2026-03-01", notes: "Monthly salary" },
  { id: 4, merchant: "Uber", amount: -23.5, category: "Transport", date: "2026-02-28", notes: "" },
  { id: 5, merchant: "Spotify", amount: -9.99, category: "Entertainment", date: "2026-02-27", notes: "" },
  { id: 6, merchant: "Starbucks", amount: -8.75, category: "Food", date: "2026-02-26", notes: "" },
  { id: 7, merchant: "Amazon", amount: -67.23, category: "Shopping", date: "2026-02-25", notes: "" },
  { id: 8, merchant: "Planet Fitness", amount: -24.99, category: "Health", date: "2026-02-24", notes: "" },
];

export const DEMO_SUBSCRIPTIONS = [
  { id: 1, name: "Netflix", price: 15.99, category: "Entertainment", renewalDate: "2026-04-03", color: "#F97316" },
  { id: 2, name: "Spotify", price: 9.99, category: "Music", renewalDate: "2026-03-27", color: "#34D399" },
  { id: 3, name: "iCloud", price: 0.99, category: "Storage", renewalDate: "2026-03-15", color: "#22D3EE" },
  { id: 4, name: "Adobe Creative", price: 54.99, category: "Productivity", renewalDate: "2026-03-20", color: "#C084FC" },
];

export const DEMO_SPENDING = [
  { name: "Housing", value: 43, color: "#818CF8" },
  { name: "Food", value: 15, color: "#F97316" },
  { name: "Transport", value: 9, color: "#22D3EE" },
  { name: "Shopping", value: 7, color: "#C084FC" },
  { name: "Entertainment", value: 4, color: "#34D399" },
  { name: "Health", value: 3, color: "#F87171" },
];

export const DEMO_BALANCE_HISTORY = [
  { date: "Feb 27", balance: 12200 },
  { date: "Feb 28", balance: 12150 },
  { date: "Mar 01", balance: 16350 },
  { date: "Mar 02", balance: 16280 },
  { date: "Mar 03", balance: 16264 },
  { date: "Mar 04", balance: 12840 },
  { date: "Mar 05", balance: 12840.5 },
];

export const DEMO_MONTHLY_SPENDING = [
  { month: "Oct", amount: 2800 },
  { month: "Nov", amount: 3100 },
  { month: "Dec", amount: 3400 },
  { month: "Jan", amount: 2900 },
  { month: "Feb", amount: 2750 },
  { month: "Mar", amount: 1200 },
];

export const CATEGORY_COLORS: Record<string, string> = {
  Groceries: "#34D399",
  Entertainment: "#818CF8",
  Income: "#22D3EE",
  Transport: "#F97316",
  Food: "#F87171",
  Shopping: "#C084FC",
  Health: "#F43F5E",
  Housing: "#818CF8",
  Music: "#34D399",
  Storage: "#22D3EE",
  Productivity: "#C084FC",
};
