"use client";

import { useState } from "react";

/** Zone de texte avec compteur de caractères (exigé pour les textes de l'admin). */
export function CountedTextarea({
  label,
  name,
  rows = 3,
  defaultValue = "",
  hint,
  required = false,
  maxLength = 20000,
}: {
  label: string;
  name: string;
  rows?: number;
  defaultValue?: string;
  hint?: string;
  required?: boolean;
  maxLength?: number;
}) {
  const [length, setLength] = useState(defaultValue.length);
  return (
    <label className="grid gap-2">
      <span className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-bold text-anthracite">{label}</span>
        <span className={`text-[10px] font-bold ${length > maxLength ? "text-red-600" : "text-slate-400"}`}>{length} / {maxLength} caractères</span>
      </span>
      <textarea
        className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-normal text-anthracite outline-none transition placeholder:text-slate-400"
        name={name}
        rows={rows}
        required={required}
        maxLength={maxLength}
        defaultValue={defaultValue}
        onChange={(event) => setLength(event.target.value.length)}
      />
      {hint && <span className="text-xs font-normal text-slate-500">{hint}</span>}
    </label>
  );
}
