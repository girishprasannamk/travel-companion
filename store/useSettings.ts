"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EXPENSE_CATEGORIES } from "@/types";

interface SettingsState {
  defaultCurrency: string; // ISO code, e.g. SGD
  customCategories: string[];
  addCategory: (c: string) => void;
  removeCategory: (c: string) => void;
  allCategories: () => string[];
}

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      defaultCurrency: "INR",
      customCategories: [],
      addCategory: (c) => {
        const v = c.trim().toLowerCase();
        if (!v || get().customCategories.includes(v)) return;
        set({ customCategories: [...get().customCategories, v] });
      },
      removeCategory: (c) =>
        set({
          customCategories: get().customCategories.filter((x) => x !== c),
        }),
      allCategories: () => [
        ...EXPENSE_CATEGORIES,
        ...get().customCategories,
      ] as string[],
    }),
    { name: "travel-companion-settings" }
  )
);
