"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { label: string; value: string };

function parseValue(value: string): { prefix: string; number: number | null; suffix: string } {
  const match = value.match(/^([^\d]*)([\d\s\u00a0.,]+)(.*)$/);
  if (!match) return { prefix: "", number: null, suffix: value };
  return { prefix: match[1], number: Number(match[2].replace(/[\s\u00a0.,]/g, "")) || 0, suffix: match[3] };
}

/** Compteurs animés à hauteurs décalées, reliés par des traits verticaux fins, fond esquisse au trait. */
export function StatsCounters({ stats }: { stats: Stat[] }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(stats.map(() => false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setVisible((current) => {
                const next = [...current];
                next[index] = true;
                return next;
              });
              observer.disconnect();
            }
          }
        },
        { threshold: 0.3 },
      );
      observers.push(observer);
      observer.observe(el);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* fond esquisse de bâtiments au trait */}
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-slate-200" viewBox="0 0 1200 160" fill="none" aria-hidden="true" preserveAspectRatio="none">
        <g stroke="currentColor" strokeWidth="1.5">
          <path d="M60 160V70h60v90M80 70V50h20v20M100 100h-40M100 120h-40" />
          <path d="M180 160V40h90v120M200 60h50M200 90h50M200 120h50M220 40V20h20v20" />
          <path d="M330 160V90h70v70M350 110h30M350 130h30" />
          <path d="M470 160V50h80v110M490 70h40M490 100h40M490 130h40" />
          <path d="M610 160V80h60v80M630 100h20M630 120h20" />
          <path d="M730 160V30h100v130M750 50h60M750 80h60M750 110h60M770 30V10h20v20" />
          <path d="M900 160V60h70v100M920 80h30M920 110h30M920 135h30" />
          <path d="M1030 160V90h70v70M1050 110h30M1050 130h30" />
        </g>
      </svg>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {stats.map((stat, index) => {
          const parsed = parseValue(stat.value);
          const shown = visible[index];
          const offsets = ["lg:mt-16", "lg:mt-6", "lg:mt-24", "lg:mt-10", "lg:mt-20", "lg:mt-8"];
          return (
            <div key={`${stat.label}-${index}`} ref={(el) => { refs.current[index] = el; }} className={`text-center ${offsets[index % offsets.length]}`}>
              <div className="mx-auto h-14 w-px" style={{ backgroundColor: "var(--plan-line)" }} aria-hidden="true" />
              <p className="display mt-4 text-5xl leading-none" style={{ color: "var(--plan-navy)" }}>
                {shown && parsed.number !== null ? parsed.prefix + parsed.number.toLocaleString("fr-FR") + parsed.suffix : stat.value}
              </p>
              <p className="mx-auto mt-3 max-w-[11rem] text-xs font-semibold leading-5 text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
