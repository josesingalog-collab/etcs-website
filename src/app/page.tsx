import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, HardHat, DraftingCompass, Route, Droplets, BadgeCheck, Compass, Handshake, Target, Layers } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { publishedProjects, publishedServices, publishedArticles } from "@/lib/public-content";
import { getSiteSettings } from "@/lib/site-settings";
import { getPageContent, stringList } from "@/lib/page-content";
import { parseKeyStats } from "@/lib/key-stats";
import { SectionHeading, EmptyState, CtaSection, StatsSection } from "@/components/public/sections";
import { ProjectCard, ServiceCard, ArticleCard } from "@/components/public/cards";
import { Reveal } from "@/components/public/reveal";
import { WorldMap } from "@/components/public/world-map";

export const instant = false;

const featureIcons = [DraftingCompass, Route, Building2, HardHat, Droplets];
const strengthIcons = [Layers, Compass, Handshake];
const commitmentIcons = [DraftingCompass, BadgeCheck, Target, Handshake];

function lastRowOffset(count: number, index: number) {
  const lastRowStart = Math.floor((count - 1) / 3) * 3;
  if (count <= 3 || index < lastRowStart) return "";
  const inLastRow = count - lastRowStart;
  if (inLastRow === 2 && index === lastRowStart) return "lg:col-start-2";
  if (inLastRow === 1) return "lg:col-start-3";
  return "";
}

