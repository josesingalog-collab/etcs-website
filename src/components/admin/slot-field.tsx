"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, TriangleAlert } from "lucide-react";

export type SlotValue = { url: string; alt?: string; focal?: string };

const FOCAL_OPTIONS: { label: string; value: string }[] = [
  { label: "Haut", value: "50% 15%" },
  { label: "Centre", value: "50% 50%" },
  { label: "Bas", value: "50% 85%" },
];

/** Champ image « slot » : fichier ou URL + alt obligatoire + point focal + ratio conseillé.
 * Affiche un badge « image temporaire » tant que l'image n'est pas une vraie photo du client. */
export function SlotField({
  name,
  label,
  defaultValue,
  ratio,
  hint,
  fallbackAlt = "",
}: {
  name: string;
  label: string;
  defaultValue?: SlotValue | string;
  ratio?: string;
  hint?: string;
  fallbackAlt?: string;
}) {
  const initial: SlotValue = typeof defaultValue === "string" ? { url: defaultValue, alt: "", focal: "50% 40%" } : { url: defaultValue?.url ?? "", alt: defaultValue?.alt ?? "", focal: defaultValue?.focal ?? "50% 40%" };
  const fileRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(initial.url);
  const [alt, setAlt] = useState(initial.alt || fallbackAlt);
  const [focal, setFocal] = useState(initial.focal || "50% 40%");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const isTemp = /^\/(images|uploads)\//.test(url) || /^https:\/\/images\.unsplash/.test(url);

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!response.ok || !data?.url) throw new Error(data?.error ?? "Échec de l'import.");
      setUrl(data.url);
      if (!alt.trim()) setAlt(file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Échec de l'import.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-bold text-anthracite">{label}{ratio && <span className="ml-2 text-[10px] font-semibold text-slate-400">Ratio conseillé : {ratio}</span>}</span>
        {isTemp && url && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-amber-700" title="Image provisoire — remplacez-la par une vraie photo">
            <TriangleAlert className="h-3 w-3" />Image temporaire
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="focus-ring w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-normal text-anthracite outline-none transition placeholder:text-slate-400"
          name={`${name}[url]`}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://… ou importez un fichier"
          required
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-anthracite transition hover:bg-slate-100 disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          {busy ? "Import…" : "Importer"}
        </button>
        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={onFile} />
      </div>
      <input className="focus-ring w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-normal text-anthracite outline-none transition placeholder:text-slate-400" name={`${name}[alt]`} type="text" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Texte alternatif (obligatoire — décrivez l'image)" required />
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Point focal</span>
        {FOCAL_OPTIONS.map((option) => (
          <label key={option.value} className={`cursor-pointer rounded-full border px-3 py-1 text-[10px] font-bold transition ${focal === option.value ? "border-[var(--plan-accent)] bg-royal-50 text-royal" : "border-slate-200 text-slate-500"}`}>
            <input type="radio" name={`${name}[focal]`} value={option.value} checked={focal === option.value} onChange={() => setFocal(option.value)} className="sr-only" />
            {option.label}
          </label>
        ))}
      </div>
      {url && (
        <span className="flex items-center gap-3">
          <img src={url} alt="" className="h-16 w-auto rounded-lg border border-slate-200 bg-slate-50 object-contain p-1" />
          <a href={url} target="_blank" rel="noreferrer" className="text-xs font-normal text-royal underline">Voir</a>
        </span>
      )}
      {error && <span className="text-xs font-normal text-red-600">{error}</span>}
      {hint && <span className="text-xs font-normal text-slate-500">{hint}</span>}
    </div>
  );
}
