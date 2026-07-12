import type { ReactNode } from "react";

/** Consistent page header used across the bottom-nav screens. */
export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex items-center justify-between gap-3 px-5 pt-10 sm:px-8">
      <div>
        <h1 className="font-heading text-xl font-semibold">{title}</h1>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
