"use client";

import { useState } from "react";
import { useTrips } from "@/store/useTrips";
import { useHydrated } from "@/hooks/useHydrated";
import { seedTrips } from "@/data/seed";
import { formatTripRange, nightsBetween } from "@/types";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/Button";
import { TripOverview } from "@/features/trip/TripOverview";
import { ExpenseForm } from "@/features/budget/ExpenseForm";
import { BudgetAnalyticsView } from "@/features/budget/BudgetAnalyticsView";
import { analyzeExpenses } from "@/services/budget";
import { useExpenses } from "@/store/useExpenses";
import { TicketForm } from "@/features/tickets/TicketForm";
import { TicketComparison } from "@/features/tickets/TicketComparison";
import { useTickets } from "@/store/useTickets";
import { JournalForm } from "@/features/journal/JournalForm";
import { useJournal } from "@/store/useJournal";
import { formatInr } from "@/lib/format";

type Tab = "overview" | "budget" | "tickets" | "journal";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "budget", label: "Budget" },
  { id: "tickets", label: "Tickets" },
  { id: "journal", label: "Journal" },
];

export function TripDetail({ tripId }: { tripId: string }) {
  const hydrated = useHydrated();
  const trips = useTrips((s) => s.trips);
  const expenses = useExpenses((s) => s.expenses);
  const tickets = useTickets((s) => s.tickets);
  const entries = useJournal((s) => s.entries);
  const [tab, setTab] = useState<Tab>("overview");
  const [adding, setAdding] = useState(false);

  const trip = (hydrated ? trips : seedTrips).find((t) => t.id === tripId);
  if (!trip) {
    return (
      <div>
        <PageHeader title="Trip" />
        <p className="mt-10 px-5 text-center text-slate-500 sm:px-8">
          Trip not found.
        </p>
      </div>
    );
  }

  const tripExpenses = expenses.filter((e) => e.tripId === trip.id);
  const tripTickets = tickets.filter((t) => t.tripId === trip.id);
  const tripEntries = entries.filter((e) => e.tripId === trip.id);
  const analytics = analyzeExpenses(tripExpenses);

  return (
    <div>
      <PageHeader
        title={trip.name}
        subtitle={`${trip.flag ?? ""} ${trip.destination} · ${formatTripRange(
          trip.startDate,
          trip.endDate
        )} · ${nightsBetween(trip.startDate, trip.endDate)} nights`}
        action={
          <Button size="sm" onClick={() => setAdding((v) => !v)}>
            {adding ? "Close" : "Add"}
          </Button>
        }
      />

      <div className="mt-4 flex gap-1 border-b border-slate-800 px-5 sm:px-8">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              tab === t.id
                ? "border-b-2 border-emerald-400 text-emerald-400"
                : "text-slate-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5 px-5 sm:px-8">
        {tab === "overview" && <TripOverview trip={trip} />}

        {tab === "budget" && (
          <div className="space-y-6">
            {adding && <ExpenseForm tripId={trip.id} onAdded={() => setAdding(false)} />}
            <BudgetAnalyticsView data={analytics} />
            <div className="space-y-2">
              {tripExpenses.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {e.merchant ?? e.category}
                    </p>
                    <p className="text-xs text-slate-500">
                      {e.date} · {e.category.toUpperCase()}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-400">
                    {formatInr(e.inrAmount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "tickets" && (
          <div className="space-y-6">
            {adding && <TicketForm tripId={trip.id} onAdded={() => setAdding(false)} />}
            <TicketComparison tickets={tripTickets} />
          </div>
        )}

        {tab === "journal" && (
          <div className="space-y-6">
            {adding && <JournalForm tripId={trip.id} onAdded={() => setAdding(false)} />}
            <div className="space-y-3">
              {tripEntries
                .slice()
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((e) => (
                  <div
                    key={e.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{e.date}</p>
                      {e.rating && (
                        <span className="text-sm text-amber-400">
                          {"★".repeat(e.rating)}
                          <span className="text-slate-700">
                            {"★".repeat(5 - e.rating)}
                          </span>
                        </span>
                      )}
                    </div>
                    {e.notes && (
                      <p className="mt-1 text-sm text-slate-300">{e.notes}</p>
                    )}
                    {e.favouriteMemory && (
                      <p className="mt-1 text-xs text-emerald-400">
                        ♥ {e.favouriteMemory}
                      </p>
                    )}
                    {e.weather && (
                      <p className="mt-1 text-xs text-slate-500">{e.weather}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
