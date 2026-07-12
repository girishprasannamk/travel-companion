"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, LineChart, BookOpen, Settings, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/trips", label: "Trips", icon: Map },
  { href: "/timeline", label: "Timeline", icon: CalendarDays },
  { href: "/budget", label: "Budget", icon: LineChart },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname() ?? "/";
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <ul className="mx-auto flex max-w-3xl items-stretch justify-between px-2 py-1.5">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/" || pathname.startsWith("/trips/")
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex w-14 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-medium transition-colors",
                  active ? "text-emerald-400" : "text-slate-500"
                )}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
