"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** Prompts the user to install the app as a PWA (mobile/home-screen). */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferred || hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-20 z-40 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/95 px-4 py-3 shadow-xl backdrop-blur">
      <span className="text-sm text-slate-300">Install Travel Companion for offline use?</span>
      <div className="ml-auto flex gap-2">
        <Button size="sm" variant="ghost" onClick={() => setHidden(true)}>
          No
        </Button>
        <Button
          size="sm"
          onClick={async () => {
            await deferred.prompt();
            setDeferred(null);
          }}
        >
          Install
        </Button>
      </div>
    </div>
  );
}
