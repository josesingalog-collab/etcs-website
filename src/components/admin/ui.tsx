import Link from "next/link";
import { CheckCircle2, Plus } from "lucide-react";

export function AdminHeader({ eyebrow, title, text, actionLabel, actionHref }: { eyebrow: string; title: string; text?: string; actionLabel?: string; actionHref?: string }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-5 border-b border-slate-200 pb-6">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[.24em] text-royal">{eyebrow}</p>
        <h1 className="display mt-2 text-3xl uppercase leading-none md:text-4xl">{title}</h1>
        {text && <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">{text}</p>}
      </div>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-xl bg-royal px-5 py-3 text-sm font-bold text-white shadow-lg shadow-royal/25 transition hover:bg-royal-deep">
          <Plus className="h-4 w-4" />{actionLabel}
        </Link>
      )}
    </header>
  );
}

export function SavedBanner({ saved }: { saved?: boolean | string }) {
  if (!saved || saved === "0") return null;
  return (
    <div role="status" aria-live="polite" className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-3.5 text-sm font-semibold text-green-800">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
      Modifications enregistrées avec succès.
    </div>
  );
}

export function StatCard({ label, value, href, detail, icon: Icon }: { label: string; value: number; href?: string; detail?: string; icon: React.ComponentType<{ className?: string }> }) {
  const content = (
    <div className="card-hover flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal-50"><Icon className="h-5 w-5 text-royal" /></span>
        <span className="display text-4xl leading-none text-anthracite">{value}</span>
      </div>
      <p className="mt-5 text-sm font-bold text-anthracite">{label}</p>
      {detail && <p className="mt-1 text-xs font-semibold text-slate-500">{detail}</p>}
    </div>
  );
  return href ? <Link href={href} className="block">{content}</Link> : content;
}

const publicationStyles: Record<string, string> = {
  PUBLISHED: "bg-green-50 text-green-700 border-green-200",
  DRAFT: "bg-amber-50 text-amber-700 border-amber-200",
};

const publicationLabels: Record<string, string> = { PUBLISHED: "Publié", DRAFT: "Brouillon" };

export function PublicationBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-[11px] font-bold ${publicationStyles[status] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>
      {publicationLabels[status] ?? status}
    </span>
  );
}

const requestStatusStyles: Record<string, string> = {
  NEW: "bg-royal-100 text-royal border-royal-100",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
  PROCESSED: "bg-green-50 text-green-700 border-green-200",
  ARCHIVED: "bg-slate-100 text-slate-600 border-slate-200",
};

const requestStatusLabels: Record<string, string> = { NEW: "Nouveau", IN_PROGRESS: "En cours", PROCESSED: "Traité", ARCHIVED: "Archivé" };

export function RequestStatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-[11px] font-bold ${requestStatusStyles[status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
      {requestStatusLabels[status] ?? status}
    </span>
  );
}
