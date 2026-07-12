import { z } from "zod";

export const JournalSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  date: z.string(), // yyyy-mm-dd
  notes: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  favouriteMemory: z.string().optional(),
  weather: z.string().optional(),
  location: z.string().optional(),
  photoUrls: z.array(z.string()).default([]),
  videoUrls: z.array(z.string()).default([]),
});
export type JournalEntry = z.infer<typeof JournalSchema>;

export const NewJournalSchema = JournalSchema.omit({ id: true });
export type NewJournalInput = z.input<typeof NewJournalSchema>;
