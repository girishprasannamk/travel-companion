import type { Trip } from "@/types";
import { formatTripRange, nightsBetween, daysUntil } from "@/types";

/** Overview tab for a trip: key facts at a glance. */
export function TripOverview({ trip }: { trip: Trip }) {
  const nights = nightsBetween(trip.startDate, trip.endDate);
  const until = daysUntil(trip.startDate);

  const facts: { label: string; value: string }[] = [
    { label: "Destination", value: `${trip.flag ?? ""} ${trip.destination}`.trim() },
    { label: "Dates", value: formatTripRange(trip.startDate, trip.endDate) },
    { label: "Nights", value: String(nights) },
    { label: "Travellers", value: trip.travellers ?? "—" },
    { label: "Hotel", value: trip.hotelName ?? "—" },
    { label: "Status", value: trip.status ?? "—" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {facts.map((f) => (
          <div
            key={f.label}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
          >
            <p className="text-xs text-slate-400">{f.label}</p>
            <p className="mt-0.5 text-sm font-medium text-white">{f.value}</p>
          </div>
        ))}
      </div>

      {trip.status === "upcoming" && (
        <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/30 p-4 text-sm text-emerald-300">
          {until} day{until === 1 ? "" : "s"} to go. Start logging tickets and
          budget to plan ahead.
        </div>
      )}

      {trip.notes && (
        <p className="text-sm text-slate-400">{trip.notes}</p>
      )}
    </div>
  );
}
