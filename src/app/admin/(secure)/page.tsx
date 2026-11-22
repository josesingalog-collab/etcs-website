import Link from "next/link";
import { Building2, FileText, FolderKanban, Mail, Newspaper, PenLine, Plus, Send, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminHeader, StatCard, RequestStatusBadge } from "@/components/admin/ui";

export const metadata = { title: "Administration E.T.C.S Sarl", robots: { index: false, follow: false } };

export default async function Admin() {
  const [projects, publishedProjects, services, articles, quotes, messages, newQuotes, latestQuotes, latestMessages] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { publicationStatus: "PUBLISHED" } }),
    prisma.service.count(),
    prisma.article.count(),
    prisma.quoteRequest.count(),
    prisma.contactMessage.count(),
    prisma.quoteRequest.count({ where: { status: "NEW" } }),
    prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
  ]);

  return (
    <>
      <AdminHeader eyebrow="PILOTAGE" title="Tableau de bord" text="Vue d'ensemble des contenus et des échanges enregistrés." />
      <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FolderKanban} label="Réalisations" value={projects} detail={`${publishedProjects} publiée${publishedProjects === 1 ? "" : "s"}`} href="/admin/realisations" />
        <StatCard icon={Building2} label="Services" value={services} href="/admin/services" />
        <StatCard icon={Newspaper} label="Actualités" value={articles} href="/admin/actualites" />
        <StatCard icon={FileText} label="Demandes de devis" value={quotes} detail={`${newQuotes} nouvelle${newQuotes === 1 ? "" : "s"}`} href="/admin/demandes" />
        <StatCard icon={Mail} label="Messages reçus" value={messages} href="/admin/messages" />
        <StatCard icon={PenLine} label="Contenus des pages" value={6} detail="Accueil, À propos, Services…" href="/admin/contenus" />
        <StatCard icon={Send} label="Publication" value={publishedProjects + articles} detail="Contenus en ligne" href="/admin/realisations" />
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-extrabold text-anthracite">Dernières demandes de devis</h2>
            <Link href="/admin/demandes" className="inline-flex items-center gap-1.5 text-sm font-bold text-royal hover:gap-2.5 transition-all">Toutes <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-5 grid gap-3">
            {latestQuotes.map((request) => (
              <div key={request.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-mist px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-anthracite">{request.subject}</p>
                  <p className="text-xs text-slate-500">{request.name} · {request.createdAt.toLocaleDateString("fr-FR")}</p>
                </div>
                <RequestStatusBadge status={request.status} />
              </div>
            ))}
            {latestQuotes.length === 0 && <p className="rounded-xl bg-mist px-4 py-6 text-sm text-slate-500">Aucune demande pour l'instant. Les demandes envoyées depuis le site apparaîtront ici.</p>}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-extrabold text-anthracite">Derniers messages</h2>
            <Link href="/admin/messages" className="inline-flex items-center gap-1.5 text-sm font-bold text-royal hover:gap-2.5 transition-all">Tous <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-5 grid gap-3">
            {latestMessages.map((message) => (
              <div key={message.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-mist px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-anthracite">{message.subject}</p>
                  <p className="text-xs text-slate-500">{message.name} · {message.createdAt.toLocaleDateString("fr-FR")}</p>
                </div>
                <RequestStatusBadge status={message.status} />
              </div>
            ))}
            {latestMessages.length === 0 && <p className="rounded-xl bg-mist px-4 py-6 text-sm text-slate-500">Aucun message pour l'instant. Les messages du formulaire de contact apparaîtront ici.</p>}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-5 sm:grid-cols-2">
        {[
          { title: "Modifier une page du site", text: "Textes et photos de l'accueil, à propos, contact…", href: "/admin/contenus" },
          { title: "Publier une réalisation", text: "Ajouter un projet au portfolio public.", href: "/admin/realisations/nouveau" },
          { title: "Publier un service", text: "Présenter une expertise sur le site.", href: "/admin/services/nouveau" },
          { title: "Rédiger un article", text: "Informer vos partenaires et clients.", href: "/admin/actualites/nouveau" },
        ].map(({ title, text, href }) => (
          <Link key={href} href={href} className="card-hover group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-50"><Plus className="h-5 w-5 text-gold-dark" /></span>
            <div>
              <p className="font-extrabold text-anthracite group-hover:text-royal">{title}</p>
              <p className="text-sm text-slate-500">{text}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-10 rounded-2xl bg-anthracite p-7 text-white sm:p-9">
        <p className="text-[11px] font-bold uppercase tracking-[.22em] text-gold">ESPACE ÉDITORIAL</p>
        <h2 className="display mt-3 text-3xl uppercase">Publiez, puis le site se met à jour.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Les contenus en statut « Publié » sont automatiquement visibles dans les sections publiques correspondantes. Les brouillons restent visibles ici uniquement.</p>
      </section>
    </>
  );
}
