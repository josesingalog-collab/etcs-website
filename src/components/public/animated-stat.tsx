"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "motion/react";

function parseValue(raw: string) {
  const match = raw.match(/^([\d\s\u00a0.,]+)(.*)$/);
  if (!match) return null;
  const target = parseInt(match[1].replace(/[\s\u00a0.,]/g, ""), 10);
  if (Number.isNaN(target)) return null;
  return { target, suffix: match[2] ?? "" };
}

function format(target: number, digits: string) {
  const isYear = target >= 1900 && target <= 2100;
  return isYear ? String(target) : target.toLocaleString("fr-FR") + (digits.trim() ? ` ${digits.trim()}` : "");
}

export function AnimatedStat({ value }: { value: string }) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(parsed ? "0" : value);

  useEffect(() => {
    if (!parsed || !inView) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(format(Math.round(parsed.target * eased), parsed.suffix));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [parsed, inView]);

  if (!parsed) return <span>{value}</span>;
  return <span ref={ref}>{display}</span>;
}
