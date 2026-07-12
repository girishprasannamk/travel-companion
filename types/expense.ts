import { z } from "zod";

export const EXPENSE_CATEGORIES = [
  "food",
  "transport",
  "grab",
  "taxi",
  "mrt",
  "tickets",
  "shopping",
  "misc",
] as const;
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  food: "Food",
  transport: "Transport",
  grab: "Grab",
  taxi: "Taxi",
  mrt: "MRT",
  tickets: "Tickets",
  shopping: "Shopping",
  misc: "Misc",
};

export const PAYMENT_METHODS = ["cash", "card", "upi", "wallet"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const ExpenseSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  date: z.string(), // yyyy-mm-dd
  time: z.string().optional(), // HH:mm
  amount: z.number().nonnegative(),
  currency: z.string().default("INR"),
  exchangeRate: z.number().nonnegative().default(1), // INR per 1 unit of currency
  inrAmount: z.number().nonnegative(),
  category: z.enum(EXPENSE_CATEGORIES),
  merchant: z.string().optional(),
  location: z.string().optional(),
  paymentMethod: z.enum(PAYMENT_METHODS).optional(),
  receipt: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
});
export type Expense = z.infer<typeof ExpenseSchema>;

export const NewExpenseSchema = z.object({
  tripId: z.string(),
  date: z.string().min(1, "Date is required"),
  time: z.string().optional(),
  amount: z.number().nonnegative("Amount must be positive"),
  currency: z.string().default("INR"),
  exchangeRate: z.number().nonnegative().default(1),
  category: z.enum(EXPENSE_CATEGORIES),
  merchant: z.string().optional(),
  location: z.string().optional(),
  paymentMethod: z.enum(PAYMENT_METHODS).optional(),
  receipt: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
});
export type NewExpenseInput = z.input<typeof NewExpenseSchema>;

/** INR equivalent = amount * exchangeRate, rounded to 2 decimals. */
export function computeInr(amount: number, exchangeRate: number): number {
  return Math.round(amount * exchangeRate * 100) / 100;
}
