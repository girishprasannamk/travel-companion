"use client";

import { useState } from "react";
import { usePlaces } from "@/store/usePlaces";
import { osmMapUrl, osmSearchUrl, type NewPlaceInput } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const CATEGORIES = ["sight", "food", "hotel", "transit", "other"];

export function PlaceManager({
  tripId,
  onChanged,
}: {
  tripId: string;
  onChanged?: () => void;
}) {
  const places = usePlaces((s) => s.places);
  const addPlace = usePlaces((s) => s.addPlace);
  const removePlace = usePlaces((s) => s.removePlace);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("sight");
  const [address, setAddress] = useState("");

  const tripPlaces = places.filter((p) => p.tripId === tripId);

  function submit() {
    if (!name) return;
    const input: NewPlaceInput = {
      tripId,
      name,
      category,
      address: address || undefined,
    };
    addPlace(input);
    setName("");
    setAddress("");
    onChanged?.();
  }

  return (
    <div className="space-y-4">
      <Card size="sm">
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Place name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c[0].toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <Input
            placeholder="Address (optional)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button size="sm" disabled={!name} onClick={submit}>
            Add Place
          </Button>
        </CardContent>
      </Card>

      {tripPlaces.length === 0 ? (
        <p className="text-sm text-slate-500">No places saved yet.</p>
      ) : (
        <div className="space-y-2">
          {tripPlaces.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-white">{p.name}</p>
                <p className="text-xs text-slate-500">
                  {p.category}
                  {p.address ? ` · ${p.address}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={osmMapUrl(p.lat, p.lng) ?? osmSearchUrl(p.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-emerald-400"
                >
                  Map
                </a>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    removePlace(p.id);
                    onChanged?.();
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
