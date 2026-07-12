"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Place, type NewPlaceInput } from "@/types";

interface PlaceState {
  places: Place[];
  addPlace: (input: NewPlaceInput) => Place;
  removePlace: (id: string) => void;
  placesForTrip: (tripId: string) => Place[];
}

function uid() {
  return globalThis.crypto?.randomUUID?.() ?? `place-${Date.now()}`;
}

export const usePlaces = create<PlaceState>()(
  persist(
    (set, get) => ({
      places: [],
      addPlace: (input) => {
        const place: Place = {
          ...input,
          category: input.category ?? "sight",
          id: uid(),
        };
        set({ places: [...get().places, place] });
        return place;
      },
      removePlace: (id) =>
        set({ places: get().places.filter((p) => p.id !== id) }),
      placesForTrip: (tripId) =>
        get().places.filter((p) => p.tripId === tripId),
    }),
    { name: "travel-companion-places" }
  )
);
