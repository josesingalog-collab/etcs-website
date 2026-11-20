import { ReactNode } from "react";

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-anthracite">{label}</span>
      {children}
      {hint && <span className="text-xs font-normal leading-5 text-slate-500">{hint}</span>}
    </label>
  );
}

export const inputClass = "focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-normal text-anthracite outline-none transition placeholder:text-slate-400 hover:border-slate-400";
export const submitClass = "focus-ring inline-flex w-fit items-center gap-2 rounded-xl bg-royal px-6 py-3 text-sm font-bold text-white shadow-lg shadow-royal/25 transition hover:bg-royal-deep";
