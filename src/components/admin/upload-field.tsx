"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

export function UploadField({
  name,
  label,
  hint,
  defaultValue = "",
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

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
      setValue(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Échec de l'import.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="grid gap-2">
      <span className="text-sm font-bold text-anthracite">{label}</span>
      <div className="flex gap-2">
        <input
          className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-normal text-anthracite outline-none transition placeholder:text-slate-400 hover:border-slate-400"
          name={name}
          type="url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://… ou importez un fichier"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-bold text-anthracite transition hover:bg-slate-100 disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          {busy ? "Import…" : "Importer"}
        </button>
        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={onFile} />
      </div>
      {value && (
        <span className="mt-1 flex items-center gap-3">
          <img src={value} alt="" className="h-14 w-auto rounded-lg border border-slate-200 bg-slate-50 object-contain p-1" />
          <a href={value} target="_blank" rel="noreferrer" className="text-xs font-normal text-royal underline">Voir</a>
        </span>
      )}
      {error && <span className="text-xs font-normal text-red-600">{error}</span>}
      {hint && <span className="text-xs font-normal leading-5 text-slate-500">{hint}</span>}
    </div>
  );
}
