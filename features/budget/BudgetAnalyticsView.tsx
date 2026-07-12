"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { BudgetAnalytics } from "@/services/budget";
import { formatInr } from "@/lib/format";
import { EXPENSE_CATEGORY_LABELS, type ExpenseCategory } from "@/types";

const COLORS = [
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#ec4899",
  "#06b6d4",
  "#ef4444",
  "#84cc16",
  "#a855f7",
];

export function BudgetAnalyticsView({ data }: { data: BudgetAnalytics }) {
  const pie = data.categoryTotals.map((c) => ({
    name: c.label,
    value: c.inr,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Trip total</p>
          <p className="font-heading text-2xl font-semibold">
            {formatInr(data.tripTotal)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Categories</p>
          <p className="font-heading text-2xl font-semibold">
            {data.categoryTotals.length}
          </p>
        </div>
      </div>

      {pie.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="mb-2 text-sm text-slate-300">By category</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pie}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {pie.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => formatInr(Number(v))}
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: 12,
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-3 space-y-1">
            {data.categoryTotals.map((c, i) => (
              <li
                key={c.category}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2 text-slate-300">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: COLORS[i % COLORS.length] }}
                  />
                  {EXPENSE_CATEGORY_LABELS[c.category as ExpenseCategory]}
                </span>
                <span className="text-slate-400">{formatInr(c.inr)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.dailyTotals.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="mb-2 text-sm text-slate-300">Daily spend</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data.dailyTotals}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#64748b", fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} width={40} />
              <Tooltip
                formatter={(v) => formatInr(Number(v))}
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: 12,
                  color: "#fff",
                }}
              />
              <Bar dataKey="inr" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
