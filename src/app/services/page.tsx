import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { publishedServices } from "@/lib/public-content";
import { getSiteSettings } from "@/lib/site-settings";
import { EmptyState, CtaSection } from "@/components/public/sections";
import { ServiceCard } from "@/components/public/cards";
import { Reveal } from "@/components/public/reveal";

export const metadata = { title: "Services" };
export const instant = false;

export default async function Services() {
  const [services, settings] = await Promise.all([publishedServices(), getSiteSettings()]);
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="NOS DOMAINES"
          title="Nos services"
          text="Des prestations structurées pour accompagner vos projets de construction, d'infrastructures et d'ingénierie."
          image={settings?.heroImageUrl}
        />
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {services.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                  <Reveal key={service.slug} delay={Math.min(index, 5) * 0.05}>
                    <ServiceCard service={service} index={index} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <EmptyState title="Aucun service publié pour le moment" text="Les prestations de GTGC seront présentées ici dès leur mise en ligne par l'équipe dans l'espace d'administration." />
            )}
          </div>
        </section>
        <CtaSection title="Besoin d'une prestation précise ?" text="Décrivez votre besoin : nous vous répondrons avec une offre claire et adaptée à votre projet." />
      </main>
    </SiteShell>
  );
}
