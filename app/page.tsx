"use client";

import { useState } from "react";
import Link from "next/link";
import { Plane, Plus, Wallet, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TripCard } from "@/components/TripCard";
import { AddTripForm } from "@/components/AddTripForm";
import { useTrips } from "@/store/useTrips";
import { sortTrips } from "@/services/trips";
import { useHydrated } from "@/hooks/useHydrated";
import { seedTrips } from "@/data/seed";
import { daysUntil, formatTripRange, nightsBetween } from "@/types";

export default function Home() {
  const hydrated = useHydrated();
  const trips = useTrips((s) => s.trips);
  const removeTrip = useTrips((s) => s.removeTrip);
  const [adding, setAdding] = useState(false);

  const display = hydrated ? trips : seedTrips;
  const sorted = sortTrips(display);
  const active = sorted.find((t) => t.status !== "past") ?? sorted[0];

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

      {active && (
        <Link
          href={`/trips/${active.id}`}
          className="mt-8 block rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5"
          style={{ boxShadow: `inset 4px 0 0 ${active.accent ?? "#10b981"}` }}
        >
          <p className="text-xs uppercase tracking-widest text-emerald-400">
            {active.status === "active"
              ? "Happening now"
              : active.status === "upcoming"
                ? `${daysUntil(active.startDate)} days to go`
                : "Last trip"}
          </p>
          <div className="mt-1 flex items-center gap-2">
            {active.flag && <span className="text-2xl">{active.flag}</span>}
            <h2 className="font-heading text-lg font-semibold">{active.name}</h2>
          </div>
          <p className="text-sm text-slate-400">
            {formatTripRange(active.startDate, active.endDate)} ·{" "}
            {nightsBetween(active.startDate, active.endDate)} nights
          </p>
          <div className="mt-4 flex gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              <Wallet className="size-3.5" /> Add expense
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              <MapPin className="size-3.5" /> Add place
            </span>
          </div>
        </Link>
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
