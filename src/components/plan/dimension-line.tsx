"use client";

import { useEffect, useRef, useState } from "react";

/** Ligne de cote : trait fin avec tirets obliques aux extrémités et valeur au centre.
 * La cote « se trace » de gauche à droite à l'entrée dans l'écran (désactivé si prefers-reduced-motion). */
export function DimensionLine({ label, light = false, className = "" }: { label: string; light?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: reduced ? 0 : 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const lineColor = light ? "var(--plan-sky)" : "var(--plan-accent)";
  const textColor = light ? "var(--plan-sky)" : "var(--plan-navy)";

  return (
    <div ref={ref} className={`grid gap-1.5 ${className}`}>
      <div className="relative h-px w-full overflow-visible" style={{ backgroundColor: lineColor, transformOrigin: "left", transform: visible ? "scaleX(1)" : "scaleX(0)", transition: "transform 900ms cubic-bezier(.22,.61,.36,1)" }}>
        <span className="absolute -left-0.5 -top-1 h-2 w-px" style={{ backgroundColor: lineColor, transform: "rotate(-45deg)" }} aria-hidden="true" />
        <span className="absolute -right-0.5 -top-1 h-2 w-px" style={{ backgroundColor: lineColor, transform: "rotate(-45deg)" }} aria-hidden="true" />
      </div>
      <p className="annotation text-[10px] opacity-90" style={{ color: textColor, transition: "opacity 600ms 400ms", opacity: visible ? 1 : 0 }}>
        {label}
      </p>
    </div>
  );
}
