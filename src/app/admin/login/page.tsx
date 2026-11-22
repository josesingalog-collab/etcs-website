"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Lock, Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(data: FormData) {
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (response.ok) router.push("/admin");
      else {
        const body = await response.json().catch(() => null);
        setError(body?.error ?? "Connexion impossible.");
      }
    } catch {
      setError("Connexion impossible.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-anthracite text-white lg:grid-cols-2">
      <section className="relative hidden isolate overflow-hidden lg:block">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-deep/90 via-anthracite/60 to-anthracite/70" />
        <div className="grid-lines relative flex h-full flex-col justify-end p-14">
          <p className="text-[11px] font-bold uppercase tracking-[.24em] text-gold">ETCS SARL</p>
          <h2 className="display mt-4 max-w-md text-5xl uppercase leading-[.95]">Piloter le contenu du site en toute simplicité.</h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">Réalisations, services, actualités, demandes : gérez tout depuis un espace sécurisé.</p>
        </div>
      </section>
      <section className="grid place-items-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-royal to-royal-deep text-lg font-black shadow-xl">ET</span>
            <h1 className="mt-6 text-2xl font-extrabold">Espace administration</h1>
            <p className="mt-2 text-sm text-slate-400">Accès réservé à l&apos;équipe ETCS.</p>
          </div>
          <form action={submit} className="mt-8 grid gap-5 rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur">
            <label className="grid gap-2 text-sm font-bold text-slate-100">
              Email
              <input name="email" type="email" required autoComplete="email" className="focus-ring w-full rounded-lg border border-white/15 bg-white/10 px-3.5 py-3 text-sm font-normal text-white outline-none placeholder:text-slate-500" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-100">
              Mot de passe
              <input name="password" type="password" required autoComplete="current-password" className="focus-ring w-full rounded-lg border border-white/15 bg-white/10 px-3.5 py-3 text-sm font-normal text-white outline-none placeholder:text-slate-500" />
            </label>
            {error && (
              <p role="alert" className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" />{error}
              </p>
            )}
            <button type="submit" disabled={pending} className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-bold text-anthracite shadow-lg shadow-black/30 transition hover:bg-white disabled:opacity-60">
              {pending ? (<><Loader2 className="h-4 w-4 animate-spin" />Connexion…</>) : (<><Lock className="h-4 w-4" />Se connecter</>)}
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-slate-500">Session sécurisée de 8 heures · ETCS SARL © 2026</p>
        </div>
      </section>
    </main>
  );
}
