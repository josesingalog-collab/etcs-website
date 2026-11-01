import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";

export const metadata = { title: "Mentions légales" };
export const instant = false;

export default function Legal() {
  return (
    <SiteShell>
      <PageHero eyebrow="INFORMATIONS" title="Mentions légales" />
      <article className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="display text-xl uppercase text-royal">Éditeur</h2>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            GTGC SARL — Grand Travaux de Génie Civil. Adresse : 15, Mayala, Musey, Ngaliema, Kinshasa, RDC. Les informations juridiques définitives doivent être complétées avant mise en ligne publique.
          </p>
          <h2 className="display mt-10 text-xl uppercase text-royal">Contenus</h2>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            Les contenus de démonstration et visuels provisoires ne constituent pas des références commerciales ni des affirmations contractuelles.
          </p>
        </section>
      </article>
    </SiteShell>
  );
}
