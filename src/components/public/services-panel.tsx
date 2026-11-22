"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

type Item = { title: string; text: string; image?: string; alt?: string };

/** Panneau sombre interactif : pilules des domaines à gauche, contenu du domaine actif à droite.
 * Sur mobile : accordéon. */
export function ServicesPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: Item[] }) {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);
  const current = items[active] ?? items[0];

  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] text-white" style={{ backgroundColor: "#101a33" }}>
      {/* lueur accent en bas à droite */}
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full opacity-25 blur-3xl" style={{ background: "var(--plan-accent)" }} aria-hidden="true" />
      <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.22em]" style={{ color: "var(--plan-sky)" }}>
            <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: "var(--plan-sky)" }} aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 className="display mt-4 text-3xl leading-[1.1] md:text-4xl">{title}</h2>

          {/* Desktop : pilules */}
          <div className="mt-8 hidden gap-2 lg:grid">
            {items.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                  className="focus-ring flex items-center justify-between gap-4 rounded-full px-6 py-4 text-left transition duration-300"
                  style={{ backgroundColor: isActive ? "var(--plan-accent)" : "rgba(255,255,255,.06)" }}
                >
                  <span className="text-sm font-bold">{item.title}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black/20" aria-hidden="true">
                    <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isActive ? "translate-x-0" : "-rotate-45"}`} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile : accordéon */}
          <div className="mt-8 grid gap-2 lg:hidden">
            {items.map((item, index) => {
              const open = mobileOpen === index;
              return (
                <div key={item.title} className="rounded-2xl" style={{ backgroundColor: open ? "var(--plan-accent)" : "rgba(255,255,255,.06)" }}>
                  <button
                    type="button"
                    onClick={() => { setMobileOpen(open ? null : index); setActive(index); }}
                    aria-expanded={open}
                    className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-bold">{item.title}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black/20" aria-hidden="true">
                      <Plus className={`h-4 w-4 transition-transform ${open ? "rotate-45" : ""}`} />
                    </span>
                  </button>
                  {open && item.text && <p className="px-5 pb-5 text-xs leading-6 text-white/85">{item.text}</p>}
                </div>
              );
            })}
          </div>

          <Link href="/services" className="focus-ring group mt-8 hidden w-fit items-center gap-3 rounded-full bg-white py-2.5 pl-7 pr-2.5 text-sm font-bold text-[var(--plan-navy)] transition hover:bg-[var(--plan-sky)] lg:inline-flex">
            Découvrir nos services
            <span className="grid h-9 w-9 place-items-center rounded-full transition" style={{ backgroundColor: "var(--plan-accent)", color: "#fff" }}>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </div>

        {/* Contenu du domaine actif */}
        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
            {current?.image && <Image src={current.image} alt={current.alt ?? current.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition-opacity duration-500" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6">
              <p className="display text-xl text-white">{current?.title}</p>
              {current?.text && <p className="mt-2 text-xs leading-5 text-slate-200">{current.text}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
