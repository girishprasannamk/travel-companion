import { z } from "zod";

export const DOCUMENT_KINDS = [
  "passport",
  "visa",
  "ticket",
  "insurance",
  "booking",
  "voucher",
  "license",
  "other",
] as const;
export type DocumentKind = (typeof DOCUMENT_KINDS)[number];

export const DOCUMENT_KIND_LABELS: Record<DocumentKind, string> = {
  passport: "Passport",
  visa: "Visa",
  ticket: "Ticket",
  insurance: "Insurance",
  booking: "Booking",
  voucher: "Voucher",
  license: "License",
  other: "Other",
};

export const DocumentSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  kind: z.enum(DOCUMENT_KINDS),
  title: z.string(),
  blobKey: z.string(), // key into the IndexedDB blob store
  mimeType: z.string().optional(),
  fileName: z.string().optional(),
  expiryDate: z.string().optional(), // yyyy-mm-dd
  notes: z.string().optional(),
  createdAt: z.string(),
});
export type TripDocument = z.infer<typeof DocumentSchema>;

export const NewDocumentSchema = DocumentSchema.omit({ id: true, createdAt: true });
export type NewDocumentInput = z.input<typeof NewDocumentSchema>;
