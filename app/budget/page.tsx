"use client";

import { useState } from "react";
import { useExpenses } from "@/store/useExpenses";
import { useTrips } from "@/store/useTrips";
import { useHydrated } from "@/hooks/useHydrated";
import { analyzeExpenses } from "@/services/budget";
import { seedTrips } from "@/data/seed";
import { sortTrips } from "@/services/trips";
import { formatInr } from "@/lib/format";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/Button";
import { ExpenseForm } from "@/features/budget/ExpenseForm";
import { BudgetAnalyticsView } from "@/features/budget/BudgetAnalyticsView";

export default function BudgetPage() {
  const hydrated = useHydrated();
  const trips = useTrips((s) => s.trips);
  const allExpenses = useExpenses((s) => s.expenses);
  const removeExpense = useExpenses((s) => s.removeExpense);
  const [adding, setAdding] = useState(false);

  const displayTrips = hydrated ? trips : seedTrips;
  const active =
    sortTrips(displayTrips).find((t) => t.status !== "past") ??
    sortTrips(displayTrips)[0];

  if (!active) {
    return (
      <div>
        <PageHeader title="Budget" />
        <p className="mt-10 px-5 text-center text-slate-500 sm:px-8">
          Create a trip first to start tracking expenses.
        </p>
      </div>
    );
  }

  const expenses = allExpenses.filter((e) => e.tripId === active.id);
  const analytics = analyzeExpenses(expenses);

  return (
    <div>
      <PageHeader
        title="Budget"
        subtitle={active.name}
        action={
          <Button size="sm" onClick={() => setAdding((v) => !v)}>
            {adding ? "Close" : "Add"}
          </Button>
        }
      />

      {adding && (
        <div className="mt-4 px-5 sm:px-8">
          <ExpenseForm tripId={active.id} onAdded={() => setAdding(false)} />
        </div>
      )}

      <div className="mt-6 px-5 sm:px-8">
        <BudgetAnalyticsView data={analytics} />
      </div>

      <section className="mt-6 space-y-3 px-5 sm:px-8">
        <h2 className="text-sm font-medium text-slate-300">Expenses</h2>
        {expenses.length === 0 ? (
          <p className="text-sm text-slate-500">No expenses logged yet.</p>
        ) : (
          expenses.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-white">
                  {e.merchant ?? e.category}
                </p>
                <p className="text-xs text-slate-500">
                  {e.date} · {e.category.toUpperCase()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-emerald-400">
                  {formatInr(e.inrAmount)}
                </span>
                <button
                  onClick={() => removeExpense(e.id)}
                  className="text-xs text-slate-600 hover:text-red-400"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
