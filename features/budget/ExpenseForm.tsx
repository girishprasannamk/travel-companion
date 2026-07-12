"use client";

import { useState } from "react";
import { useTrips } from "@/store/useTrips";
import { useExpenses } from "@/store/useExpenses";
import {
  EXPENSE_CATEGORIES,
  EXPENSE_CATEGORY_LABELS,
  PAYMENT_METHODS,
  type ExpenseCategory,
  type PaymentMethod,
  type NewExpenseInput,
} from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function ExpenseForm({ tripId, onAdded }: { tripId: string; onAdded?: () => void }) {
  const addExpense = useExpenses((s) => s.addExpense);
  const trips = useTrips((s) => s.trips);
  const trip = trips.find((t) => t.id === tripId);
  const [date, setDate] = useState(trip?.startDate ?? "");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState("1");
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [merchant, setMerchant] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
  const [notes, setNotes] = useState("");

  function submit() {
    const amt = parseFloat(amount);
    if (!date || Number.isNaN(amt)) return;
    const input: NewExpenseInput = {
      tripId,
      date,
      amount: amt,
      currency,
      exchangeRate: parseFloat(exchangeRate) || 1,
      category,
      merchant: merchant || undefined,
      paymentMethod: paymentMethod || undefined,
      notes: notes || undefined,
    };
    addExpense(input);
    setAmount("");
    setMerchant("");
    setNotes("");
    onAdded?.();
  }

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-slate-400">
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            />
          </label>
          <label className="text-xs text-slate-400">
            Amount
            <input
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            />
          </label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <label className="text-xs text-slate-400">
            Currency
            <input
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            />
          </label>
          <label className="text-xs text-slate-400">
            Rate → INR
            <input
              type="number"
              inputMode="decimal"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            />
          </label>
          <label className="text-xs text-slate-400">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            >
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {EXPENSE_CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-slate-400">
            Merchant
            <input
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            />
          </label>
          <label className="text-xs text-slate-400">
            Payment
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            >
              <option value="">—</option>
              {PAYMENT_METHODS.map((p) => (
                <option key={p} value={p}>
                  {p.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-xs text-slate-400">
          Notes
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
          />
        </label>
        <Button className="w-full" onClick={submit}>
          Add Expense
        </Button>
      </CardContent>
    </Card>
  );
}
