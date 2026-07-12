"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type TripDocument, type NewDocumentInput } from "@/types";

interface DocumentState {
  documents: TripDocument[];
  addDocument: (input: NewDocumentInput) => TripDocument;
  removeDocument: (id: string) => void;
  documentsForTrip: (tripId: string) => TripDocument[];
}

function uid() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  );
}

export const useDocuments = create<DocumentState>()(
  persist(
    (set, get) => ({
      documents: [],
      addDocument: (input) => {
        const doc: TripDocument = {
          ...input,
          id: uid(),
          createdAt: new Date().toISOString(),
        };
        set({ documents: [...get().documents, doc] });
        return doc;
      },
      removeDocument: (id) =>
        set({ documents: get().documents.filter((d) => d.id !== id) }),
      documentsForTrip: (tripId) =>
        get().documents.filter((d) => d.tripId === tripId),
    }),
    { name: "travel-companion-documents" }
  )
);
