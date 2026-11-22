import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { publishedArticle, publishedArticles } from "@/lib/public-content";

export const instant = false;

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, others] = await Promise.all([publishedArticle(slug), publishedArticles()]);
  if (!article) notFound();
  const related = others.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <SiteShell>
      <main className="bg-white">
        <header className="border-b border-slate-100 pt-32">
          <div className="mx-auto max-w-3xl px-6 pb-12 pt-14 lg:px-8">
            <Link href="/actualites" className="text-sm font-bold text-royal transition hover:opacity-70">← Actualités</Link>
            <time className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-royal" dateTime={article.publishedAt?.toISOString()}>
              <CalendarDays className="h-4 w-4" />
              {article.publishedAt ? article.publishedAt.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "À paraître"}
            </time>
            <h1 className="display mt-4 text-4xl uppercase leading-[1.02] text-anthracite md:text-5xl">{article.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">{article.excerpt}</p>
          </div>
        </header>
        <article className="mx-auto max-w-3xl px-6 py-14 lg:px-8">
          {article.coverImage && (
            <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl shadow-xl shadow-anthracite/10">
              <Image src={article.coverImage} alt={article.title} fill priority sizes="(max-width:768px) 100vw, 48rem" className="object-cover" />
            </div>
          )}
          <div className="whitespace-pre-wrap text-justify text-base leading-8 text-slate-700">{article.content}</div>
        </article>
        {related.length > 0 && (
          <section className="mt-8 border-t border-slate-200 bg-mist py-16">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <h2 className="display text-2xl uppercase text-anthracite">À lire également</h2>
              <div className="mt-6 grid gap-4">
                {related.map((item) => (
                  <Link key={item.slug} href={`/actualites/${item.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-royal">
                    <div>
                      <time className="text-[11px] font-bold uppercase tracking-wider text-royal">{item.publishedAt ? item.publishedAt.toLocaleDateString("fr-FR") : "À paraître"}</time>
                      <p className="mt-1 font-extrabold text-anthracite group-hover:text-royal">{item.title}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-royal transition group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </SiteShell>
  );
}
