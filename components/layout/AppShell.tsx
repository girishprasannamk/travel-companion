import type { ReactNode } from "react";
import { BottomNav } from "@/components/layout/BottomNav";

/** App shell: page content with a fixed bottom navigation. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col">
        <div className="flex-1 pb-24">{children}</div>
      </div>
      <BottomNav />
    </div>
  );
}
