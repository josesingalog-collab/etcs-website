import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, HardHat, DraftingCompass, Route, Wrench, BadgeCheck, Compass, Handshake, Target } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { publishedProjects, publishedServices, publishedArticles } from "@/lib/public-content";
import { getSiteSettings } from "@/lib/site-settings";
import { parseKeyStats } from "@/lib/key-stats";
import { SectionHeading, EmptyState, CtaSection, StatsSection } from "@/components/public/sections";
import { ProjectCard, ServiceCard, ArticleCard } from "@/components/public/cards";
import { Reveal } from "@/components/public/reveal";

export const instant = false;

const fallbackHeroImage = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=90";

const presentationFallback = "GTGC SARL (Grand Travaux de Génie Civil) est une entreprise orientée vers la réalisation de projets de construction et de génie civil en République démocratique du Congo.\n\nNous plaçons la qualité d'exécution, la rigueur technique et le professionnalisme au cœur de notre approche afin d'accompagner nos clients dans la concrétisation de leurs projets.\n\nChaque projet représente un engagement envers la qualité, la durabilité et la satisfaction de nos partenaires.";

const strengths = [
  { icon: BadgeCheck, label: "Rigueur et qualité d'exécution" },
  { icon: Compass, label: "Expertise technique" },
  { icon: Handshake, label: "Engagement et professionnalisme" },
];

const features = [
  { icon: Building2, title: "Construction et bâtiment", text: "Construction de bâtiments résidentiels, commerciaux et institutionnels." },
  { icon: HardHat, title: "Génie civil", text: "Études et réalisation d'ouvrages de génie civil adaptés aux exigences de chaque projet." },
  { icon: DraftingCompass, title: "Études et ingénierie", text: "Études techniques, conception et dimensionnement des ouvrages." },
  { icon: Route, title: "Travaux publics", text: "Aménagements, infrastructures et travaux liés au développement des espaces publics." },
  { icon: Wrench, title: "Réhabilitation et rénovation", text: "Réfection, modernisation et remise en état des bâtiments et ouvrages existants." },
];

function lastRowOffset(count: number, index: number) {
  const lastRowStart = Math.floor((count - 1) / 3) * 3;
  if (count <= 3 || index < lastRowStart) return "";
  const inLastRow = count - lastRowStart;
  if (inLastRow === 2 && index === lastRowStart) return "lg:col-start-2";
  if (inLastRow === 1) return "lg:col-start-3";
  return "";
}

const commitments = [
  { icon: DraftingCompass, title: "Rigueur technique", text: "Une approche structurée et méthodique dans l'analyse et la conduite de chaque projet." },
  { icon: BadgeCheck, title: "Qualité d'exécution", text: "Une attention particulière portée à la qualité des travaux et au respect des exigences techniques." },
  { icon: Handshake, title: "Engagement professionnel", text: "Un accompagnement sérieux et une collaboration fondée sur la confiance." },
  { icon: Target, title: "Solutions adaptées", text: "Une approche tenant compte des besoins, des contraintes et des objectifs de chaque projet." },
];

const commitmentImage = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85";

