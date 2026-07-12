"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  computeInr,
  NewExpenseSchema,
  type Expense,
  type NewExpenseInput,
} from "@/types";

interface ExpenseState {
  expenses: Expense[];
  addExpense: (input: NewExpenseInput) => Expense;
  removeExpense: (id: string) => void;
  expensesForTrip: (tripId: string) => Expense[];
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `e_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export const useExpenses = create<ExpenseState>()(
  persist(
    (set, get) => ({
      expenses: [],
      addExpense: (input) => {
        const parsed = NewExpenseSchema.parse(input);
        const expense: Expense = {
          ...parsed,
          id: makeId(),
          inrAmount: computeInr(parsed.amount, parsed.exchangeRate),
        };
        set((s) => ({ expenses: [expense, ...s.expenses] }));
        return expense;
      },
      removeExpense: (id) =>
        set((s) => ({ expenses: s.expenses.filter((e) => e.id !== id) })),
      expensesForTrip: (tripId) =>
        get().expenses.filter((e) => e.tripId === tripId),
    }),
    { name: "tc.expenses.v1", version: 1 }
  )
);
