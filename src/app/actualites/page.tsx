import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { publishedArticles } from "@/lib/public-content";
import { getSiteSettings } from "@/lib/site-settings";
import { EmptyState } from "@/components/public/sections";
import { ArticleCard } from "@/components/public/cards";
import { Reveal } from "@/components/public/reveal";

export const metadata = { title: "Actualités" };
export const instant = false;

export default async function News() {
  const [articles, settings] = await Promise.all([publishedArticles(), getSiteSettings()]);
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="JOURNAL"
          title="Les actualités de E.T.C.S Sarl"
          text="Vie de l'entreprise, chantiers en cours et annonces institutionnelles."
          image={settings?.heroImageUrl}
        />
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {articles.length > 0 ? (
              articles.length === 1 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Reveal><ArticleCard article={articles[0]} /></Reveal>
                </div>
              ) : articles.length === 2 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {articles.map((article, index) => (
                    <Reveal key={article.slug} delay={index * 0.05}><ArticleCard article={article} featured={index === 0} /></Reveal>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article, index) => (
                    <Reveal key={article.slug} delay={Math.min(index, 5) * 0.05}><ArticleCard article={article} /></Reveal>
                  ))}
                </div>
              )
            ) : (
              <EmptyState title="Aucune actualité publiée" text="Les communiqués et nouvelles de l'entreprise seront publiés ici par l'équipe E.T.C.S Sarl." />
            )}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
