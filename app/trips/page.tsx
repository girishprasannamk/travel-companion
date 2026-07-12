"use client";

import { useState } from "react";
import { Map, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TripCard } from "@/components/TripCard";
import { AddTripForm } from "@/components/AddTripForm";
import { PageHeader } from "@/components/common/PageHeader";
import { useTrips } from "@/store/useTrips";
import { sortTrips } from "@/services/trips";
import { useHydrated } from "@/hooks/useHydrated";
import { seedTrips } from "@/data/seed";

export default function TripsPage() {
  const hydrated = useHydrated();
  const trips = useTrips((s) => s.trips);
  const removeTrip = useTrips((s) => s.removeTrip);
  const [adding, setAdding] = useState(false);

  const display = hydrated ? trips : seedTrips;
  const sorted = sortTrips(display);

  return (
    <div>
      <PageHeader
        title="All Trips"
        subtitle={`${sorted.length} trip${sorted.length === 1 ? "" : "s"}`}
        action={
          <Button size="sm" onClick={() => setAdding((v) => !v)}>
            <Plus /> {adding ? "Close" : "New"}
          </Button>
        }
      />
      {adding && (
        <div className="px-5 sm:px-8">
          <AddTripForm onAdded={() => setAdding(false)} />
        </div>
      )}
      <section className="mt-6 space-y-4 px-5 sm:px-8">
        {sorted.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
            <Map className="mx-auto mb-3 size-8 text-slate-600" />
            No trips yet.
          </div>
        ) : (
          sorted.map((trip) => (
            <TripCard key={trip.id} trip={trip} onDelete={removeTrip} />
          ))
        )}
      </section>
    </div>
  );
}
