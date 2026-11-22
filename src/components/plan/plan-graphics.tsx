import type { ReactNode } from "react";

/** Motif de hachure béton (diagonales 45°) en SVG pur — accent décoratif, jamais envahissant. */
export function Hatching({ className = "", strokeWidth = 1.5, opacity = 0.5 }: { className?: string; strokeWidth?: number; opacity?: number }) {
  return (
    <svg className={className} aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern id="etcs-hachures" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth={strokeWidth} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#etcs-hachures)" />
    </svg>
  );
}

/** Bandeau CTA à fond hachuré : filet 1px, coins droits, hachures discrètes. */
export function HatchedCta({ title, text, ctaLabel, ctaHref, secondaryLabel = "Nous contacter", secondaryHref = "/contact" }: { title: string; text?: string; ctaLabel: string; ctaHref: string; secondaryLabel?: string; secondaryHref?: string }) {
  return (
    <section className="relative isolate overflow-hidden py-20" style={{ backgroundColor: "var(--plan-navy)" }}>
      <Hatching className="pointer-events-none absolute inset-0 h-full w-full text-white" opacity={0.08} />
      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-10 px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="annotation mb-4 text-[10px]" style={{ color: "var(--plan-sky)" }}>AXE Z — PROCHAINE ÉTAPE</p>
          <h2 className="display text-3xl leading-[1.12] text-white md:text-4xl">{title}</h2>
          {text && <p className="mt-4 text-sm leading-7 text-slate-300">{text}</p>}
        </div>
        <div className="flex flex-wrap gap-4">
          <a href={ctaHref} className="focus-ring inline-flex items-center gap-2 bg-[var(--plan-accent)] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1a5fd6]">
            {ctaLabel} →
          </a>
          <a href={secondaryHref} className="focus-ring inline-flex items-center gap-2 border border-white/40 px-7 py-4 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-[var(--plan-navy)]">
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

/** Repères de calage : petits coins en L aux 4 angles (autour d'une image ou d'un bloc). */
export function CornerMarks({ children, className = "" }: { children: ReactNode; className?: string }) {
  const mark = "absolute h-4 w-4 border-[var(--plan-accent)]";
  return (
    <div className={`relative ${className}`}>
      <span className={`${mark} left-0 top-0 border-l-2 border-t-2`} aria-hidden="true" />
      <span className={`${mark} right-0 top-0 border-r-2 border-t-2`} aria-hidden="true" />
      <span className={`${mark} bottom-0 left-0 border-b-2 border-l-2`} aria-hidden="true" />
      <span className={`${mark} bottom-0 right-0 border-b-2 border-r-2`} aria-hidden="true" />
      {children}
    </div>
  );
}
