"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewJournalSchema, type JournalEntry, type NewJournalInput } from "@/types";

interface JournalState {
  entries: JournalEntry[];
  addEntry: (input: NewJournalInput) => JournalEntry;
  removeEntry: (id: string) => void;
  entriesForTrip: (tripId: string) => JournalEntry[];
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `j_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export const useJournal = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (input) => {
        const parsed = NewJournalSchema.parse(input);
        const entry: JournalEntry = { ...parsed, id: makeId() };
        set((s) => ({ entries: [entry, ...s.entries] }));
        return entry;
      },
      removeEntry: (id) =>
        set((s) => ({ entries: s.entries.filter((e) => e.id !== id) })),
      entriesForTrip: (tripId) =>
        get().entries.filter((e) => e.tripId === tripId),
    }),
    { name: "tc.journal.v1", version: 1 }
  )
);
