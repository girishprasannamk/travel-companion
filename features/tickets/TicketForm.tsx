"use client";

import { useState } from "react";
import { useTickets } from "@/store/useTickets";
import {
  TICKET_VENDORS,
  type TicketVendor,
  type NewTicketInput,
} from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function TicketForm({ tripId, onAdded }: { tripId: string; onAdded?: () => void }) {
  const addTicket = useTickets((s) => s.addTicket);
  const [name, setName] = useState("");
  const [vendor, setVendor] = useState<TicketVendor>("Klook");
  const [officialPrice, setOfficialPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [refundPolicy, setRefundPolicy] = useState("");

  function submit() {
    if (!name || purchasePrice === "") return;
    const input: NewTicketInput = {
      tripId,
      name,
      vendor,
      officialPrice: officialPrice ? parseFloat(officialPrice) : undefined,
      purchasePrice: parseFloat(purchasePrice),
      bookingId: bookingId || undefined,
      refundPolicy: refundPolicy || undefined,
    };
    addTicket(input);
    setName("");
    setOfficialPrice("");
    setPurchasePrice("");
    setBookingId("");
    setRefundPolicy("");
    onAdded?.();
  }

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <label className="block text-xs text-slate-400">
          Attraction / item
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Universal Studios"
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-slate-400">
            Vendor
            <select
              value={vendor}
              onChange={(e) => setVendor(e.target.value as TicketVendor)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            >
              {TICKET_VENDORS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-slate-400">
            Purchase price
            <input
              type="number"
              inputMode="decimal"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="0.00"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-slate-400">
            Official price
            <input
              type="number"
              inputMode="decimal"
              value={officialPrice}
              onChange={(e) => setOfficialPrice(e.target.value)}
              placeholder="optional"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            />
          </label>
          <label className="text-xs text-slate-400">
            Booking ID
            <input
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            />
          </label>
        </div>
        <label className="block text-xs text-slate-400">
          Refund policy
          <input
            value={refundPolicy}
            onChange={(e) => setRefundPolicy(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
          />
        </label>
        <Button className="w-full" onClick={submit}>
          Add Ticket
        </Button>
      </CardContent>
    </Card>
  );
}
