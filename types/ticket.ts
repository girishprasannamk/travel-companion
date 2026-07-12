import { z } from "zod";

export const TICKET_VENDORS = [
  "Official",
  "Klook",
  "KKday",
  "Pelago",
  "Go City",
  "Mandai Bundles",
  "Sentosa Bundles",
] as const;
export type TicketVendor = (typeof TICKET_VENDORS)[number];

export const TicketSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  name: z.string().min(1), // attraction / item
  officialPrice: z.number().nonnegative().optional(),
  vendor: z.enum(TICKET_VENDORS),
  purchasePrice: z.number().nonnegative(),
  purchaseDate: z.string().optional(),
  bookingId: z.string().optional(),
  qrCode: z.string().optional(), // reference / data url
  pdf: z.string().optional(),
  refundPolicy: z.string().optional(),
  validity: z.string().optional(),
});
export type Ticket = z.infer<typeof TicketSchema>;

export const NewTicketSchema = TicketSchema.omit({ id: true });
export type NewTicketInput = z.infer<typeof NewTicketSchema>;

/**
 * Group tickets by attraction name and pick the cheapest purchase price for
 * each. Implements the bootstrap "automatically recommend cheapest combination"
 * — add the same attraction from multiple vendors to compare.
 */
export function recommendCheapest(tickets: Ticket[]): Map<string, Ticket> {
  const best = new Map<string, Ticket>();
  for (const t of tickets) {
    const current = best.get(t.name);
    if (!current || t.purchasePrice < current.purchasePrice) {
      best.set(t.name, t);
    }
  }
  return best;
}
