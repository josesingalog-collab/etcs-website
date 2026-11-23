import type { ReactNode } from "react";

/** Petit sur-titre : trait accent + texte en petites capitales accent. */
export function MockEyebrow({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.22em] ${className}`} style={{ color: light ? "var(--plan-sky)" : "var(--plan-accent)" }}>
      <span className="h-0.5 w-8 shrink-0 rounded-full" style={{ backgroundColor: light ? "var(--plan-sky)" : "var(--plan-accent)" }} aria-hidden="true" />
      {children}
    </p>
  );
}
