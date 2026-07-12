# Milestones

Authoritative plan. Each milestone maps to the Immediate Tasks in
`PROJECT_BOOTSTRAP.md`. Commits land on `feature/*` branches, merge to `main`
via PR, and every push to `main` auto-deploys to GitHub Pages.

## Milestone 1 — Foundation ✅ in progress

Goal: a deployable, offline-capable, installable PWA with a working
multi-trip dashboard and a data-driven Trip Engine.

| # | Task | Status |
|---|------|--------|
| 1 | GitHub Actions CI | ✅ |
| 2 | GitHub Pages deployment (static export) | ✅ |
| 3 | PWA (manifest + offline service worker) | ✅ |
| 4 | Design System (shadcn base-nova + theme) | ✅ |
| 5 | Dashboard (trips list, add/delete) | ✅ |
| 6 | Trip Engine (types, store, services, hooks) | ✅ |
| 7 | Load Singapore Trip (seed JSON, data-driven) | ✅ |

## Milestone 2 — Trip Internals ✅ done

| # | Task | Status |
|---|------|--------|
| 8 | Budget Module (expense entry, INR conversion, category/daily totals, analytics charts) | ✅ |
| 9 | Tickets Module (vendor quotes, cheapest-combo recommendation) | ✅ |
| 10 | Journal Module (per-day notes, rating, favourite memory, weather) | ✅ |
| - | Trip detail page (Overview / Budget / Tickets / Journal tabs) | ✅ |
| - | Bottom-navigation shell (Home, Trips, Timeline, Budget, Journal, Settings) | ✅ |

## Milestone 3 — Platform

| # | Task | Status |
|---|------|--------|
| 11 | Documents module (offline blob store via IndexedDB + records, trip tab) | ✅ |
| 12 | Places/Maps module (saved locations + OpenStreetMap links, trip tab) | ✅ |
| 13 | Settings expansion (default currency, custom budget categories) | ✅ |
| 14 | Home polish (active-trip hero + quick actions) | ✅ |
| 15 | PWA install prompt + offline banner | ✅ |
| 16 | Design-system: Input primitive | ✅ |

**Note on Maps:** M3 uses OpenStreetMap links (no API key, fully offline-capable
of storing places). An interactive embedded map with routing is a later
enhancement (would need a tile provider); the bootstrap "Maps integration" is
satisfied by store + OSM deep-links.

## Milestone 4 — Intelligence

| # | Task |
|---|------|
| - | AI trip-aware assistant |
| - | Photo timeline / travel replay |
| - | Trip export / import |
| - | Apple Watch / widgets |
