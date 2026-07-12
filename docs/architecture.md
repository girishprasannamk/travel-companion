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
app/                 # routes (home, trips, trips/[id], budget, journal, timeline, settings)
components/
  ui/                # design-system primitives (shadcn)
  layout/            # AppShell, BottomNav
  common/            # shared presentational components (PageHeader)
features/
  dashboard/         # trips dashboard (M1)
  trip/              # TripDetail, TripOverview (M1+)
  budget/            # ExpenseForm, BudgetAnalyticsView (M2)
  tickets/           # TicketForm, TicketComparison (M2)
  journal/           # JournalForm (M2)
  transport/ restaurants/ weather/ settings/ ai/  # later
data/
  trips/<slug>/      # per-trip JSON (trip.json, hotel.json, ...)
  seed.ts            # first-run demo trips
types/               # domain models + helpers (zod schemas)
store/               # zustand stores (trips, expenses, tickets, journal)
services/            # pure data-access / business logic (trips, budget)
hooks/               # shared React hooks (useHydrated)
lib/                 # utilities (cn, format)
docs/                # project documentation (kept in sync with code)
scripts/             # generators / tooling
```

## Data Model

`Trip` (id, slug, name, destination, flag, start/end dates, status, accent,
hotelName, travellers, notes, timestamps). Status is derived from dates.

`Expense` (id, tripId, date, time, amount, currency, exchangeRate, inrAmount,
category, merchant, location, paymentMethod, receipt, notes, tags). INR amount
is computed as `amount * exchangeRate` so analytics always roll up in INR.

`Ticket` (id, tripId, name, officialPrice, vendor, purchasePrice, purchaseDate,
bookingId, qrCode, pdf, refundPolicy, validity). The Tickets module groups by
`name` and recommends the cheapest purchase price per attraction — the bootstrap
"automatically recommend cheapest combination" requirement.

`JournalEntry` (id, tripId, date, notes, rating, favouriteMemory, weather,
location, photoUrls, videoUrls) — one per day.

Each new model lives as JSON under `data/trips/<slug>/` for the trip's own
static content; user-entered data (expenses, tickets, journal) is captured in
the persisted zustand stores.

## Trip Engine

The Trip is the unit of data. All business logic goes through `services/`
(e.g. `services/trips.ts` for sorting/active-trip, `services/budget.ts` for
analytics). UI reads from zustand `persist` stores (`store/useTrips`,
`store/useExpenses`, `store/useTickets`, `store/useJournal`) backed by
localStorage, seeded from `data/trips/*` on first run. Persisted state is gated
behind a `useHydrated` hook to avoid hydration mismatches.
