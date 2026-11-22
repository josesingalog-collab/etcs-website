import Link from "next/link";
import Image from "next/image";
import { ArrowRight, DraftingCompass, BadgeCheck, Compass, Handshake, Target, Layers, TrainTrack, Building2, Zap, Sprout, Globe2, Quote } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { publishedProjects, publishedArticles } from "@/lib/public-content";
import { getSiteSettings } from "@/lib/site-settings";
import { getPageContent, stringList } from "@/lib/page-content";
import { parseKeyStats, type KeyStat } from "@/lib/key-stats";
import { ProjectCard, ArticleCard } from "@/components/public/cards";
import { Reveal } from "@/components/public/reveal";
import { ProcessTimeline, ValuesChips } from "@/components/public/process-values";
import { WorldMap } from "@/components/public/world-map";
import { CompanyBold } from "@/components/company-bold";
import { IMAGES } from "@/lib/images";
import { PlanSection } from "@/components/plan/plan-section";
import { DimensionLine } from "@/components/plan/dimension-line";
import { HatchedCta, CornerMarks, Hatching } from "@/components/plan/plan-graphics";

export const instant = false;

const competenceIcons = [TrainTrack, Building2, Zap, Sprout, Globe2];
const strengthIcons = [Layers, Compass, Handshake];
const commitmentIcons = [DraftingCompass, BadgeCheck, Target, Handshake];

const phaseIcons = [DraftingCompass, Handshake, Building2];

const statsPlaceholders: KeyStat[] = [
  { label: "[À COMPLÉTER — ex. années d'expérience]", value: "00" },
  { label: "[À COMPLÉTER — ex. projets réalisés]", value: "00" },
  { label: "[À COMPLÉTER — ex. ingénieurs et techniciens]", value: "00" },
  { label: "[À COMPLÉTER — ex. pays d'intervention]", value: "00" },
];

function FlagRDC() {
  return (
    <svg viewBox="0 0 24 16" className="h-3.5 w-5 shrink-0 rounded-[2px] shadow-sm" aria-label="Drapeau de la RDC" role="img">
      <rect width="24" height="16" fill="#007FFF" />
      <path d="M0 16 L24 0 L24 5.5 L7.5 16 Z" fill="#F7D618" />
      <path d="M2.5 16 L24 2.5 L24 5.5 L7.5 16 Z" fill="#CE1021" />
      <path d="M4 1.2 L4.7 3.2 L6.8 3.2 L5.1 4.5 L5.7 6.5 L4 5.2 L2.3 6.5 L2.9 4.5 L1.2 3.2 L3.3 3.2 Z" fill="#F7D618" />
    </svg>
  );
}

function FlagFrance() {
  return (
    <svg viewBox="0 0 24 16" className="h-3.5 w-5 shrink-0 rounded-[2px] shadow-sm" aria-label="Drapeau de la France" role="img">
      <rect width="8" height="16" fill="#0055A4" />
      <rect x="8" width="8" height="16" fill="#FFFFFF" />
      <rect x="16" width="8" height="16" fill="#EF4135" />
    </svg>
  );
}

