"use client";

import { MapPin, CalendarDays, Hotel } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import type { Trip } from "@/types";
import { daysUntil, formatTripRange, nightsBetween } from "@/types";

const statusLabel: Record<NonNullable<Trip["status"]>, string> = {
  active: "Happening now",
  upcoming: "Upcoming",
  past: "Past",
};

export function TripCard({
  trip,
  onOpen,
  onDelete,
}: {
  trip: Trip;
  onOpen?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  const accent = trip.accent ?? "#10b981";
  const nights = nightsBetween(trip.startDate, trip.endDate);
  const until = daysUntil(trip.startDate);

  return (
    <Card
      size="sm"
      className="relative overflow-hidden"
      style={{ boxShadow: `inset 4px 0 0 ${accent}` }}
    >
      <CardHeader className="flex-row items-center justify-between gap-3 pb-0">
        <div className="flex items-center gap-2">
          {trip.flag && <span className="text-2xl leading-none">{trip.flag}</span>}
          <div>
            <h3 className="font-heading text-base font-medium">{trip.name}</h3>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {trip.destination}
            </p>
          </div>
        </div>
        <Badge variant={trip.status === "past" ? "secondary" : "default"}>
          {statusLabel[trip.status ?? "upcoming"]}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {formatTripRange(trip.startDate, trip.endDate)}
          </span>
          <span>{nights} night{nights === 1 ? "" : "s"}</span>
        </div>

        {trip.hotelName && (
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <Hotel className="size-3.5" />
            {trip.hotelName}
          </p>
        )}

        {trip.status === "upcoming" && until > 0 && (
          <p className="text-xs font-medium" style={{ color: accent }}>
            {until} day{until === 1 ? "" : "s"} to go
          </p>
        )}

        <Separator />

        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onOpen?.(trip.id)}
            disabled={!onOpen}
          >
            Open Trip →
          </Button>
          {onDelete && (
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(trip.id)}
            >
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