export default async function Home() {
  const [projects, services, articles, settings, home] = await Promise.all([
    publishedProjects(),
    publishedServices(),
    publishedArticles(),
    getSiteSettings(),
    getPageContent("home"),
  ]);
  const stats = parseKeyStats(settings?.keyStats);
  const intro = settings?.aboutText || home.introText;
  const latestProjects = projects.slice(0, 3);
  const latestArticles = articles.slice(0, 3);
  const heroLines = home.heroTitle.split(/\r?\n/);

  return (
    <SiteShell>
      <main>
        <section aria-label="Introduction" className="relative isolate bg-vinci text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-0 pt-36 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pt-40">
            <div className="lg:pb-28">
              <p className="rise text-xs font-bold tracking-[.24em] text-vinci-sky">#E.T.C.S Sarl — KINSHASA, RDC</p>
              <h1 className="rise rise-1 display mt-7 leading-[1.1] text-[clamp(1.7rem,3.8vw,3.4rem)]">
                {heroLines.map((line, index) => (
                  <span key={index}>{index > 0 && <br />}{line}</span>
                ))}
              </h1>
              <p className="rise rise-2 mt-8 max-w-xl text-justify text-base leading-8 text-slate-100">{intro}</p>
              <div className="rise rise-3 mt-10 flex flex-wrap gap-4">
                <Link href="/services" className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-vinci shadow-lg shadow-vinci-navy/30 transition hover:bg-vinci-sky hover:text-vinci-navy">
                  Découvrir nos services <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/devis" className="rounded-full border-2 border-white px-7 py-3.5 text-sm font-bold backdrop-blur-sm transition hover:border-vinci-sky hover:bg-white/10 hover:text-vinci-sky">
                  Demander un devis
                </Link>
              </div>
            </div>
            <div className="rise rise-2 relative z-10 lg:self-center">
              <div className="kenburns-wrap relative aspect-[3/2] overflow-hidden bg-vinci-navy shadow-2xl shadow-vinci-navy/40">
                <Image src={settings?.heroImageUrl || home.heroImage} alt="Chantier E.T.C.S Sarl" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="kenburns object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Présentation de E.T.C.S Sarl" className="bg-white py-24 lg:pt-40">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
            <Reveal variant="left">
              <div className="relative">
                <div className="kenburns-wrap relative aspect-[3/2] overflow-hidden bg-mist shadow-xl shadow-anthracite/10">
                  <Image src={home.presentationImage} alt="Chantier E.T.C.S Sarl" fill sizes="(max-width:1024px) 100vw, 50vw" className="kenburns object-cover" />
                </div>
                <div className="absolute -bottom-8 right-6 hidden bg-vinci-navy px-8 py-6 text-white shadow-xl sm:block">
                  <p className="display text-2xl leading-none">E.T.C.S Sarl</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[.2em] text-vinci-sky">Etudes Techniques<br />Conceptions des Structures</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <p className="text-xs font-bold tracking-[.22em] text-gold">QUI SOMMES-NOUS ?</p>
              <h2 className="display mt-4 text-4xl leading-[1.08] text-anthracite md:text-5xl">
                {home.presentationTitle}
              </h2>
              <div className="mt-6">
                {intro.split(/\r?\n\s*\r?\n/).map((paragraph, index) => (
                  <p key={index} className={`text-justify leading-8 text-slate-600 ${index > 0 ? "mt-4" : ""}`}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-8 divide-y divide-slate-100 border-y border-slate-100">
                {stringList(home.strengths).map((label, index) => {
                  const Icon = strengthIcons[index % strengthIcons.length];
                  return (
                    <li key={label} className="flex items-center gap-4 py-3.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-royal-50 text-royal">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-semibold text-anthracite">{label}</span>
                    </li>
                  );
                })}
              </ul>
              <Link href="/a-propos" className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-royal px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-royal/25 transition hover:bg-royal-deep sm:w-fit sm:justify-start">
                Découvrir notre entreprise <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="bg-mist py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal><SectionHeading eyebrow={home.domainsEyebrow} title={home.domainsTitle} text={home.domainsText} /></Reveal>
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
                {home.features.map((feature, index) => {
                  const Icon = featureIcons[index % featureIcons.length];
                  return (
                    <Reveal key={feature.title} delay={index * 0.05} className={`lg:col-span-2 ${lastRowOffset(home.features.length, index)}`}>
                      <article className="card-hover h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:border-royal/40">
                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-royal shadow-md shadow-royal/30"><Icon className="h-5 w-5 text-white" /></span>
                        <h3 className="mt-5 text-base font-extrabold leading-snug text-anthracite">{feature.title}</h3>
                        <span className="mt-3 block" aria-hidden="true" />
                        <p className="mt-3 text-sm leading-6 text-slate-500">{feature.text}</p>
                      </article>
                    </Reveal>
                  );
                })}
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
              <Reveal><SectionHeading eyebrow={home.projectsEyebrow} title={home.projectsTitle} text={home.projectsText} /></Reveal>
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
              <div className="mt-12"><EmptyState illustration ctaHref="/contact" ctaLabel="Parler de votre projet" title="Nos réalisations seront bientôt présentées ici." text="Cette rubrique accueillera prochainement une sélection de projets et d'ouvrages de E.T.C.S Sarl." /></div>
            )}
          </div>
        </section>

        <section aria-label="Pourquoi choisir E.T.C.S Sarl" className="relative isolate bg-royal-deep py-24 text-white">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.05fr_1.25fr] lg:px-8">
            <Reveal variant="left">
              <div className="relative h-[380px] overflow-hidden rounded-3xl shadow-2xl shadow-black/30 lg:h-full">
                <Image src={home.engagementImage} alt="Chantier génie civil E.T.C.S Sarl" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-deep via-anthracite/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <span className="block" aria-hidden="true" />
                  <p className="display mt-3 text-2xl uppercase leading-none text-white">E.T.C.S Sarl</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[.2em] text-slate-300">Etudes Techniques Conceptions des Structures — Kinshasa, RDC</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <p className="text-xs font-bold tracking-[.22em] text-gold">NOTRE ENGAGEMENT</p>
              <h2 className="display mt-4 text-4xl leading-[1.08] text-white md:text-5xl">{home.engagementTitle}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
                {home.engagementText}
              </p>
              <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
                {home.commitments.map((commitment, index) => {
                  const Icon = commitmentIcons[index % commitmentIcons.length];
                  return (
                    <li key={commitment.title} className="flex items-start gap-4 py-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-sm font-extrabold uppercase tracking-[.14em] text-white">{commitment.title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-slate-300">{commitment.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <Link href="/contact" className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-vinci px-7 py-4 text-sm font-bold text-white shadow-lg shadow-vinci/30 transition hover:bg-vinci-navy sm:w-fit sm:justify-start">
                Parlons de votre projet <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>

        <section aria-label="Notre conviction" className="relative isolate overflow-hidden bg-anthracite text-white">
          <div className="absolute inset-0">
            <Image src={home.convictionImage} alt="Équipes E.T.C.S Sarl sur le chantier" fill sizes="100vw" className="kenburns object-cover opacity-55" />
            <div className="absolute inset-0 bg-anthracite/55" />
          </div>
          <div className="relative mx-auto max-w-4xl px-6 py-28 text-center lg:px-8">
            <Reveal variant="zoom">
              <div className="relative rounded-3xl border-2 border-dashed border-white/70 px-6 py-12 sm:px-14">
                <span className="display absolute -top-7 left-6 text-8xl leading-none text-white" aria-hidden="true">&ldquo;</span>
                <p className="display text-2xl leading-snug md:text-3xl">
                  {home.quote}
                </p>
                <p className="mt-6 text-sm italic text-slate-200">— {home.quoteAuthor}</p>
                <span className="display absolute -bottom-9 right-6 text-8xl leading-none text-white" aria-hidden="true">&rdquo;</span>
              </div>
            </Reveal>
          </div>
        </section>

        <StatsSection stats={stats} />

        <section aria-label="Notre présence" className="bg-vinci py-24 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
            <Reveal variant="left">
              <h2 className="display text-4xl leading-[1.1] text-white md:text-5xl">{home.presenceTitle}</h2>
              <p className="mt-8 max-w-md text-base leading-8 text-slate-100">
                {home.presenceText}
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
              <Reveal><SectionHeading eyebrow="ACTUALITÉS" title={home.newsTitle} /></Reveal>
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
              <div className="mt-12"><EmptyState title="Aucune actualité publiée" text="Les annonces et nouvelles de l'entreprise apparaîtront ici une fois publiées par l'équipe E.T.C.S Sarl." /></div>
            )}
          </div>
        </section>

        <CtaSection title={home.ctaTitle} text={home.ctaText} />
      </main>
    </SiteShell>
  );
}
