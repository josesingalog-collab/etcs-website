import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { deleteArticle } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { AdminHeader, SavedBanner, PublicationBadge } from "@/components/admin/ui";

export default async function ArticlesAdmin({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [articles, params] = await Promise.all([
    prisma.article.findMany({ orderBy: { updatedAt: "desc" } }),
    searchParams,
  ]);
  return (
    <>
      <AdminHeader eyebrow="JOURNAL" title="Actualités" text="Articles diffusés dans la section Actualités du site." actionLabel="Nouvel article" actionHref="/admin/actualites/nouveau" />
      <SavedBanner saved={params.saved} />
      <div className="mt-8 grid gap-4">
        {articles.map((article) => (
          <article key={article.id} className="card-hover flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex min-w-0 items-center gap-4">
              {article.coverImage ? (
                <span className="relative hidden h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:block">
                  <Image src={article.coverImage} alt="" fill sizes="80px" className="object-cover" />
                </span>
              ) : (
                <span className="hidden h-14 w-20 shrink-0 rounded-lg bg-royal-50 sm:block" />
              )}
              <div className="min-w-0">
                <h2 className="truncate font-bold text-anthracite">{article.title}</h2>
                <p className="mt-1 text-xs text-slate-500">
                  {article.publishedAt ? article.publishedAt.toLocaleDateString("fr-FR") : "Sans date"} · /actualites/{article.slug}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PublicationBadge status={article.publicationStatus} />
              <div className="flex items-center gap-2">
                <Link href={`/admin/actualites/${article.id}`} className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-royal transition hover:bg-royal-50"><Pencil className="h-3.5 w-3.5" />Modifier</Link>
                <ConfirmDelete action={deleteArticle} id={article.id} label={article.title} />
              </div>
            </div>
          </article>
        ))}
        {articles.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-sm text-slate-500">Aucun article enregistré. Rédigez le premier avec « Nouvel article ».</p>}
      </div>
    </>
  );
}
