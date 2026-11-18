import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, HardHat, DraftingCompass, Route, Droplets, BadgeCheck, Compass, Handshake, Target, Layers } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { publishedProjects, publishedServices, publishedArticles } from "@/lib/public-content";
import { getSiteSettings } from "@/lib/site-settings";
import { parseKeyStats } from "@/lib/key-stats";
import { SectionHeading, EmptyState, CtaSection, StatsSection } from "@/components/public/sections";
import { ProjectCard, ServiceCard, ArticleCard } from "@/components/public/cards";
import { Reveal } from "@/components/public/reveal";
import { WorldMap } from "@/components/public/world-map";

export const instant = false;

const fallbackHeroImage = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=90";
const presentationImage = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85";

const presentationFallback = "ETCS SARL (Etudes Techniques Conceptions des Structures) est une entreprise congolaise d'ingénierie et une entreprise générale, basée à Kinshasa, 14, Avenue du Marché, commune de la Gombe.\n\nÀ l'international, une filiale établie en France, dans la région parisienne, opère comme bureau d'études de génie civil, de bâtiments et de travaux publics.\n\nETCS est porteuse et promotrice d'une synergie de compétences et d'un élan d'innovation pour fournir les solutions nécessaires pour réussir à bâtir et à rénover la République.";

const strengths = [
  { icon: Layers, label: "Tous les métiers pour une approche globale" },
  { icon: Compass, label: "Ingénieurs et techniciens supérieurs expérimentés" },
  { icon: Handshake, label: "Un engagement sur les performances et la qualité" },
];

const features = [
  { icon: DraftingCompass, title: "Études et ingénierie", text: "Études de faisabilité, avant-projets, maîtrise d'œuvre, conduite et contrôle des travaux." },
  { icon: Route, title: "Routes et autoroutes", text: "Ingénierie routière et autoroutière, voiries et réseaux divers, transports urbains." },
  { icon: Building2, title: "Ouvrages d'art", text: "Ouvrages d'art courants et complexes : viaducs, ponts haubanés, tunnels." },
  { icon: HardHat, title: "Bâtiments", text: "Construction, réhabilitation, rénovation et maintenance des bâtiments et immeubles." },
  { icon: Droplets, title: "Hydraulique et assainissement", text: "Barrages et micro-barrages, centrales hydrauliques et thermiques, stations d'épuration." },
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
  { icon: DraftingCompass, title: "Une approche sur mesure", text: "Chaque projet a ses contraintes propres : nous mettons en œuvre des procédés techniques spécifiques à chaque chantier, en parfaite adéquation avec les exigences du maître d'ouvrage." },
  { icon: BadgeCheck, title: "Qualité de service", text: "Entreprise congolaise d'abord et multinationale, ETCS accepte le risque de s'engager sur les performances et assure la qualité de son service." },
  { icon: Target, title: "Innovation continue", text: "Être toujours en avance sur l'innovation : faire plus beau, plus vite, moins coûteux, et tenir nos objectifs de qualité." },
  { icon: Handshake, title: "Harmonie des talents", text: "Nos équipes couvrent l'ensemble des enjeux techniques, économiques, juridiques et financiers, de l'étude de faisabilité à la mise en service." },
];

const commitmentImage = "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1600&q=85";
const convictionImage = "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?auto=format&fit=crop&w=1600&q=85";

