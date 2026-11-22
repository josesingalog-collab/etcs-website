"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

/** FAQ accordéon style référence : numéros accentués, ouverture une à la fois. */
export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="grid gap-3">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white transition" style={open ? { borderColor: "var(--plan-accent)" } : undefined}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
              <span className="flex items-center gap-4">
                <span className="annotation grid h-9 w-9 shrink-0 place-items-center rounded-full text-[10px] text-white" style={{ backgroundColor: open ? "var(--plan-accent)" : "var(--plan-navy)" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-bold text-anthracite sm:text-base">{item.question}</span>
              </span>
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border transition"
                style={{ borderColor: "var(--plan-line)", transform: open ? "rotate(45deg)" : "none" }}
                aria-hidden="true"
              >
                <Plus className="h-4 w-4 text-anthracite" />
              </span>
            </button>
            {open && (
              <div className="px-5 pb-5 sm:px-6">
                <p className="ml-0 text-sm leading-7 text-slate-600 sm:ml-13" style={{ paddingLeft: "3.25rem" }}>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
