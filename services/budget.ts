import {
  type Expense,
  type ExpenseCategory,
  EXPENSE_CATEGORY_LABELS,
} from "@/types";

export interface CategoryTotal {
  category: ExpenseCategory;
  label: string;
  inr: number;
}

export interface DailyTotal {
  date: string;
  inr: number;
}

export interface BudgetAnalytics {
  tripTotal: number;
  categoryTotals: CategoryTotal[];
  dailyTotals: DailyTotal[];
  byCategory: Record<ExpenseCategory, number>;
}

/** Summarize expenses: trip total, per-category, and per-day breakdowns. */
export function analyzeExpenses(expenses: Expense[]): BudgetAnalytics {
  const byCategory = {} as Record<ExpenseCategory, number>;
  const daily = new Map<string, number>();

  let tripTotal = 0;
  for (const e of expenses) {
    byCategory[e.category] = (byCategory[e.category] ?? 0) + e.inrAmount;
    tripTotal += e.inrAmount;
    daily.set(e.date, (daily.get(e.date) ?? 0) + e.inrAmount);
  }

  const categoryTotals: CategoryTotal[] = (
    Object.keys(byCategory) as ExpenseCategory[]
  )
    .map((category) => ({
      category,
      label: EXPENSE_CATEGORY_LABELS[category],
      inr: Math.round(byCategory[category] * 100) / 100,
    }))
    .sort((a, b) => b.inr - a.inr);

  const dailyTotals: DailyTotal[] = [...daily.entries()]
    .map(([date, inr]) => ({ date, inr: Math.round(inr * 100) / 100 }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return { tripTotal: Math.round(tripTotal * 100) / 100, categoryTotals, dailyTotals, byCategory };
}
