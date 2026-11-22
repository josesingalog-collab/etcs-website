import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";

export const metadata = { title: "Politique de confidentialité" };
export const instant = false;

export default function Privacy() {
  return (
    <SiteShell>
      <PageHero eyebrow="DONNÉES PERSONNELLES" title="Politique de confidentialité" />
      <article className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="display text-xl uppercase text-royal">Finalité</h2>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            Les données soumises par les formulaires sont utilisées exclusivement pour répondre aux demandes de contact et de devis. Elles ne sont pas vendues à des tiers.
          </p>
          <h2 className="display mt-10 text-xl uppercase text-royal">Vos droits</h2>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            Pour demander l&apos;accès, la rectification ou la suppression de vos informations, contactez ETCS à l&apos;adresse électronique indiquée sur ce site.
          </p>
        </section>
      </article>
    </SiteShell>
  );
}
