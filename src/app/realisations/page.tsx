import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { publishedProjects } from "@/lib/public-content";
import { getSiteSettings } from "@/lib/site-settings";
import { EmptyState, CtaSection } from "@/components/public/sections";
import { ProjectGallery } from "@/components/public/project-filters";

export const metadata = { title: "Réalisations" };
export const instant = false;

export default async function Projects() {
  const [projects, settings] = await Promise.all([publishedProjects(), getSiteSettings()]);
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="RÉFÉRENCES"
          title="Nos réalisations"
          text="Découvrez les projets publiés par ETCS : ouvrages, chantiers et infrastructures réalisés avec exigence."
          image={settings?.heroImageUrl}
        />
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {projects.length > 0 ? (
              <ProjectGallery projects={projects} />
            ) : (
              <EmptyState title="Aucune réalisation publiée pour le moment" text="Le portfolio ETCS sera alimenté dès que des projets auront été publiés dans l'espace d'administration. Revenez bientôt." />
            )}
          </div>
        </section>
        <CtaSection title="Votre projet mérite une équipe exigeante" text="Parlez-nous de votre chantier et recevez une proposition technique claire." />
      </main>
    </SiteShell>
  );
}
