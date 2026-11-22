import Link from "next/link";
import { ArrowRight, Award, Building2, Compass, Coins, DraftingCompass, Globe2, HardHat, ShieldCheck, Trophy, Users } from "lucide-react";
import type { KeyStat } from "@/lib/key-stats";
import { Reveal } from "@/components/public/reveal";
import { AnimatedStat } from "@/components/public/animated-stat";

const statIcons = [Building2, Coins, Users, Trophy, ShieldCheck, Globe2, Award];

export function SectionHeading({ eyebrow, title, text, align = "left", light = false }: { eyebrow: string; title: string; text?: string; align?: "left" | "center"; light?: boolean }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`text-xs font-bold tracking-[.22em] text-royal ${light ? "!text-gold" : ""}`}>
        {eyebrow}
      </p>
      <h2 className={`display mt-4 text-4xl leading-[1.12] md:text-5xl ${light ? "text-white" : "text-anthracite"}`}>{title}</h2>
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
    <section className="px-4 pb-14 sm:px-6 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] p-10 text-white sm:p-14" style={{ backgroundColor: "#101a33" }}>
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full opacity-25 blur-3xl" style={{ background: "var(--plan-accent)" }} aria-hidden="true" />
        <div className="relative flex flex-wrap items-center justify-between gap-10">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.22em]" style={{ color: "var(--plan-sky)" }}>
              <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: "var(--plan-sky)" }} aria-hidden="true" />
              Travaillons ensemble
            </p>
            <h2 className="display mt-4 text-3xl leading-[1.12] md:text-4xl">{title}</h2>
            {text && <p className="mt-4 text-sm leading-7 text-slate-300">{text}</p>}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href={primaryHref} className="focus-ring group inline-flex items-center gap-3 rounded-full bg-[var(--plan-accent)] py-2.5 pl-7 pr-2.5 text-sm font-bold transition hover:bg-[#1a5fd6]">
              {primaryLabel}
              <span className="grid h-9 w-9 place-items-center rounded-full bg-black/15 transition group-hover:bg-white group-hover:text-[var(--plan-accent)]"><ArrowRight className="h-4 w-4" /></span>
            </Link>
            <Link href="/contact" className="focus-ring inline-flex items-center gap-3 rounded-full border-2 border-white/40 py-2.5 pl-7 pr-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-[var(--plan-navy)]">
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection({ stats }: { stats: KeyStat[] }) {
  if (stats.length === 0) return null;
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal><h2 className="display text-4xl leading-[1.1] text-anthracite md:text-5xl">Chiffres clés</h2></Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = statIcons[index % statIcons.length];
            return (
              <Reveal key={stat.label} delay={Math.min(index, 5) * 0.06}>
                <div className="card-hover flex h-full items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-royal text-white shadow-lg shadow-royal/30">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="display text-3xl leading-none text-vinci md:text-4xl"><AnimatedStat value={stat.value} /></p>
                    <p className="mt-2 text-xs font-bold uppercase leading-snug tracking-wide text-slate-500">{stat.label}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
