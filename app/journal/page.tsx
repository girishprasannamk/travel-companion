"use client";

import { useState } from "react";
import { useJournal } from "@/store/useJournal";
import { useTrips } from "@/store/useTrips";
import { useHydrated } from "@/hooks/useHydrated";
import { seedTrips } from "@/data/seed";
import { sortTrips } from "@/services/trips";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/Button";
import { JournalForm } from "@/features/journal/JournalForm";

export default function JournalPage() {
  const hydrated = useHydrated();
  const trips = useTrips((s) => s.trips);
  const entries = useJournal((s) => s.entries);
  const [adding, setAdding] = useState(false);

  const displayTrips = hydrated ? trips : seedTrips;
  const active =
    sortTrips(displayTrips).find((t) => t.status !== "past") ??
    sortTrips(displayTrips)[0];

  if (!active) {
    return (
      <div>
        <PageHeader title="Journal" />
        <p className="mt-10 px-5 text-center text-slate-500 sm:px-8">
          Create a trip first to start a journal.
        </p>
      </div>
    );
  }

  const tripEntries = entries.filter((e) => e.tripId === active.id);

  return (
    <div>
      <PageHeader
        title="Journal"
        subtitle={active.name}
        action={
          <Button size="sm" onClick={() => setAdding((v) => !v)}>
            {adding ? "Close" : "Add"}
          </Button>
        }
      />
      <div className="mt-5 space-y-4 px-5 sm:px-8">
        {adding && (
          <JournalForm tripId={active.id} onAdded={() => setAdding(false)} />
        )}
        {tripEntries
          .slice()
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((e) => (
            <div
              key={e.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">{e.date}</p>
                {e.rating && (
                  <span className="text-sm text-amber-400">
                    {"★".repeat(e.rating)}
                    <span className="text-slate-700">
                      {"★".repeat(5 - e.rating)}
                    </span>
                  </span>
                )}
              </div>
              {e.notes && (
                <p className="mt-1 text-sm text-slate-300">{e.notes}</p>
              )}
              {e.favouriteMemory && (
                <p className="mt-1 text-xs text-emerald-400">
                  ♥ {e.favouriteMemory}
                </p>
              )}
              {e.weather && (
                <p className="mt-1 text-xs text-slate-500">{e.weather}</p>
              )}
            </div>
          ))}
        {tripEntries.length === 0 && !adding && (
          <p className="text-sm text-slate-500">No journal entries yet.</p>
        )}
      </div>
    </div>
  );
}
