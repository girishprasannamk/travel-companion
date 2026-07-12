"use client";

import { useSyncExternalStore } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Settings as SettingsIcon } from "lucide-react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <div>
      <PageHeader title="Settings" subtitle="Preferences" />
      <div className="mt-6 space-y-3 px-5 sm:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">
          <span className="flex items-center gap-2 text-sm text-slate-300">
            <SettingsIcon className="size-4" /> Appearance
          </span>
          <select
            value={mounted ? theme : "dark"}
            onChange={(e) => setTheme(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-sm text-white"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
          </select>
        </div>
        <p className="text-xs text-slate-600">
          Data is stored on this device and works offline. Cloud sync arrives in
          a later milestone.
        </p>
      </div>
    </div>
  );
}
