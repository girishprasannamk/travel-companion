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

| # | Task |
|---|------|
| - | Documents storage (offline-accessible) |
| - | Maps integration (Google/Apple) |
| - | Settings + theming controls |
| - | Cloud sync (Firebase) — future |

## Milestone 4 — Intelligence

| # | Task |
|---|------|
| - | AI trip-aware assistant |
| - | Photo timeline / travel replay |
| - | Trip export / import |
| - | Apple Watch / widgets |
