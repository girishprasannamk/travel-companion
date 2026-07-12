"use client";

import { useState } from "react";
import { useJournal } from "@/store/useJournal";
import { type NewJournalInput } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function JournalForm({ tripId, onAdded }: { tripId: string; onAdded?: () => void }) {
  const addEntry = useJournal((s) => s.addEntry);
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState("");
  const [favouriteMemory, setFavouriteMemory] = useState("");
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState("");

  function submit() {
    if (!date) return;
    const input: NewJournalInput = {
      tripId,
      date,
      notes: notes || undefined,
      rating: rating ? parseInt(rating, 10) : undefined,
      favouriteMemory: favouriteMemory || undefined,
      weather: weather || undefined,
      location: location || undefined,
    };
    addEntry(input);
    setNotes("");
    setRating("");
    setFavouriteMemory("");
    setWeather("");
    setLocation("");
    onAdded?.();
  }

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <label className="block text-xs text-slate-400">
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-slate-400">
          Notes
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-slate-400">
            Rating (1-5)
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            />
          </label>
          <label className="text-xs text-slate-400">
            Weather
            <input
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              placeholder="e.g. Sunny 30°C"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            />
          </label>
        </div>
        <label className="block text-xs text-slate-400">
          Favourite memory
          <input
            value={favouriteMemory}
            onChange={(e) => setFavouriteMemory(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-slate-400">
          Location
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
          />
        </label>
        <Button className="w-full" onClick={submit}>
          Save Entry
        </Button>
      </CardContent>
    </Card>
  );
}
