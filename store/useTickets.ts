"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewTicketSchema, type Ticket, type NewTicketInput } from "@/types";

interface TicketState {
  tickets: Ticket[];
  addTicket: (input: NewTicketInput) => Ticket;
  removeTicket: (id: string) => void;
  ticketsForTrip: (tripId: string) => Ticket[];
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export const useTickets = create<TicketState>()(
  persist(
    (set, get) => ({
      tickets: [],
      addTicket: (input) => {
        const parsed = NewTicketSchema.parse(input);
        const ticket: Ticket = { ...parsed, id: makeId() };
        set((s) => ({ tickets: [ticket, ...s.tickets] }));
        return ticket;
      },
      removeTicket: (id) =>
        set((s) => ({ tickets: s.tickets.filter((t) => t.id !== id) })),
      ticketsForTrip: (tripId) =>
        get().tickets.filter((t) => t.tripId === tripId),
    }),
    { name: "tc.tickets.v1", version: 1 }
  )
);
