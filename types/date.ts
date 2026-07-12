import {
  differenceInCalendarDays,
  format,
  isWithinInterval,
  parseISO,
} from "date-fns";
import type { TripStatus } from "./trip";

/** Human-friendly date range, e.g. "12 – 19 Aug 2026" or "28 Jul – 3 Aug 2026". */
export function formatTripRange(start: string, end: string): string {
  const s = parseISO(start);
  const e = parseISO(end);
  const sameMonth =
    s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) return `${format(s, "d")} – ${format(e, "d MMM yyyy")}`;
  return `${format(s, "d MMM")} – ${format(e, "d MMM yyyy")}`;
}

/** Derive lifecycle status from today vs the trip window. */
export function deriveStatus(start: string, end: string): TripStatus {
  const now = new Date();
  const s = parseISO(start);
  const e = parseISO(end);
  if (isWithinInterval(now, { start: s, end: e })) return "active";
  if (now < s) return "upcoming";
  return "past";
}

export function nightsBetween(start: string, end: string): number {
  return Math.max(0, differenceInCalendarDays(parseISO(end), parseISO(start)));
}

export function daysUntil(start: string): number {
  return differenceInCalendarDays(parseISO(start), new Date());
}
