import type { Trip } from "@/types";

/**
 * Pure, framework-agnostic trip queries. The UI talks only to this service
 * (PROJECT_RULES: all business logic goes through services). Today it reads
 * the zustand store; later it can be swapped for an IndexedDB engine without
 * changing call sites.
 */

export function sortTrips(trips: Trip[]): Trip[] {
  const weight = (t: Trip) =>
    t.status === "active" ? 0 : t.status === "upcoming" ? 1 : 2;
  return [...trips].sort((a, b) => {
    const w = weight(a) - weight(b);
    if (w !== 0) return w;
    return a.startDate.localeCompare(b.startDate);
  });
}

export function activeTrip(trips: Trip[]): Trip | undefined {
  return trips.find((t) => t.status === "active") ?? sortTrips(trips)[0];
}
