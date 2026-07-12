"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewTripSchema, type NewTripInput, type Trip } from "@/types";
import { deriveStatus, slugify } from "@/types";
import { seedTrips } from "@/data/seed";

interface TripState {
  trips: Trip[];
  addTrip: (input: NewTripInput) => Trip;
  removeTrip: (id: string) => void;
  getTrip: (id: string) => Trip | undefined;
  resetToSeed: () => void;
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export const useTrips = create<TripState>()(
  persist(
    (set, get) => ({
      trips: seedTrips,

      addTrip: (input) => {
        const parsed = NewTripSchema.parse(input);
        const now = new Date().toISOString();
        const trip: Trip = {
          id: makeId(),
          slug: slugify(parsed.name),
          name: parsed.name,
          destination: parsed.destination,
          flag: parsed.flag,
          startDate: parsed.startDate,
          endDate: parsed.endDate,
          accent: parsed.accent,
          hotelName: parsed.hotelName,
          travellers: parsed.travellers,
          notes: parsed.notes,
          status: deriveStatus(parsed.startDate, parsed.endDate),
          createdAt: now,
          updatedAt: now,
        };
        set((s) => ({ trips: [trip, ...s.trips] }));
        return trip;
      },

      removeTrip: (id) =>
        set((s) => ({ trips: s.trips.filter((t) => t.id !== id) })),

      getTrip: (id) => get().trips.find((t) => t.id === id),

      resetToSeed: () => set({ trips: seedTrips }),
    }),
    {
      name: "tc.trips.v1", // persisted in localStorage — offline-first
      version: 1,
    }
  )
);
