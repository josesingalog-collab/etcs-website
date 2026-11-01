import { RequestStatusForm } from "@/components/admin/request-status";
import { updateQuoteStatus } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/ui";

export default async function QuotesAdmin() {
  const requests = await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } });
  const newCount = requests.filter((request) => request.status === "NEW").length;
  return (
    <>
      <AdminHeader eyebrow="RELATION CLIENT" title="Demandes de devis" text={`${requests.length} demande${requests.length === 1 ? "" : "s"} au total · ${newCount} à traiter`} />
      <div className="mt-8 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="grid self-start gap-4">
          {requests.map((request) => (
            <article key={request.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold text-anthracite">{request.subject}</h2>
                <time className="text-xs font-semibold text-slate-500">{request.createdAt.toLocaleDateString("fr-FR")}</time>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {request.name} · <a className="font-semibold text-royal hover:underline" href={`mailto:${request.email}`}>{request.email}</a> · {request.phone}
              </p>
              <p className="mt-4 whitespace-pre-wrap rounded-xl bg-mist p-4 text-sm leading-6 text-slate-700">{request.message}</p>
            </article>
          ))}
          {requests.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-sm text-slate-500">Aucune demande de devis pour le moment. Les envois depuis /devis apparaîtront ici.</div>
          )}
        </div>
        <div className="grid gap-4 self-start">
          {requests.map((request) => (
            <article key={`status-${request.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="truncate text-sm font-bold text-anthracite">{request.subject}</p>
              <p className="text-xs text-slate-500">{request.name} · {request.createdAt.toLocaleDateString("fr-FR")}</p>
              <div className="mt-3"><RequestStatusForm action={updateQuoteStatus} id={request.id} status={request.status} /></div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