export default async function Home() {
  const [projects, services, articles, settings] = await Promise.all([
    publishedProjects(),
    publishedServices(),
    publishedArticles(),
    getSiteSettings(),
  ]);
  const stats = parseKeyStats(settings?.keyStats);
  const intro = settings?.aboutText || "GTGC SARL, Grand Travaux de Génie Civil, conçoit et réalise des projets de construction durables et ambitieux en République démocratique du Congo.";
  const latestProjects = projects.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  return (
    <SiteShell>
      <main>
        <section aria-label="Introduction" className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-anthracite text-white">
          <div className="absolute inset-0">
            <Image src={settings?.heroImageUrl || fallbackHeroImage} alt="Chantier GTGC" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-anthracite via-anthracite/85 to-anthracite/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-transparent to-anthracite/40" />
          </div>
          <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-44 lg:px-8">
            <div className="max-w-4xl">
              <p className="rise flex items-center gap-3 text-xs font-bold tracking-[.24em] text-gold">
                <span className="h-px w-10 bg-gold" />GTGC SARL — KINSHASA, RDC
              </p>
              <h1 className="rise rise-1 display mt-7 uppercase leading-[1.02] text-[clamp(1.5rem,7.6vw,5rem)]">
                Bâtir aujourd&apos;hui<br />les infrastructures<br /><span className="text-gold">de demain.</span>
              </h1>
              <p className="rise rise-2 mt-8 max-w-xl text-lg leading-8 text-slate-200">{intro}</p>
              <div className="rise rise-3 mt-10 flex flex-wrap gap-4">
                <Link href="/services" className="focus-ring inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-4 text-sm font-bold text-anthracite shadow-xl shadow-black/30 transition hover:bg-white">
                  Découvrir nos services <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/devis" className="rounded-lg border border-white/50 px-7 py-4 text-sm font-bold backdrop-blur-sm transition hover:border-white hover:bg-white/10">
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Présentation de GTGC SARL" className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
            <Reveal>
              <div className="relative">
                <span className="absolute -left-2 hidden w-1.5 rounded-full bg-gradient-to-b from-gold to-gold/30 sm:block" style={{ top: "3rem", bottom: "3rem" }} aria-hidden="true" />
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-anthracite/20">
                  <Image src={settings?.heroImageUrl || fallbackHeroImage} alt="Chantier GTGC SARL" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-royal px-7 py-5 text-white shadow-xl shadow-royal/30 sm:block">
                  <p className="display text-3xl leading-none text-gold">GTGC SARL</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[.2em] text-slate-200">Grand Travaux<br />de Génie Civil</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="flex items-center gap-3 text-xs font-bold tracking-[.22em] text-gold">
                <span className="h-px w-8 bg-gold" />QUI SOMMES-NOUS ?
              </p>
              <h2 className="display mt-4 text-4xl uppercase leading-[1] text-anthracite md:text-5xl">
                L&apos;expertise au service de vos projets.
              </h2>
              <span className="mt-6 block h-1 w-16 rounded-full bg-gradient-to-r from-royal to-gold" aria-hidden="true" />
              <div className="mt-6">
                {(settings?.aboutText?.trim() || presentationFallback).split(/\r?\n\s*\r?\n/).map((paragraph, index) => (
                  <p key={index} className={`leading-8 text-slate-600 ${index > 0 ? "mt-4" : ""}`}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-8 divide-y divide-slate-100 border-y border-slate-100">
                {strengths.map((strength) => (
                  <li key={strength.label} className="flex items-center gap-4 py-3.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-royal-50 text-royal">
                      <strength.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-anthracite">{strength.label}</span>
                  </li>
                ))}
              </ul>
              <Link href="/a-propos" className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-royal px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-royal/25 transition hover:bg-royal-deep sm:w-fit sm:justify-start">
                Découvrir notre entreprise <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="bg-mist py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal><SectionHeading eyebrow="NOS DOMAINES" title="Des expertises complémentaires." text="Nous mobilisons nos compétences techniques pour accompagner vos projets de construction, d'ingénierie et d'infrastructures." /></Reveal>
            {services.length > 0 ? (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
                {services.slice(0, 5).map((service, index) => (
                  <Reveal key={service.slug} delay={index * 0.05} className={`lg:col-span-2 ${lastRowOffset(services.slice(0, 5).length, index)}`}>
                    <ServiceCard service={service} index={index} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
                {features.map(({ icon: Icon, title, text }, index) => (
                  <Reveal key={title} delay={index * 0.05} className={`lg:col-span-2 ${lastRowOffset(features.length, index)}`}>
                    <article className="card-hover h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:border-royal/40">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-royal shadow-md shadow-royal/30"><Icon className="h-5 w-5 text-white" /></span>
                      <h3 className="mt-5 text-base font-extrabold leading-snug text-anthracite">{title}</h3>
                      <span className="mt-3 block h-1 w-8 rounded-full bg-gold" aria-hidden="true" />
                      <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            )}
            <div className="mt-12 text-center">
              <Link href="/services" className="inline-flex items-center gap-2 rounded-lg border border-royal px-7 py-3.5 text-sm font-bold text-royal transition hover:bg-royal hover:text-white">
                Découvrir tous nos services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal><SectionHeading eyebrow="NOS RÉALISATIONS" title="Des projets qui prennent forme." text="Découvrez notre approche à travers les projets et les ouvrages réalisés par GTGC SARL. Chaque réalisation témoigne de notre engagement envers la qualité et la rigueur technique." /></Reveal>
              {latestProjects.length > 0 && (
                <Link href="/realisations" className="inline-flex items-center gap-2 rounded-lg border border-royal px-6 py-3 text-sm font-bold text-royal transition hover:bg-royal hover:text-white">
                  Découvrir toutes nos réalisations <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            {latestProjects.length > 0 ? (
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {latestProjects.map((project, index) => (
                  <Reveal key={project.slug} delay={index * 0.05} className={index === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
                    <ProjectCard project={project} priority={index === 0} featured={index === 0} ctaLabel="Découvrir le projet" />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-12"><EmptyState illustration ctaHref="/contact" ctaLabel="Parler de votre projet" title="Nos réalisations seront bientôt présentées ici." text="Cette rubrique accueillera prochainement une sélection de projets et d'ouvrages de GTGC SARL." /></div>
            )}
          </div>
        </section>

        <section aria-label="Pourquoi choisir GTGC SARL" className="relative isolate bg-royal-deep py-24 text-white">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.05fr_1.25fr] lg:px-8">
            <Reveal>
              <div className="relative h-[380px] overflow-hidden rounded-3xl shadow-2xl shadow-black/30 lg:h-full">
                <Image src={commitmentImage} alt="Chantier génie civil GTGC SARL" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-deep via-anthracite/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <span className="block h-1 w-10 rounded-full bg-gold" aria-hidden="true" />
                  <p className="display mt-3 text-2xl uppercase leading-none text-white">GTGC SARL</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[.2em] text-slate-300">Grand Travaux de Génie Civil — Kinshasa, RDC</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="flex items-center gap-3 text-xs font-bold tracking-[.22em] text-gold">
                <span className="h-px w-8 bg-gold" />NOTRE ENGAGEMENT
              </p>
              <h2 className="display mt-4 text-4xl uppercase leading-[1.05] text-white md:text-5xl">Pourquoi choisir GTGC SARL&nbsp;?</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
                La réussite d&apos;un projet repose sur une bonne préparation, une approche technique rigoureuse et un engagement constant envers la qualité.
              </p>
              <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
                {commitments.map(({ icon: IconCommitted, title, text }) => (
                  <li key={title} className="flex items-start gap-4 py-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold">
                      <IconCommitted className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-[.14em] text-white">{title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-slate-300">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-7 py-4 text-sm font-bold text-anthracite shadow-lg shadow-black/25 transition hover:bg-white sm:w-fit sm:justify-start">
                Parlons de votre projet <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>

        <StatsSection stats={stats} />

        <section className="bg-mist py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal><SectionHeading eyebrow="ACTUALITÉS" title="Les dernières nouvelles de GTGC" /></Reveal>
              {latestArticles.length > 0 && (
                <Link href="/actualites" className="inline-flex items-center gap-2 rounded-lg border border-royal px-6 py-3 text-sm font-bold text-royal transition hover:bg-royal hover:text-white">
                  Toutes les actualités <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            {latestArticles.length > 0 ? (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestArticles.map((article, index) => (
                  <Reveal key={article.slug} delay={index * 0.05}><ArticleCard article={article} /></Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-12"><EmptyState title="Aucune actualité publiée" text="Les annonces et nouvelles de l'entreprise apparaîtront ici une fois publiées par l'équipe GTGC." /></div>
            )}
          </div>
        </section>

        <CtaSection title="Un projet ? Construisons-le ensemble." text="Expliquez-nous votre besoin : nos ingénieurs vous accompagneront de l'étude à la réception des travaux." />
      </main>
    </SiteShell>
  );
}
