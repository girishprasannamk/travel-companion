import { z } from "zod";

export const PlaceSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  name: z.string(),
  category: z.string().default("sight"), // sight | food | hotel | transit | other
  address: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  notes: z.string().optional(),
});
export type Place = z.infer<typeof PlaceSchema>;

export const NewPlaceSchema = PlaceSchema.omit({ id: true });
export type NewPlaceInput = z.input<typeof NewPlaceSchema>;

/** OpenStreetMap search URL for a place name (no API key required). */
export function osmSearchUrl(query: string): string {
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`;
}

/** OSM map URL centred on a coordinate, if known. */
export function osmMapUrl(lat?: number, lng?: number): string | null {
  if (lat == null || lng == null) return null;
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;
}
