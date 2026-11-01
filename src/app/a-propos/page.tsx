import Image from "next/image";
import { Eye, Target, Gem, BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteSettings } from "@/lib/site-settings";
import { SectionHeading, CtaSection } from "@/components/public/sections";
import { Reveal } from "@/components/public/reveal";

export const metadata = { title: "À propos" };
export const instant = false;

const fallbackImage = "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1600&q=85";

const pillars = [
  { icon: Target, title: "Notre mission", text: "Réaliser des ouvrages de génie civil fiables et durables, en apportant à chaque client une exécution technique irréprochable et une relation claire, du devis à la réception." },
  { icon: Eye, title: "Notre vision", text: "Devenir un acteur de référence du bâtiment et des infrastructures en RDC, reconnu pour la qualité de nos réalisations et la confiance de nos partenaires." },
  { icon: Gem, title: "Nos valeurs", text: "Rigueur, transparence, sécurité et engagement : des principes concrets qui gouvernent chaque chantier et chaque relation d'affaires." },
];

export default async function About() {
  const settings = await getSiteSettings();
  const text = settings?.aboutText || "Grand Travaux de Génie Civil (GTGC SARL) se positionne autour de la qualité d'exécution, de la précision technique et du dialogue avec ses partenaires.";
  const image = settings?.heroImageUrl || fallbackImage;

  return (
    <SiteShell>
      <main>
        <PageHero eyebrow={settings?.companyName || "GTGC SARL"} title="Une vision construite pour durer" text={text} image={image} />

        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-anthracite/20">
                <Image src={image} alt="Chantier GTGC" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading eyebrow="NOTRE ENGAGEMENT" title="Faire avancer chaque projet avec exigence" />
              <p className="mt-6 whitespace-pre-wrap leading-8 text-slate-600">{text}</p>
              <div className="mt-10 grid gap-6 border-t border-slate-200 pt-8 sm:grid-cols-3">
                <div><p className="text-sm font-black uppercase tracking-wide text-royal">Rigueur</p><p className="mt-1 text-sm text-slate-500">à chaque étape du chantier</p></div>
                <div><p className="text-sm font-black uppercase tracking-wide text-royal">Écoute</p><p className="mt-1 text-sm text-slate-500">de chaque besoin exprimé</p></div>
                <div><p className="text-sm font-black uppercase tracking-wide text-royal">Vision</p><p className="mt-1 text-sm text-slate-500">pour un avenir construit</p></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-mist py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal><SectionHeading align="center" eyebrow="INSTITUTIONNEL" title="Mission, vision et valeurs" /></Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {pillars.map(({ icon: Icon, title, text }, index) => (
                <Reveal key={title} delay={index * 0.07}>
                  <div className="card-hover h-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-royal shadow-md shadow-royal/30"><Icon className="h-6 w-6 text-white" /></span>
                    <h3 className="mt-6 text-lg font-extrabold uppercase tracking-wide text-anthracite">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-anthracite py-24 text-white">
          <div className="grid-lines"><div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
            <Reveal>
              <SectionHeading light eyebrow="QUALITÉ & EXPERTISE" title="L'excellence comme standard d'exécution" />
              <p className="mt-6 leading-8 text-slate-300">
                Nos équipes appliquent des procédures de contrôle systématiques : vérification des matériaux, suivi des plans d'exécution, respect des règles de sécurité et contrôle qualité à chaque phase du chantier.
              </p>
              <p className="mt-4 leading-8 text-slate-300">
                Cette discipline technique est le socle de la confiance que nous accordent nos partenaires institutionnels et privés.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="border-gold/40 rounded-3xl border bg-white/5 p-8 backdrop-blur">
                <BadgeCheck className="h-8 w-8 text-gold" />
                <p className="mt-5 text-lg font-extrabold">Un contrôle qualité à toutes les phases</p>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-300">
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />Sélection et vérification des matériaux</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />Suivi des plans et études d'exécution</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />Sécurité des équipes et des tiers</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />Reporting régulier vers le client</li>
                </ul>
              </div>
            </Reveal>
          </div></div>
        </section>

        <CtaSection title="Confiez-nous votre prochain ouvrage" text="Discutons de votre projet : nos équipes vous répondent avec une proposition claire et documentée." primaryHref="/devis" />
      </main>
    </SiteShell>
  );
}
