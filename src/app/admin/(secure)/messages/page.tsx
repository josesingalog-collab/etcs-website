import { RequestStatusForm } from "@/components/admin/request-status";
import { updateMessageStatus } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/ui";

export default async function MessagesAdmin() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  const newCount = messages.filter((message) => message.status === "NEW").length;
  return (
    <>
      <AdminHeader eyebrow="RELATION CLIENT" title="Messages" text={`${messages.length} message${messages.length === 1 ? "" : "s"} au total · ${newCount} à traiter`} />
      <div className="mt-8 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="grid self-start gap-4">
          {messages.map((message) => (
            <article key={message.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold text-anthracite">{message.subject}</h2>
                <time className="text-xs font-semibold text-slate-500">{message.createdAt.toLocaleDateString("fr-FR")}</time>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {message.name} · <a className="font-semibold text-royal hover:underline" href={`mailto:${message.email}`}>{message.email}</a> · {message.phone}
              </p>
              <p className="mt-4 whitespace-pre-wrap rounded-xl bg-mist p-4 text-sm leading-6 text-slate-700">{message.message}</p>
            </article>
          ))}
          {messages.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-sm text-slate-500">Aucun message reçu pour le moment. Les envois depuis /contact apparaîtront ici.</div>
          )}
        </div>
        <div className="grid gap-4 self-start">
          {messages.map((message) => (
            <article key={`status-${message.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="truncate text-sm font-bold text-anthracite">{message.subject}</p>
              <p className="text-xs text-slate-500">{message.name} · {message.createdAt.toLocaleDateString("fr-FR")}</p>
              <div className="mt-3"><RequestStatusForm action={updateMessageStatus} id={message.id} status={message.status} /></div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
