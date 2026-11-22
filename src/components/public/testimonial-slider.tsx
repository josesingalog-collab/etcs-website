"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export type Testimonial = { quote: string; author: string; role?: string };

/** Grande citation avec nom et fonction, flèches si plusieurs témoignages. */
export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  if (items.length === 0) return null;
  const current = items[index] ?? items[0];
  return (
    <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
      <Quote className="mx-auto h-10 w-10" style={{ color: "var(--plan-accent)" }} aria-hidden="true" />
      <blockquote className="display mt-8 text-2xl leading-[1.35] text-anthracite md:text-3xl">{current.quote}</blockquote>
      <p className="mt-8 text-sm font-extrabold text-anthracite">{current.author}</p>
      {current.role && <p className="mt-1 text-xs font-semibold text-slate-500">{current.role}</p>}
      {items.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button type="button" aria-label="Témoignage précédent" onClick={() => setIndex((index - 1 + items.length) % items.length)} className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-slate-300 text-anthracite transition hover:bg-[var(--plan-accent)] hover:text-white">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Témoignage suivant" onClick={() => setIndex((index + 1) % items.length)} className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-slate-300 text-anthracite transition hover:bg-[var(--plan-accent)] hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
