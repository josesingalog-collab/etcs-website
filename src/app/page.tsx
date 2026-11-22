import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrainTrack, Building2, Zap, Sprout, Globe2, Quote, Phone, Clock, MapPin, Mail } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { publishedProjects, publishedArticles } from "@/lib/public-content";
import { getPhoneList, getSiteSettings, splitPhone } from "@/lib/site-settings";
import { getPageContent } from "@/lib/page-content";
import { parseKeyStats, type KeyStat } from "@/lib/key-stats";
import { ProjectCard, ArticleCard } from "@/components/public/cards";
import { Reveal } from "@/components/public/reveal";
import { ProcessTimeline, ValuesChips } from "@/components/public/process-values";
import { FaqAccordion } from "@/components/public/faq-accordion";
import { MarqueeRibbon } from "@/components/public/marquee-ribbon";
import { WorldMap } from "@/components/public/world-map";
import { CompanyBold } from "@/components/company-bold";
import { IMAGES } from "@/lib/images";
import { PlanSection } from "@/components/plan/plan-section";
import { HatchedCta, CornerMarks, Hatching } from "@/components/plan/plan-graphics";

export const instant = false;

const competenceIcons = [TrainTrack, Building2, Zap, Sprout, Globe2];

const statsPlaceholders: KeyStat[] = [
  { label: "[À COMPLÉTER — ex. projets réalisés]", value: "00" },
  { label: "[À COMPLÉTER — ex. projets en construction]", value: "00" },
  { label: "[À COMPLÉTER — ex. ingénieurs et techniciens]", value: "00" },
  { label: "[À COMPLÉTER — ex. m² développés]", value: "00" },
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
  const phones = getPhoneList(settings);
  const stats = parseKeyStats(settings?.keyStats);
  const statList = stats.length > 0 ? stats : statsPlaceholders;
  const intro = settings?.aboutText || home.introText;
  const latestProjects = projects.slice(0, 4);
  const latestArticles = articles.slice(0, 3);
  const heroLines = home.heroTitle.split(/\r?\n/);
  const testimonial = home.testimonial;

  return (
    <SiteShell>
      <main>
        {/* 1. HERO — photo plein écran avec voile sombre, badge de confiance */}
        <section aria-label="Introduction" className="relative isolate flex min-h-[640px] items-center overflow-hidden">
          <Image src={settings?.heroImageUrl || home.heroImage} alt={IMAGES.hero.alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(10,22,56,.92) 0%, rgba(10,22,56,.75) 45%, rgba(10,22,56,.35) 100%)" }} />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 py-32 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:px-10">
            <div>
              <p className="rise annotation text-[11px]" style={{ color: "var(--plan-sky)" }}>{home.heroEyebrow}</p>
              <h1 className="rise rise-1 display mt-6 leading-[1.02] text-[clamp(2.2rem,5vw,4.2rem)] text-white">
                {heroLines.map((line, index) => (
                  <span key={index}>{index > 0 && <br />}{line}</span>
                ))}
              </h1>
              <p className="rise rise-2 mt-6 max-w-xl text-sm leading-7 text-slate-200">
                <CompanyBold text={home.heroHook} />
              </p>
              <div className="rise rise-3 mt-9 flex flex-wrap gap-4">
                <Link href="/services" className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--plan-accent)] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-black/25 transition hover:scale-[1.02] hover:bg-[#1a5fd6]">
                  Découvrir nos services <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/devis" className="focus-ring inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--plan-navy)]">
                  Demander une estimation et des quantitatifs
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <Reveal delay={0.2}>
                <div className="ml-auto w-fit rounded-3xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md">
                  <p className="annotation text-[9px] text-slate-200">E.T.C.S SARL</p>
                  <p className="mt-2 text-sm font-bold leading-6">Bureau d&apos;études<br />&amp; entreprise générale</p>
                  <div className="mt-4 grid gap-2 text-xs text-slate-200">
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" style={{ color: "var(--plan-sky)" }} />Kinshasa, RDC</span>
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" style={{ color: "var(--plan-sky)" }} />Montrouge, France</span>
                  </div>
                  <Link href="/a-propos" className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[var(--plan-navy)] transition hover:bg-[var(--plan-sky)]">
                    En savoir plus <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 2. QUI SOMMES-NOUS — collage, mission/vision, chiffres en pastilles */}
        <section className="py-24" style={{ backgroundColor: "var(--plan-paper)" }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
              <Reveal variant="left">
                <div className="grid gap-4 sm:grid-cols-2">
                  <CornerMarks className="sm:col-span-2 p-2">
                    <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl bg-mist">
                      <Image src={home.presentationImage} alt={IMAGES.presentation.alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                  </CornerMarks>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-mist">
                    <Image src={IMAGES.etudes.src} alt={IMAGES.etudes.alt} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-mist">
                    <Image src={IMAGES.transport.src} alt={IMAGES.transport.alt} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1} variant="right">
                <p className="annotation text-[10px]" style={{ color: "var(--plan-accent)" }}>AXE A — QUI SOMMES-NOUS</p>
                <h2 className="display mt-4 text-3xl leading-[1.1] text-anthracite md:text-4xl">{home.presentationTitle}</h2>
                <div className="mt-6 grid gap-3">
                  {about.pillars.slice(0, 2).map((pillar) => (
                    <div key={pillar.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                      <p className="text-sm font-extrabold" style={{ color: "var(--plan-accent)" }}>{pillar.title}</p>
                      <p className="mt-1.5 text-xs leading-6 text-slate-600">{pillar.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="display text-3xl leading-none" style={{ color: "var(--plan-navy)" }}>2</p>
                    <p className="annotation mt-2 text-[8px] text-slate-500">BUREAUX — KINSHASA &amp; MONTROUGE</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="display text-3xl leading-none" style={{ color: "var(--plan-navy)" }}>5</p>
                    <p className="annotation mt-2 text-[8px] text-slate-500">DOMAINES D&apos;EXPERTISE</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <p className="mx-auto mt-14 max-w-4xl text-center text-sm leading-8 text-slate-600">
              <CompanyBold text={intro} />
            </p>
          </div>
        </section>

        {/* 3. PANNEAU SOMBRE — nos services listés */}
        <section className="px-4 py-10 sm:px-6 lg:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] text-white" style={{ backgroundColor: "#101a33" }}>
            <Hatching className="pointer-events-none absolute inset-0 h-full w-full text-white" opacity={0.05} />
            <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <p className="annotation text-[10px]" style={{ color: "var(--plan-sky)" }}>COUPE B-B — NOS DOMAINES</p>
                <h2 className="display mt-4 text-3xl leading-[1.1] md:text-4xl">Nos services à nos clients</h2>
                <div className="mt-8 grid gap-2">
                  {about.competences.map((item, index) => {
                    const Icon = competenceIcons[index % competenceIcons.length];
                    const active = index === 2;
                    return (
                      <Link key={item.title} href="/services" className="group flex items-center justify-between gap-4 rounded-2xl px-5 py-4 transition" style={{ backgroundColor: active ? "var(--plan-accent)" : "rgba(255,255,255,.06)" }}>
                        <span className="flex items-center gap-4">
                          <Icon className="h-5 w-5 shrink-0" style={{ color: active ? "#fff" : "var(--plan-sky)" }} aria-hidden="true" />
                          <span className="text-sm font-bold">{item.title}</span>
                        </span>
                        <ArrowRight className={`h-4 w-4 transition group-hover:translate-x-1 ${active ? "" : "text-slate-400"}`} aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
                  <Image src={IMAGES.batiments.src} alt={IMAGES.batiments.alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                  <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                    <p className="text-sm font-extrabold text-white">Bâtiments complexes et IGH</p>
                    <p className="mt-1 text-xs leading-5 text-slate-200">Conception et réalisation de bâtiments complexes et de grande hauteur.</p>
                    <Link href="/services" className="focus-ring mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[var(--plan-navy)] transition hover:bg-[var(--plan-sky)]">
                      Voir le détail <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RUBAN DÉFILANT */}
        <MarqueeRibbon items={["Génie civil", "Bâtiments", "Travaux publics", "Ouvrages d'art", "Bureau d'études", "Infrastructures"]} />

        {/* 4. RÉALISATIONS — grandes cartes projets (masqué si vide) */}
        {latestProjects.length > 0 && (
          <section className="py-24" style={{ backgroundColor: "var(--plan-paper)" }}>
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="annotation text-[10px]" style={{ color: "var(--plan-accent)" }}>ANNEXE 01 — RÉALISATIONS</p>
                  <h2 className="display mt-3 text-3xl leading-[1.1] text-anthracite md:text-4xl">{home.projectsTitle}</h2>
                </div>
                <Link href="/realisations" className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--plan-accent)] px-6 py-3 text-sm font-bold transition hover:bg-[var(--plan-accent)] hover:text-white" style={{ color: "var(--plan-accent)" }}>
                  Toutes nos réalisations <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {latestProjects.map((project, index) => (
                  <Reveal key={project.slug} delay={index * 0.05} className={index === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
                    <ProjectCard project={project} priority={index === 0} featured={index === 0} ctaLabel="Découvrir le projet" />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. CHIFFRES CLÉS — lignes verticales façon référence */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {statList.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.06} className="text-center">
                  <div className="mx-auto h-16 w-px" style={{ backgroundColor: "var(--plan-line)" }} aria-hidden="true" />
                  <p className="display mt-4 text-4xl leading-none md:text-5xl" style={{ color: "var(--plan-navy)" }}>{stat.value}</p>
                  <p className="annotation mx-auto mt-3 max-w-[12rem] text-[9px] text-slate-500">{stat.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="py-24" style={{ backgroundColor: "var(--plan-paper)" }}>
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr] lg:px-10">
            <Reveal variant="left">
              <p className="annotation text-[10px]" style={{ color: "var(--plan-accent)" }}>AXE F — QUESTIONS FRÉQUENTES</p>
              <h2 className="display mt-4 text-3xl leading-[1.1] text-anthracite md:text-4xl">Questions posées régulièrement par nos clients</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">Une question sur vos projets, nos expertises ou nos procédures ? La réponse est souvent ici — sinon, contactez-nous directement.</p>
              <Link href="/contact" className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--plan-accent)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1a5fd6]">
                Poser une question <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <FaqAccordion items={home.faq} />
            </Reveal>
          </div>
        </section>

        {/* 7. LOGOS PARTENAIRES */}
        <section className="border-y border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="annotation mb-6 text-center text-[9px] text-slate-400">PARTENAIRES &amp; COLLABORATIONS</p>
            <div className="marquee" role="list" aria-label="Partenaires">
              <div className="marquee-track">
                {[...about.partners, ...about.partners].map((partner, index) => (
                  <span key={`${partner}-${index}`} role="listitem" className="display flex items-center gap-10 pr-10 text-lg tracking-[.14em] text-slate-400">
                    {partner}
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: "var(--plan-accent)" }} aria-hidden="true" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. ACCOMPAGNEMENT + VALEURS */}
        <ProcessTimeline eyebrow="AXE C — NOS EXPERTISES" title={about.processusTitle} intro={about.processusIntro} steps={about.processusSteps} />
        <ValuesChips eyebrow="DÉTAIL 03 — NOS VALEURS" title="Nos engagements au quotidien" values={about.valeurs.slice(0, 3)} />

        {/* Témoignage — masqué tant qu'aucun témoignage n'est saisi */}
        {testimonial.quote && (
          <section className="bg-white py-24">
            <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
              <Quote className="mx-auto h-8 w-8" style={{ color: "var(--plan-accent)" }} aria-hidden="true" />
              <blockquote className="mt-6 text-justify text-base leading-8 text-slate-600">{testimonial.quote}</blockquote>
              <p className="annotation mt-6 text-[10px]" style={{ color: "var(--plan-navy)" }}>
                {testimonial.author}{testimonial.role ? ` — ${testimonial.role}` : ""}
              </p>
            </div>
          </section>
        )}

        {/* 9. PRÉSENCE KINSHASA — MONTROUGE */}
        <PlanSection code="AXE E" label="NOTRE PRÉSENCE">
          <h2 className="display text-3xl leading-[1.1] text-anthracite md:text-4xl">{home.presenceTitle}</h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
            <CompanyBold text={home.presenceText} />
          </p>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.5fr]">
            <div className="grid gap-4">
              <PresenceBlock flag={<FlagRDC />} title="Kinshasa, RD Congo" role="Siège social — Entreprise des travaux" coords="4°19'18&quot;S — 15°18'45&quot;E" />
              <PresenceBlock flag={<FlagFrance />} title="Montrouge, France" role="Bureau d'études — Construction, génie civil, travaux publics" coords="48°49'07&quot;N — 2°19'10&quot;E" />
              <Link href="/contact" className="focus-ring mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--plan-accent)] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#1a5fd6]">
                Nous contacter <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <Reveal delay={0.1} variant="right">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4" style={{ borderColor: "var(--plan-line)" }}>
                <WorldMap />
              </div>
            </Reveal>
          </div>
        </PlanSection>

        {/* 10. LET'S WORK TOGETHER — contact direct */}
        <section className="relative isolate overflow-hidden py-24 text-white" style={{ backgroundColor: "#101a33" }}>
          <Hatching className="pointer-events-none absolute inset-0 h-full w-full text-white" opacity={0.05} />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:px-10">
            <Reveal variant="left">
              <p className="annotation text-[10px]" style={{ color: "var(--plan-sky)" }}>AXE G — TRAVAILLONS ENSEMBLE</p>
              <h2 className="display mt-4 text-3xl leading-[1.1] md:text-4xl">Parlons de votre prochain ouvrage</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="annotation text-[9px] text-slate-400">APPELEZ-NOUS</p>
                  <ul className="mt-2 grid gap-1 text-sm">
                    {phones.map((raw) => {
                      const { number, note } = splitPhone(raw);
                      const isWhatsapp = note ? /whatsapp/i.test(note) : false;
                      const href = isWhatsapp ? `https://wa.me/${number.replace(/[^\d]/g, "")}` : `tel:${number.replace(/\s/g, "")}`;
                      return (
                        <li key={number}><a href={href} className="transition hover:text-white">{number}{note && <span className="ml-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">{note}</span>}</a></li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <p className="annotation text-[9px] text-slate-400">HORAIRES</p>
                  <p className="mt-2 flex items-center gap-2 text-sm"><Clock className="h-4 w-4" style={{ color: "var(--plan-sky)" }} />[À COMPLÉTER — ex. Lun – Ven, 8h – 17h]</p>
                  <p className="mt-4 text-sm leading-6"><MapPin className="mr-2 inline h-4 w-4" style={{ color: "var(--plan-sky)" }} />{settings?.address}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="annotation text-[9px] text-slate-400">EMAIL</p>
                  {settings?.email && <p className="mt-2 text-sm"><Mail className="mr-2 inline h-4 w-4" style={{ color: "var(--plan-sky)" }} /><a href={`mailto:${settings.email}`} className="break-all transition hover:underline">{settings.email}</a></p>}
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/devis" className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--plan-accent)] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#1a5fd6]">
                  Demander un devis <ArrowRight className="h-4 w-4" />
                </Link>
                {phones.map((raw) => {
                  const { number, note } = splitPhone(raw);
                  if (!(note && /whatsapp/i.test(note))) return null;
                  return (
                    <a key={number} href={`https://wa.me/${number.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-[var(--plan-navy)]">
                      <Phone className="h-4 w-4" /> WhatsApp {note ? `— ${note.replace(/WhatsApp\s*/i, "").trim()}` : ""}
                    </a>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <CornerMarks className="p-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
                  <Image src={IMAGES.engagement.src} alt={IMAGES.engagement.alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                </div>
              </CornerMarks>
            </Reveal>
          </div>
        </section>

        {/* 11. ACTUALITÉS — masqué si vide */}
        {latestArticles.length > 0 && (
          <PlanSection code="ANNEXE 02" label="ACTUALITÉS" variant="none">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionHeadingDark title={home.newsTitle} />
              </div>
              <Link href="/actualites" className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--plan-accent)] px-6 py-3 text-sm font-bold transition hover:bg-[var(--plan-accent)] hover:text-white" style={{ color: "var(--plan-accent)" }}>
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

        {/* 12. CTA FINAL HACHURÉ */}
        <HatchedCta title={home.ctaTitle} text={home.ctaText} ctaLabel="Demander une estimation et des quantitatifs" ctaHref="/devis" />
      </main>
    </SiteShell>
  );
}

function SectionHeadingDark({ title }: { title: string }) {
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
