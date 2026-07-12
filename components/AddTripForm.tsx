"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { NewTripSchema, type NewTripInput } from "@/types";
import { useTrips } from "@/store/useTrips";

const ACCENTS = ["#10b981", "#f59e0b", "#6366f1", "#ec4899", "#06b6d4", "#ef4444"];

const field =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/40";

const EMPTY: NewTripInput = {
  name: "",
  destination: "",
  flag: "",
  startDate: "",
  endDate: "",
  accent: ACCENTS[0],
  hotelName: "",
  notes: "",
};

export function AddTripForm({ onAdded }: { onAdded?: () => void }) {
  const addTrip = useTrips((s) => s.addTrip);
  const [form, setForm] = useState<NewTripInput>(EMPTY);
  const [accent, setAccent] = useState(ACCENTS[0]);
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [general, setGeneral] = useState<string | null>(null);

  const set = (key: keyof NewTripInput, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = NewTripSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    try {
      addTrip({ ...result.data, accent });
      setForm(EMPTY);
      setAccent(ACCENTS[0]);
      setErrors(null);
      setGeneral(null);
      onAdded?.();
    } catch (err) {
      setGeneral(err instanceof Error ? err.message : "Could not add trip");
    }
  };

  return (
    <Card size="sm">
      <CardContent>
        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">Trip name</span>
              <input
                className={field}
                placeholder="Singapore 2026"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
              {errors?.name && (
                <span className="text-xs text-destructive">{errors.name}</span>
              )}
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">Destination</span>
              <input
                className={field}
                placeholder="Singapore"
                value={form.destination}
                onChange={(e) => set("destination", e.target.value)}
              />
              {errors?.destination && (
                <span className="text-xs text-destructive">{errors.destination}</span>
              )}
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">Start date</span>
              <input
                type="date"
                className={field}
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
              />
              {errors?.startDate && (
                <span className="text-xs text-destructive">{errors.startDate}</span>
              )}
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">End date</span>
              <input
                type="date"
                className={field}
                value={form.endDate}
                onChange={(e) => set("endDate", e.target.value)}
              />
              {errors?.endDate && (
                <span className="text-xs text-destructive">{errors.endDate}</span>
              )}
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">Flag emoji (optional)</span>
              <input
                className={field}
                placeholder="🇸🇬"
                value={form.flag}
                onChange={(e) => set("flag", e.target.value)}
              />
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">Hotel (optional)</span>
              <input
                className={field}
                placeholder="Hotel Mi Rochor"
                value={form.hotelName}
                onChange={(e) => set("hotelName", e.target.value)}
              />
            </label>
          </div>

          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Accent</span>
            <div className="flex gap-2">
              {ACCENTS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setAccent(c)}
                  className="size-7 rounded-full transition"
                  style={{
                    backgroundColor: c,
                    boxShadow: accent === c ? `0 0 0 3px ${c}` : "none",
                  }}
                  aria-label={`Accent ${c}`}
                />
              ))}
            </div>
          </div>

          {general && <p className="text-sm text-destructive">{general}</p>}

          <Button type="submit" className="w-full">
            <Plus /> Add Trip
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
