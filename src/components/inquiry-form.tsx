"use client";

import { useState } from "react";
import { CheckCircle2, Send, AlertCircle, Loader2, Paperclip, X } from "lucide-react";

const inputClass = "focus-ring w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-sm font-normal text-anthracite outline-none placeholder:text-slate-400";

function Field({ label, name, type = "text", required = true, hint }: { label: string; name: string; type?: string; required?: boolean; hint?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-anthracite">
      {label}
      <input name={name} type={type} required={required} className={inputClass} />
      {hint && <span className="text-xs font-normal text-slate-500">{hint}</span>}
    </label>
  );
}

export function InquiryForm({ type }: { type: "quote" | "contact" }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [planUrl, setPlanUrl] = useState("");
  const [planName, setPlanName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function onPlanChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/devis/upload", { method: "POST", body });
      const data = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!response.ok || !data?.url) throw new Error(data?.error ?? "Échec de l'envoi du plan.");
      setPlanUrl(data.url);
      setPlanName(file.name);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Échec de l'envoi du plan.");
    } finally {
      setUploading(false);
    }
  }

  async function submit(formData: FormData) {
    setState("sending");
    try {
      const response = await fetch(`/api/${type === "quote" ? "devis" : "contact"}`, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });
      setState(response.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div role="status" aria-live="polite" className="grid place-items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
        <p className="text-base font-bold text-green-900">Votre demande a bien été reçue.</p>
        <p className="max-w-sm text-sm leading-6 text-green-800">L&apos;équipe E.T.C.S Sarl vous répondra dans les plus brefs délais.</p>
      </div>
    );
  }

  return (
    <form action={submit} className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-anthracite/5 sm:p-8">
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet" name="name" />
        <Field label="Téléphone" name="phone" type="tel" />
      </div>
      <Field label="Adresse email" name="email" type="email" />
      <Field label={type === "quote" ? "Type de projet" : "Sujet"} name="subject" required={false} />
      {type === "quote" && <Field label="Localisation du projet" hint="Commune, ville, pays — ex. Gombe, Kinshasa, RDC" name="localisation" required={false} />}
      <label className="grid gap-2 text-sm font-bold text-anthracite">
        Votre message
        <textarea name="message" required rows={5} className={inputClass} />
      </label>
      {type === "quote" && (
        <div className="grid gap-2">
          <span className="text-sm font-bold text-anthracite">Plans ou documents du projet (PDF, JPG, PNG — 10 Mo max.)</span>
          <input
            type="file"
            accept="application/pdf,image/png,image/jpeg"
            onChange={onPlanChange}
            disabled={uploading}
            className="focus-ring block w-full cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3.5 py-3 text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-royal file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-royal-deep"
          />
          {uploading && (
            <p className="flex items-center gap-2 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" />Envoi du plan…</p>
          )}
          {planUrl && (
            <p className="flex items-center gap-2 text-sm text-green-700">
              <Paperclip className="h-4 w-4" />
              <a href={planUrl} target="_blank" rel="noreferrer" className="font-semibold underline">{planName}</a>
              <button type="button" onClick={() => { setPlanUrl(""); setPlanName(""); }} aria-label="Retirer le fichier" className="text-slate-400 hover:text-red-600"><X className="h-4 w-4" /></button>
            </p>
          )}
          {uploadError && <p className="text-sm font-semibold text-red-700">{uploadError}</p>}
        </div>
      )}
      <input type="hidden" name="planUrl" value={planUrl} />
      <button
        disabled={state === "sending"}
        className="focus-ring mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-royal px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-royal/25 transition hover:bg-royal-deep disabled:opacity-60"
      >
        {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {state === "sending" ? "Envoi en cours…" : type === "quote" ? "Envoyer ma demande" : "Envoyer le message"}
      </button>
      {state === "error" && (
        <p role="alert" className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Une erreur est survenue. Veuillez réessayer ou nous appeler.
        </p>
      )}
    </form>
  );
}
