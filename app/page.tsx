"use client";

import { useState } from "react";
import { Plane, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TripCard } from "@/components/TripCard";
import { AddTripForm } from "@/components/AddTripForm";
import { useTrips } from "@/store/useTrips";
import { sortTrips } from "@/services/trips";
import { useHydrated } from "@/hooks/useHydrated";
import { seedTrips } from "@/data/seed";

export default function Home() {
  const hydrated = useHydrated();
  const trips = useTrips((s) => s.trips);
  const removeTrip = useTrips((s) => s.removeTrip);
  const [adding, setAdding] = useState(false);

  // Pre-hydration: render seed so server and client markup match. After mount,
  // switch to the persisted store (which may differ from seed on the client).
  const display = hydrated ? trips : seedTrips;
  const sorted = sortTrips(display);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
            <Plane className="size-5" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">
              Travel Companion
            </p>
            <h1 className="font-heading text-xl font-semibold">Your Trips</h1>
          </div>
        </div>
        <Button size="sm" onClick={() => setAdding((v) => !v)}>
          <Plus /> {adding ? "Close" : "New"}
        </Button>
      </header>

      {adding && (
        <div className="mt-6">
          <AddTripForm onAdded={() => setAdding(false)} />
        </div>
      )}

      <section className="mt-8 space-y-4">
        {sorted.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
            No trips yet. Tap <span className="text-emerald-400">New</span> to
            plan your first adventure.
          </div>
        ) : (
          sorted.map((trip) => (
            <TripCard key={trip.id} trip={trip} onDelete={removeTrip} />
          ))
        )}
      </section>

      <footer className="mt-10 text-center text-xs text-slate-600">
        {trips.length} trip{trips.length === 1 ? "" : "s"} · stored on this
        device · works offline
      </footer>
    </div>
  );
}
