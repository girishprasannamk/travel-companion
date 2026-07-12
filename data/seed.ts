import type { Trip } from "@/types";

/**
 * Seed data loaded on first run. Once the user edits anything, the persisted
 * store takes over, so this only matters while the localStorage is empty.
 * Kept in a separate file so adding demo trips is a one-line change.
 */
import singapore from "@/data/trips/singapore-2026/trip.json";
import goa from "@/data/trips/goa-2025/trip.json";

export const seedTrips: Trip[] = [singapore, goa] as Trip[];
