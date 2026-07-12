import { z } from "zod";

/** Lifecycle state, derived from dates unless explicitly set. */
export const TRIP_STATUSES = ["upcoming", "active", "past"] as const;
export type TripStatus = (typeof TRIP_STATUSES)[number];

/**
 * A single, self-contained trip — the unit of data for the whole app.
 * Every ticket, document, expense and journal entry hangs off one of these.
 * Keep it JSON-serializable (ISO strings, no class instances).
 */
export const TripSchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  name: z.string().min(1),
  destination: z.string().min(1),
  flag: z.string().optional(),
  startDate: z.string(), // ISO date yyyy-mm-dd
  endDate: z.string(), // ISO date yyyy-mm-dd
  status: z.enum(TRIP_STATUSES).optional(), // derived when omitted
  accent: z.string().optional(), // hex used for the card accent strip
  hotelName: z.string().optional(),
  travellers: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  archived: z.boolean().optional(),
});

export type Trip = z.infer<typeof TripSchema>;

/** Fields a user supplies when creating a trip. */
export const NewTripSchema = z
  .object({
    name: z.string().min(1, "Trip name is required"),
    destination: z.string().min(1, "Destination is required"),
    flag: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    accent: z.string().optional(),
    hotelName: z.string().optional(),
    travellers: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine((v) => v.endDate >= v.startDate, {
    message: "End date must be on or after the start date",
    path: ["endDate"],
  });

export type NewTripInput = z.infer<typeof NewTripSchema>;

/** Generate a url-safe slug from a trip name. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
