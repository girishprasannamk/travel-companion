# Travel Companion Architecture

## Vision

Travel Companion is an offline-first Progressive Web App (PWA) — a reusable
travel platform (not a single-trip site). It helps users plan, travel, track
expenses, manage tickets, navigate, store documents, capture memories and
relive trips. Singapore is only the first trip loaded from data.

## Core Principles

- Offline First
- Mobile First (iPhone-optimized)
- Apple-quality UI (dark mode first)
- Reusable / data-driven (never hardcode a trip)
- Fast, Accessible, Beautiful, Minimal
- No backend for Version 1 (localStorage persistence)

## Tech Stack

- Next.js 16 (App Router, React Compiler, **static export**)
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui (base-nova style on `@base-ui/react`)
- Framer Motion
- Zustand (persisted store)
- React Hook Form + Zod
- date-fns, Lucide React, Recharts, next-themes
- PWA: native manifest + hand-written offline service worker

## Deployment

Static export (`output: "export"`) builds to `out/`. GitHub Actions builds and
deploys to GitHub Pages on every push to `main`. A `PAGES_BASE_PATH`
env var (set only in CI) mounts the app at `/travel-companion`; left empty
locally and on Vercel/Firebase so the **same code** deploys unchanged.

## Folder Structure (feature-based)

```
app/                 # routes (currently: home / dashboard)
components/
  ui/                # design-system primitives (shadcn)
  layout/            # app shell, bottom nav (M2)
  common/            # shared presentational components
features/
  dashboard/         # trips dashboard (M1)
  trip/              # trip detail, engine (M1+)
  budget/ tickets/ journal/ transport/ restaurants/ weather/ settings/ ai/  # M2+
data/
  trips/<slug>/      # per-trip JSON (trip.json, hotel.json, ...)
  seed.ts            # first-run demo trips
types/               # domain models + helpers (zod schemas)
store/               # zustand stores
services/            # pure data-access / business logic
hooks/               # shared React hooks
docs/                # project documentation (kept in sync with code)
scripts/             # generators / tooling
```

## Data Model (M1)

`Trip` (id, slug, name, destination, flag, start/end dates, status, accent,
hotelName, travellers, notes, timestamps). Status is derived from dates.
Future models (Hotel, Flight, Day, Event, Expense, Ticket, Restaurant,
JournalEntry, PackingItem, Document, EmergencyContact) follow in later
milestones, each living as JSON under `data/trips/<slug>/`.

## Trip Engine

The Trip is the unit of data. All business logic goes through `services/`
(e.g. `services/trips.ts` for sorting/active-trip). UI reads from a zustand
`persist` store (`store/useTrips.ts`) backed by localStorage, seeded from
`data/trips/*` on first run. Persisted state is gated behind a `useHydrated`
hook to avoid SSR/CSR mismatches.
