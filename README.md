# Travel Companion

An offline-first Progressive Web App (PWA) for planning, travelling, tracking
expenses, managing tickets, storing documents, and reliving trips. Built as a
**reusable travel platform** — Singapore is only the first trip loaded from data.

## Tech

Next.js 16 (App Router, React Compiler, static export) · TypeScript (strict) ·
Tailwind CSS v4 · shadcn/ui (base-nova) · Zustand · Zod · Framer Motion ·
date-fns · Recharts · next-themes.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & lint

```bash
npm run build    # static export to ./out
npm run lint
```

## Deploy

Every push to `main` triggers GitHub Actions → builds the static export and
publishes to GitHub Pages. The same code also runs on Vercel/Firebase Hosting
without changes (the GitHub Pages sub-path is applied only via the
`PAGES_BASE_PATH` env var in CI).

## Architecture

Feature-based layout (`features/`, `types/`, `store/`, `services/`, `hooks/`,
`data/trips/<slug>/`). All business logic goes through `services/`; UI reads
from a persisted zustand store seeded from `data/trips/*`. See
[`docs/architecture.md`](docs/architecture.md) and the milestone plan in
[`docs/milestones.md`](docs/milestones.md).

## Project rules

- Follow `PROJECT_BOOTSTRAP.md` as the authoritative spec.
- Conventional commits on `feature/*` branches; PR into `main`.
- Never commit broken code; keep docs synced with the code.