export default async function Home() {
  const [projects, articles, settings, home, about] = await Promise.all([
    publishedProjects(),
    publishedArticles(),
    getSiteSettings(),
    getPageContent("home"),
    getPageContent("about"),
  ]);
  const stats = parseKeyStats(settings?.keyStats);
  const statList = stats.length > 0 ? stats : statsPlaceholders;
  const intro = settings?.aboutText || home.introText;
  const latestProjects = projects.slice(0, 3);
  const latestArticles = articles.slice(0, 3);
  const heroLines = home.heroTitle.split(/\r?\n/);
  const testimonial = home.testimonial;

  return (
    <SiteShell>
      <main>
        {/* 1. HERO */}
        <section aria-label="Introduction" className="relative isolate overflow-hidden text-white" style={{ backgroundColor: "var(--plan-paper-dark)" }}>
          <Hatching className="pointer-events-none absolute inset-0 h-full w-full text-white" opacity={0.05} />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-32 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:pt-40">
            <div>
              <p className="rise annotation text-[11px]" style={{ color: "var(--plan-sky)" }}>{home.heroEyebrow}</p>
              <h1 className="rise rise-1 display mt-6 leading-[1.05] text-[clamp(2rem,4.2vw,3.6rem)]">
                {heroLines.map((line, index) => (
                  <span key={index}>{index > 0 && <br />}{line}</span>
                ))}
              </h1>
              <p className="rise rise-2 mt-6 max-w-xl text-sm leading-7 text-slate-300">
                <CompanyBold text={home.heroHook} />
              </p>
              <div className="rise rise-3 mt-9 flex flex-wrap gap-4">
                <Link href="/services" className="focus-ring inline-flex items-center gap-2 bg-[var(--plan-accent)] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#1a5fd6]">
                  Découvrir nos services <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/devis" className="focus-ring inline-flex items-center gap-2 border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-[var(--plan-navy)]">
                  Demander une estimation et des quantitatifs
                </Link>
              </div>
            </div>
            <div className="rise rise-2 relative z-10 lg:self-center">
              <CornerMarks className="p-3">
                <div className="relative aspect-[3/2] w-full overflow-hidden shadow-2xl">
                  <Image src={settings?.heroImageUrl || home.heroImage} alt={IMAGES.hero.alt} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                </div>
              </CornerMarks>
            </div>
          </div>
        </section>

        {/* 2. CHIFFRES CLÉS EN COTES */}
        <PlanSection code="RELEVÉ 01" label="CHIFFRES CLÉS" variant="paper">
          <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {statList.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.06}>
                <div className="flex h-full flex-col justify-between border border-slate-200/80 bg-white p-5" style={{ borderColor: "var(--plan-line)" }}>
                  <p className="display text-4xl leading-none" style={{ color: "var(--plan-navy)" }}>{stat.value}</p>
                  <div className="mt-5">
                    <DimensionLine label={stat.label} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </PlanSection>

        {/* 3. QUI SOMMES-NOUS */}
        <PlanSection code="AXE A" label="QUI SOMMES-NOUS" variant="none">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="left">
              <CornerMarks className="p-3">
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-mist">
                  <Image src={home.presentationImage} alt={IMAGES.presentation.alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                </div>
              </CornerMarks>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <SectionHeadingWrapper title="L'expertise au service de vos projets." />
              <div className="mt-6 text-justify text-sm leading-8 text-slate-600">
                <CompanyBold text={intro} />
              </div>
              <ul className="mt-8 divide-y divide-slate-100 border-y border-slate-100">
                {stringList(home.strengths).map((label, index) => {
                  const Icon = strengthIcons[index % strengthIcons.length];
                  return (
                    <li key={label} className="flex items-center gap-4 py-3.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: "var(--plan-accent)" }}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-anthracite">{label}</span>
                    </li>
                  );
                })}
              </ul>
              <Link href="/a-propos" className="focus-ring mt-9 inline-flex w-full items-center justify-center gap-2 bg-[var(--plan-accent)] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#1a5fd6] sm:w-fit sm:justify-start">
                Découvrir notre entreprise <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </PlanSection>

        {/* 4. NOS DOMAINES — 5 cartes repérées */}
        <PlanSection code="COUPE B-B" label="NOS DOMAINES">
          <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {about.competences.map((item, index) => {
              const Icon = competenceIcons[index % competenceIcons.length];
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="card-hover group relative h-full border border-slate-200/90 bg-white p-6" style={{ borderColor: "var(--plan-line)" }}>
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-full text-white" style={{ backgroundColor: "var(--plan-accent)" }}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="annotation text-xs" style={{ color: "var(--plan-structure)" }}>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-5 text-base font-extrabold leading-snug text-anthracite">{item.title}</h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-500">{item.text}</p>
                    <Link href="/services" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-royal transition group-hover:gap-3" style={{ color: "var(--plan-accent)" }}>
                      Voir le détail <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="focus-ring inline-flex items-center gap-2 border border-[var(--plan-accent)] px-7 py-3.5 text-sm font-bold text-royal transition hover:bg-[var(--plan-accent)] hover:text-white" style={{ color: "var(--plan-accent)" }}>
              Découvrir nos services et prestations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </PlanSection>

        {/* 5. ACCOMPAGNEMENT — frise de phases reliées par une ligne de cote */}
        <PlanSection code="AXE C" label="ACCOMPAGNEMENT" variant="blue">
          <SectionHeadingLight title="Un accompagnement à chaque étape du projet." />
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{about.processusIntro}</p>
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-5 hidden border-t lg:block" style={{ borderColor: "rgba(140,193,240,.4)" }} aria-hidden="true" />
            <div className="grid gap-10 sm:grid-cols-3">
              {home.phases.map((phase, index) => {
                const Icon = phaseIcons[index % phaseIcons.length];
                return (
                  <Reveal key={phase.title} delay={index * 0.08} className="flex flex-col items-center text-center">
                    <span className="relative grid h-10 w-10 place-items-center rounded-full bg-[var(--plan-accent)] text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-sm font-black uppercase tracking-wide text-white">{phase.title}</p>
                    <p className="mt-2 max-w-xs text-xs leading-6 text-slate-300">{phase.text}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </PlanSection>

        {/* 6. VALEURS */}
        <ValuesChips eyebrow="DÉTAIL 03 — NOS VALEURS" title="Nos engagements au quotidien" values={about.valeurs.slice(0, 3)} />

        {/* Témoignage client — masqué tant qu'aucun témoignage n'est saisi */}
        {testimonial.quote && (
          <PlanSection code="ANNEXE" label="TÉMOIGNAGE" variant="none">
            <figure className="mx-auto max-w-3xl border border-slate-200/90 bg-white p-8" style={{ borderColor: "var(--plan-line)" }}>
              <Quote className="h-6 w-6" style={{ color: "var(--plan-accent)" }} aria-hidden="true" />
              <blockquote className="mt-4 text-justify text-sm leading-8 text-slate-600">{testimonial.quote}</blockquote>
              <figcaption className="annotation mt-5 text-[10px]" style={{ color: "var(--plan-navy)" }}>
                {testimonial.author}{testimonial.role ? ` — ${testimonial.role}` : ""}
              </figcaption>
            </figure>
          </PlanSection>
        )}

        {/* 7. POURQUOI NOUS CHOISIR */}
        <PlanSection code="AXE D" label="POURQUOI NOUS CHOISIR" variant="none">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_1.25fr]">
            <Reveal variant="left">
              <CornerMarks className="p-3">
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image src={home.engagementImage} alt={IMAGES.engagement.alt} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
                </div>
              </CornerMarks>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <SectionHeadingLight title={home.engagementTitle} />
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
                <CompanyBold text={home.engagementText} />
              </p>
              <ul className="mt-10 divide-y border-y" style={{ borderColor: "var(--plan-line)" }}>
                {home.commitments.map((commitment, index) => {
                  const Icon = commitmentIcons[index % commitmentIcons.length];
                  return (
                    <li key={commitment.title} className="flex items-start gap-4 py-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: "var(--plan-accent)" }}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-sm font-extrabold uppercase tracking-[.14em] text-white">{commitment.title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-slate-300">{commitment.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <Link href="/contact" className="focus-ring mt-10 inline-flex w-full items-center justify-center gap-2 bg-[var(--plan-accent)] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1a5fd6] sm:w-fit sm:justify-start">
                Parlons de votre projet <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </PlanSection>

        {/* 8. PRÉSENCE KINSHASA — MONTROUGE */}
        <PlanSection code="AXE E" label="NOTRE PRÉSENCE">
          <SectionHeadingDark title={home.presenceTitle} />
          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
            <CompanyBold text={home.presenceText} />
          </p>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.5fr]">
            <div className="grid gap-4">
              <PresenceBlock flag={<FlagRDC />} title="Kinshasa, RD Congo" role="Siège social — Entreprise des travaux" coords="4°19'18&quot;S — 15°18'45&quot;E" />
              <PresenceBlock flag={<FlagFrance />} title="Montrouge, France" role="Bureau d'études — Construction, génie civil, travaux publics" coords="48°49'07&quot;N — 2°19'10&quot;E" />
              <Link href="/contact" className="focus-ring mt-2 inline-flex w-fit items-center gap-2 bg-[var(--plan-accent)] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#1a5fd6]">
                Nous contacter <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <Reveal delay={0.1} variant="right">
              <WorldMap />
            </Reveal>
          </div>
        </PlanSection>

        {latestProjects.length > 0 && (
          <PlanSection code="ANNEXE 01" label="RÉALISATIONS" variant="none">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionHeadingDark title={home.projectsTitle} />
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{home.projectsText}</p>
              </div>
              <Link href="/realisations" className="focus-ring inline-flex items-center gap-2 border border-[var(--plan-accent)] px-6 py-3 text-sm font-bold transition hover:bg-[var(--plan-accent)] hover:text-white" style={{ color: "var(--plan-accent)" }}>
                Toutes nos réalisations <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {latestProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.05} className={index === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
                  <ProjectCard project={project} priority={index === 0} featured={index === 0} ctaLabel="Découvrir le projet" />
                </Reveal>
              ))}
            </div>
          </PlanSection>
        )}

        {latestArticles.length > 0 && (
          <PlanSection code="ANNEXE 02" label="ACTUALITÉS" variant="none">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionHeadingDark title={home.newsTitle} />
              </div>
              <Link href="/actualites" className="focus-ring inline-flex items-center gap-2 border border-[var(--plan-accent)] px-6 py-3 text-sm font-bold transition hover:bg-[var(--plan-accent)] hover:text-white" style={{ color: "var(--plan-accent)" }}>
                Toutes les actualités <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article, index) => (
                <Reveal key={article.slug} delay={index * 0.05}><ArticleCard article={article} /></Reveal>
              ))}
            </div>
          </PlanSection>
        )}

        {/* 9. CTA FINAL AVEC FOND HACHURÉ */}
        <HatchedCta title={home.ctaTitle} text={home.ctaText} ctaLabel="Demander une estimation et des quantitatifs" ctaHref="/devis" />
      </main>
    </SiteShell>
  );
}

function SectionHeadingLight({ title }: { title: string }) {
  return <h2 className="display text-3xl leading-[1.12] text-white md:text-4xl">{title}</h2>;
}

function SectionHeadingDark({ title }: { title: string }) {
  return <h2 className="display text-3xl leading-[1.12] text-anthracite md:text-4xl">{title}</h2>;
}

function SectionHeadingWrapper({ title }: { title: string }) {
  return <h2 className="display text-3xl leading-[1.12] text-anthracite md:text-4xl">{title}</h2>;
}

function PresenceBlock({ flag, title, role, coords }: { flag: React.ReactNode; title: string; role: string; coords: string }) {
  return (
    <div className="border bg-white p-5" style={{ borderColor: "var(--plan-line)" }}>
      <div className="flex items-center gap-3">
        {flag}
        <p className="text-sm font-extrabold text-anthracite">{title}</p>
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-600">{role}</p>
      <p className="annotation mt-2 text-[9px]" style={{ color: "var(--plan-accent)" }}>{coords}</p>
    </div>
  );
}
