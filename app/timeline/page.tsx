import { PageHeader } from "@/components/common/PageHeader";
import { CalendarDays } from "lucide-react";

export default function TimelinePage() {
  return (
    <div>
      <PageHeader title="Timeline" subtitle="Day-by-day plan" />
      <div className="mt-10 px-5 text-center text-slate-500 sm:px-8">
        <CalendarDays className="mx-auto mb-3 size-8 text-slate-700" />
        <p>Itinerary timeline lands in the next milestone.</p>
      </div>
    </div>
  );
}
