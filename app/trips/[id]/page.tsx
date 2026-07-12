import { seedTrips } from "@/data/seed";
import { TripDetail } from "@/features/trip/TripDetail";

export function generateStaticParams() {
  // Pre-build the seeded trips. User-created trips (localStorage) are opened
  // via in-app client-side navigation, which renders the same client component.
  return seedTrips.map((t) => ({ id: t.id }));
}

export default function TripDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <TripDetail tripId={params.id} />;
}
