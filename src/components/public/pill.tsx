import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "accent" | "navy" | "outline-light" | "white";

const pillStyles: Record<Variant, { button: string; circle: string }> = {
  accent: { button: "bg-[var(--plan-accent)] text-white hover:bg-[#1a5fd6]", circle: "bg-white/20 group-hover:bg-white group-hover:text-[var(--plan-accent)]" },
  navy: { button: "bg-[var(--plan-navy)] text-white hover:bg-[#161f4d]", circle: "bg-white/15 group-hover:bg-white group-hover:text-[var(--plan-navy)]" },
  "outline-light": { button: "border-2 border-white/50 bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-[var(--plan-navy)]", circle: "bg-white/15 group-hover:bg-[var(--plan-accent)] group-hover:text-white" },
  white: { button: "bg-white text-[var(--plan-navy)] hover:bg-[var(--plan-sky)]", circle: "bg-[var(--plan-accent)] text-white" },
};

/** Bouton pilule avec cercle-flèche à droite (style maquette). */
export function PillLink({ href, children, variant = "accent", className = "" }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  const styles = pillStyles[variant];
  return (
    <Link href={href} className={`focus-ring group inline-flex items-center gap-3 rounded-full py-2.5 pl-7 pr-2.5 text-sm font-bold transition ${styles.button} ${className}`}>
      {children}
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${styles.circle}`}>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

/** Petit sur-titre : trait accent + texte en petites capitales accent. */
export function MockEyebrow({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.22em] ${className}`} style={{ color: light ? "var(--plan-sky)" : "var(--plan-accent)" }}>
      <span className="h-0.5 w-8 shrink-0 rounded-full" style={{ backgroundColor: light ? "var(--plan-sky)" : "var(--plan-accent)" }} aria-hidden="true" />
      {children}
    </p>
  );
}
