"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useSettings } from "@/store/useSettings";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const settings = useSettings();
  const [newCat, setNewCat] = useState("");

  return (
    <div>
      <PageHeader title="Settings" subtitle="Preferences" />
      <div className="mt-6 space-y-4 px-5 sm:px-8">
        <Card size="sm">
          <CardContent className="space-y-3">
            <p className="text-sm font-medium text-white">Appearance</p>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </select>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="space-y-3">
            <p className="text-sm font-medium text-white">Default currency</p>
            <Input
              placeholder="ISO code e.g. SGD"
              value={settings.defaultCurrency}
              onChange={(e) =>
                useSettings.setState({
                  defaultCurrency: e.target.value.toUpperCase(),
                })
              }
            />
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="space-y-3">
            <p className="text-sm font-medium text-white">
              Custom budget categories
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="e.g. sim, luggage"
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
              />
              <Button
                size="sm"
                onClick={() => {
                  settings.addCategory(newCat);
                  setNewCat("");
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {settings.customCategories.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                >
                  {c}
                  <button
                    className="text-destructive"
                    onClick={() => settings.removeCategory(c)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-slate-600">
          Data is stored on this device and works offline. Cloud sync arrives in
          a later milestone.
        </p>
      </div>
    </div>
  );
}