export default async function Home() {
  const [projects, services, articles, settings] = await Promise.all([
    publishedProjects(),
    publishedServices(),
    publishedArticles(),
    getSiteSettings(),
  ]);
  const stats = parseKeyStats(settings?.keyStats);
  const intro = settings?.aboutText || "ETCS SARL, Etudes Techniques Conceptions des Structures, assure l'ensemble des missions que comportent les études : maîtrise d'œuvre, vérification et conduite des opérations pour la réalisation des grandes infrastructures de travaux publics et de génie civil.";
  const latestProjects = projects.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  return (
    <SiteShell>
      <main>
        <section aria-label="Introduction" className="relative isolate bg-vinci text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-0 pt-36 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pt-40">
            <div className="lg:pb-28">
              <p className="rise text-xs font-bold tracking-[.24em] text-vinci-sky">#ETCS — KINSHASA, RDC</p>
              <h1 className="rise rise-1 display mt-7 leading-[1.1] text-[clamp(1.7rem,3.8vw,3.4rem)]">
                Bâtir et rénover<br />les infrastructures<br />de la République.
              </h1>
              <p className="rise rise-2 mt-8 max-w-xl text-base leading-8 text-slate-100">{intro}</p>
              <div className="rise rise-3 mt-10 flex flex-wrap gap-4">
                <Link href="/services" className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-vinci shadow-lg shadow-vinci-navy/30 transition hover:bg-vinci-sky hover:text-vinci-navy">
                  Découvrir nos services <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/devis" className="rounded-full border-2 border-white px-7 py-3.5 text-sm font-bold backdrop-blur-sm transition hover:border-vinci-sky hover:bg-white/10 hover:text-vinci-sky">
                  Demander un devis
                </Link>
              </div>
            </div>
            <div className="rise rise-2 relative z-10 lg:translate-y-24">
              <div className="kenburns-wrap relative aspect-[3/2] overflow-hidden bg-vinci-navy shadow-2xl shadow-vinci-navy/40">
                <Image src={settings?.heroImageUrl || fallbackHeroImage} alt="Chantier ETCS" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="kenburns object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Présentation de ETCS SARL" className="bg-white py-24 lg:pt-40">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
            <Reveal variant="left">
              <div className="relative">
                <div className="kenburns-wrap relative aspect-[3/2] overflow-hidden bg-mist shadow-xl shadow-anthracite/10">
                  <Image src={presentationImage} alt="Chantier ETCS SARL" fill sizes="(max-width:1024px) 100vw, 50vw" className="kenburns object-cover" />
                </div>
                <div className="absolute -bottom-8 right-6 hidden bg-vinci-navy px-8 py-6 text-white shadow-xl sm:block">
                  <p className="display text-2xl leading-none">ETCS SARL</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[.2em] text-vinci-sky">Etudes Techniques<br />Conceptions des Structures</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <p className="text-xs font-bold tracking-[.22em] text-gold">QUI SOMMES-NOUS ?</p>
              <h2 className="display mt-4 text-4xl leading-[1.08] text-anthracite md:text-5xl">
                L&apos;expertise au service de vos projets.
              </h2>
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
            <Reveal><SectionHeading eyebrow="NOS DOMAINES" title="Des expertises complémentaires." text="Nous mobilisons l'ensemble de nos compétences pour vos projets d'ingénierie, de génie civil, de bâtiments et de travaux publics." /></Reveal>
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
                      <span className="mt-3 block" aria-hidden="true" />
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
              <Reveal><SectionHeading eyebrow="NOS RÉALISATIONS" title="Des projets qui prennent forme." text="Découvrez notre approche à travers les projets et les ouvrages réalisés par ETCS SARL. Chaque réalisation témoigne de notre engagement envers la qualité et la rigueur technique." /></Reveal>
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
              <div className="mt-12"><EmptyState illustration ctaHref="/contact" ctaLabel="Parler de votre projet" title="Nos réalisations seront bientôt présentées ici." text="Cette rubrique accueillera prochainement une sélection de projets et d'ouvrages de ETCS SARL." /></div>
            )}
          </div>
        </section>

        <section aria-label="Pourquoi choisir ETCS SARL" className="relative isolate bg-royal-deep py-24 text-white">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.05fr_1.25fr] lg:px-8">
            <Reveal variant="left">
              <div className="relative h-[380px] overflow-hidden rounded-3xl shadow-2xl shadow-black/30 lg:h-full">
                <Image src={commitmentImage} alt="Chantier génie civil ETCS SARL" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-deep via-anthracite/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <span className="block" aria-hidden="true" />
                  <p className="display mt-3 text-2xl uppercase leading-none text-white">ETCS SARL</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[.2em] text-slate-300">Etudes Techniques Conceptions des Structures — Kinshasa, RDC</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <p className="text-xs font-bold tracking-[.22em] text-gold">NOTRE ENGAGEMENT</p>
              <h2 className="display mt-4 text-4xl leading-[1.08] text-white md:text-5xl">Pourquoi choisir ETCS SARL&nbsp;?</h2>
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
              <Link href="/contact" className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-vinci px-7 py-4 text-sm font-bold text-white shadow-lg shadow-vinci/30 transition hover:bg-vinci-navy sm:w-fit sm:justify-start">
                Parlons de votre projet <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>

        <section aria-label="Notre conviction" className="relative isolate overflow-hidden bg-anthracite text-white">
          <div className="absolute inset-0">
            <Image src={convictionImage} alt="Équipes ETCS sur le chantier" fill sizes="100vw" className="kenburns object-cover opacity-55" />
            <div className="absolute inset-0 bg-anthracite/55" />
          </div>
          <div className="relative mx-auto max-w-4xl px-6 py-28 text-center lg:px-8">
            <Reveal variant="zoom">
              <div className="relative rounded-3xl border-2 border-dashed border-white/70 px-6 py-12 sm:px-14">
                <span className="display absolute -top-7 left-6 text-8xl leading-none text-white" aria-hidden="true">&ldquo;</span>
                <p className="display text-2xl leading-snug md:text-3xl">
                  ETCS est porteuse et promotrice d&apos;une synergie de compétences et d&apos;un élan d&apos;innovation
                  pour fournir les solutions nécessaires pour réussir à bâtir et à rénover la République.
                </p>
                <p className="mt-6 text-sm italic text-slate-200">— Etudes Techniques Conceptions des Structures</p>
                <span className="display absolute -bottom-9 right-6 text-8xl leading-none text-white" aria-hidden="true">&rdquo;</span>
              </div>
            </Reveal>
          </div>
        </section>

        <StatsSection stats={stats} />

        <section aria-label="Notre présence" className="bg-vinci py-24 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
            <Reveal variant="left">
              <h2 className="display text-4xl leading-[1.1] text-white md:text-5xl">Notre présence congolaise et internationale</h2>
              <p className="mt-8 max-w-md text-base leading-8 text-slate-100">
                ETCS, entreprise congolaise d&apos;abord et multinationale : le siège social est établi à Kinshasa,
                dans la commune de la Gombe, et une filiale opère en Europe, dans la région parisienne, en tant que
                bureau d&apos;études de génie civil, de bâtiments et de travaux publics.
              </p>
              <Link href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-vinci transition duration-300 hover:-translate-y-0.5 hover:bg-vinci-sky hover:text-vinci-navy">
                Nous contacter <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <div className="relative">
                <WorldMap />
                <div className="mt-6 flex flex-wrap gap-6 text-xs font-bold text-vinci-sky">
                  <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-white ring-2 ring-vinci-sky" />Kinshasa, RDC — Siège social</span>
                  <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-white ring-2 ring-vinci-sky" />Paris, France — Bureau d&apos;études</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-mist py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal><SectionHeading eyebrow="ACTUALITÉS" title="Les dernières nouvelles de ETCS" /></Reveal>
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
              <div className="mt-12"><EmptyState title="Aucune actualité publiée" text="Les annonces et nouvelles de l'entreprise apparaîtront ici une fois publiées par l'équipe ETCS." /></div>
            )}
          </div>
        </section>

        <CtaSection title="Un projet ? Construisons-le ensemble." text="Expliquez-nous votre besoin : nos ingénieurs vous accompagneront de l'étude de faisabilité à la mise en service de l'ouvrage." />
      </main>
    </SiteShell>
  );
}
