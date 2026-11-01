import Link from "next/link";
import { ArrowRight, Compass, HardHat, DraftingCompass } from "lucide-react";
import type { KeyStat } from "@/lib/key-stats";

export function SectionHeading({ eyebrow, title, text, align = "left", light = false }: { eyebrow: string; title: string; text?: string; align?: "left" | "center"; light?: boolean }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`flex items-center gap-3 text-xs font-bold tracking-[.22em] text-royal ${align === "center" ? "justify-center" : ""} ${light ? "!text-gold" : ""}`}>
        <span className="h-px w-8 bg-current" />{eyebrow}
      </p>
      <h2 className={`display mt-4 text-4xl uppercase leading-[1.1] md:text-5xl ${light ? "text-white" : "text-anthracite"}`}>{title}</h2>
      {text && <p className={`mt-4 leading-7 ${light ? "text-slate-300" : "text-slate-600"}`}>{text}</p>}
    </div>
  );
}

export function EmptyState({ title, text, ctaHref, ctaLabel, illustration = false }: { title: string; text: string; ctaHref?: string; ctaLabel?: string; illustration?: boolean }) {
  if (illustration) {
    return (
      <div className="blueprint relative overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center sm:py-20">
        <span className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
        <span className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-royal/10 blur-3xl" aria-hidden="true" />
        <span className="absolute left-10 top-12 grid h-11 w-11 -rotate-6 place-items-center rounded-lg bg-royal/10 text-royal" aria-hidden="true">
          <Compass className="h-5 w-5" />
        </span>
        <span className="absolute right-10 top-10 grid h-12 w-12 rotate-6 place-items-center rounded-xl bg-gold/15 text-gold" aria-hidden="true">
          <DraftingCompass className="h-5 w-5" />
        </span>
        <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-royal shadow-lg shadow-royal/30">
          <HardHat className="h-7 w-7 text-white" />
        </span>
        <p className="relative mt-6 text-lg font-bold text-anthracite sm:text-xl">{title}</p>
        <p className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{text}</p>
        {ctaHref && ctaLabel ? (
          <Link href={ctaHref} className="focus-ring relative mt-7 inline-flex items-center gap-2 rounded-lg bg-royal px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-royal/25 transition hover:bg-royal-deep">
            {ctaLabel}<ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    );
  }
  return (
    <div className="blueprint grid place-items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-xl bg-royal-50"><Compass className="h-6 w-6 text-royal" /></span>
      <p className="mt-5 text-lg font-bold text-anthracite">{title}</p>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

export function CtaSection({ title, text, primaryLabel = "Demander un devis", primaryHref = "/devis" }: { title: string; text: string; primaryLabel?: string; primaryHref?: string }) {
  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-royal-dark via-royal to-royal-deep px-6 py-16 text-center text-white shadow-2xl shadow-royal/40 ring-1 ring-inset ring-gold/15 sm:px-12 lg:px-16">
        <span className="grid-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <span className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
        <span className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <p className="relative text-xs font-bold tracking-[.22em] text-gold">TRAVAILLONS ENSEMBLE</p>
        <h2 className="display relative mx-auto mt-4 max-w-2xl text-4xl uppercase leading-[1.1] md:text-5xl">{title}</h2>
        <p className="relative mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-200">{text}</p>
        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href={primaryHref} className="focus-ring inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-4 text-sm font-bold text-anthracite shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-white">
            {primaryLabel}<ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-7 py-4 text-sm font-bold transition duration-300 hover:border-white hover:bg-white/10">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}

export function StatsSection({ stats }: { stats: KeyStat[] }) {
  if (stats.length === 0) return null;
  return (
    <section className="grid-lines relative isolate bg-anthracite py-20 text-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-royal via-gold to-royal" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 text-center sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="display text-5xl text-gold md:text-6xl">{stat.value}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[.2em] text-slate-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
