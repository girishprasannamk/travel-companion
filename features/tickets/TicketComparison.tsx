"use client";

import { recommendCheapest, type Ticket } from "@/types";
import { formatInr } from "@/lib/format";

/**
 * Groups tickets by attraction and shows the cheapest option per attraction,
 * plus the total if you bought the cheapest available for each — the bootstrap
 * "automatically recommend cheapest combination" requirement.
 */
export function TicketComparison({ tickets }: { tickets: Ticket[] }) {
  const best = recommendCheapest(tickets);

  // group all quotes by name to show alternatives
  const byName = new Map<string, Ticket[]>();
  for (const t of tickets) {
    const arr = byName.get(t.name) ?? [];
    arr.push(t);
    byName.set(t.name, arr);
  }

  const cheapestTotal = [...best.values()].reduce(
    (sum, t) => sum + t.purchasePrice,
    0
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/30 p-4">
        <p className="text-xs text-emerald-400">Recommended (cheapest per item)</p>
        <p className="font-heading text-2xl font-semibold">
          {formatInr(cheapestTotal)}
        </p>
        <p className="text-xs text-slate-500">
          {best.size} item{best.size === 1 ? "" : "s"} · buy each at its lowest price
        </p>
      </div>

      {[...byName.entries()].map(([name, quotes]) => {
        const sorted = [...quotes].sort((a, b) => a.purchasePrice - b.purchasePrice);
        const cheapest = sorted[0];
        return (
          <div
            key={name}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
          >
            <p className="mb-2 text-sm font-medium text-white">{name}</p>
            <ul className="space-y-1">
              {sorted.map((q) => (
                <li
                  key={q.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2 text-slate-300">
                    {q.vendor}
                    {q.id === cheapest.id && (
                      <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-400">
                        BEST
                      </span>
                    )}
                  </span>
                  <span
                    className={
                      q.id === cheapest.id
                        ? "font-semibold text-emerald-400"
                        : "text-slate-500"
                    }
                  >
                    {formatInr(q.purchasePrice)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
