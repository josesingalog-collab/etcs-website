import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Mail, MapPin, Clock, Play } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { publishedProjects, publishedArticles } from "@/lib/public-content";
import { getPhoneList, getSiteSettings, splitPhone } from "@/lib/site-settings";
import { getPageContent, getSlot, getTestimonials } from "@/lib/page-content";
import { parseKeyStats } from "@/lib/key-stats";
import { ProjectStack } from "@/components/public/project-stack";
import { ArticleCard } from "@/components/public/cards";
import { Reveal } from "@/components/public/reveal";
import { ServicesPanel } from "@/components/public/services-panel";
import { StatsCounters } from "@/components/public/stats-counters";
import { TestimonialSlider } from "@/components/public/testimonial-slider";
import { FaqAccordion } from "@/components/public/faq-accordion";
import { MarqueeRibbon } from "@/components/public/marquee-ribbon";
import { CompanyBold } from "@/components/company-bold";
import { IMAGES } from "@/lib/images";
import { InquiryForm } from "@/components/inquiry-form";
import { MockEyebrow, PillLink } from "@/components/public/pill";

export const instant = false;

function socialsOf(settings: Awaited<ReturnType<typeof getSiteSettings>>): [string, string][] {
  if (!settings?.socialLinks || typeof settings.socialLinks !== "object" || Array.isArray(settings.socialLinks)) return [];
  return (Object.entries(settings.socialLinks as Record<string, unknown>) as [string, unknown][])
    .filter((entry): entry is [string, string] => typeof entry[1] === "string" && /^https:\/\//.test(entry[1]));
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
  const firstPhone = phones.length > 0 ? splitPhone(phones[0]) : null;
  const stats = parseKeyStats(settings?.keyStats);
  const latestProjects = projects.slice(0, 4);
  const latestArticles = articles.slice(0, 3);
  const heroLines = home.heroTitle.split(/\r?\n/);
  const testimonials = getTestimonials(home.testimonial);
  const socials = socialsOf(settings);
  const heroSlot = getSlot(home.heroImage, IMAGES.hero.alt);
  const aboutSlot1 = getSlot(home.aboutPhotos[0], IMAGES.presentation.alt);
  const aboutSlot2 = getSlot(home.aboutPhotos[1], IMAGES.transport.alt);
  const faqSlot = getSlot(home.faqImage, IMAGES.etudes.alt);
  const contactSlot = getSlot(home.contactImage, IMAGES.engagement.alt);
  const statCards = stats.slice(0, 2);

  return (
    <SiteShell>
      <main>
        {/* 1. HERO plein écran */}
        <section aria-label="Introduction" className="relative isolate flex min-h-[92vh] items-center overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[3.5rem]">
          <Image src={settings?.heroImageUrl || heroSlot.url} alt={IMAGES.hero.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: heroSlot.focal }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(10,22,56,.92) 0%, rgba(10,22,56,.78) 45%, rgba(10,22,56,.35) 100%)" }} />
          {socials.length > 0 && (
            <div className="absolute bottom-10 left-6 z-10 hidden flex-col gap-3 lg:flex">
              {socials.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-[10px] font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--plan-navy)]">
                  {name.slice(0, 2).toUpperCase()}
                </a>
              ))}
              <span className="mx-auto my-2 h-16 w-px bg-white/30" aria-hidden="true" />
            </div>
          )}
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 py-36 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-16">
            <div>
              <p className="rise annotation text-[11px]" style={{ color: "var(--plan-sky)" }}>{home.heroEyebrow}</p>
              <h1 className="rise rise-1 display mt-6 leading-[1.02] text-[clamp(2.4rem,5.4vw,4.5rem)] text-white">
                {heroLines.map((line, index) => (
                  <span key={index}>{index > 0 && <br />}{line}</span>
                ))}
              </h1>
              <p className="rise rise-2 mt-7 max-w-lg text-sm leading-7 text-slate-200">
                <CompanyBold text={home.heroHook} />
              </p>
              <div className="rise rise-3 mt-9">
                <PillLink href="/devis" variant="accent">Demander une estimation et des quantitatifs</PillLink>
              </div>
            </div>
            <div className="hidden lg:block">
              <Reveal delay={0.2}>
                <div className="ml-auto w-fit rounded-3xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md">
                  <p className="annotation text-[9px] text-slate-200">NOS IMPLANTATIONS</p>
                  <div className="mt-4 grid gap-4">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-extrabold"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--plan-sky)" }} aria-hidden="true" />Kinshasa · RDC</p>
                      <p className="mt-1 pl-4 text-xs text-slate-300">Siège social — Gombe</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-2 text-sm font-extrabold"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--plan-sky)" }} aria-hidden="true" />Montrouge · France</p>
                      <p className="mt-1 pl-4 text-xs text-slate-300">Bureau d&apos;études</p>
                    </div>
                  </div>
                  <Link href="/a-propos" className="focus-ring mt-6 inline-flex items-center gap-2 text-xs font-bold text-white transition hover:gap-3">
                    En savoir plus <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 2. À PROPOS */}
        <section className="relative z-10 -mt-8 rounded-t-[2.5rem] bg-white py-24 lg:-mt-14 lg:rounded-t-[3.5rem]">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-10">
            <Reveal variant="left">
              <div className="grid gap-4">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem]">
                  <Image src={aboutSlot1.url} alt={aboutSlot1.alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: aboutSlot1.focal }} />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-[var(--plan-navy)] backdrop-blur">Bureau d&apos;études &amp; entreprise générale</span>
                </div>
                <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[2rem]">
                  <Image src={aboutSlot2.url} alt={aboutSlot2.alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: aboutSlot2.focal }} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <MockEyebrow>Qui sommes-nous</MockEyebrow>
              <h2 className="display mt-4 text-3xl leading-[1.1] text-anthracite md:text-4xl">{home.presentationTitle}</h2>
              <div className="mt-7 grid gap-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="text-sm font-extrabold" style={{ color: "var(--plan-accent)" }}>Notre vocation</p>
                  <p className="mt-2 text-xs leading-6 text-slate-600">Assurer l&apos;ensemble des missions que comportent les études : la maîtrise d&apos;œuvre, la vérification et la conduite des opérations pour la réalisation des grandes infrastructures de travaux publics et de génie civil.</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="text-sm font-extrabold" style={{ color: "var(--plan-accent)" }}>Notre présence</p>
                  <p className="mt-2 text-xs leading-6 text-slate-600">Siège social à Kinshasa-Gombe (RDC) et un bureau d&apos;études opérant en région parisienne (Montrouge, France).</p>
                </div>
              </div>
              {statCards.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {statCards.map((stat, index) => (
                    <div key={stat.label} className={`rounded-3xl p-5 ${index === 0 ? "text-white" : "text-white"}`} style={{ backgroundColor: index === 0 ? "#101a33" : "var(--plan-accent)" }}>
                      <p className="display text-3xl leading-none">{stat.value}</p>
                      <p className="mt-2 text-[10px] font-bold uppercase leading-4 tracking-wider opacity-80">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-7"><PillLink href="/a-propos" variant="accent">En savoir plus</PillLink></div>
            </Reveal>
          </div>
        </section>

        {/* 3. SERVICES — panneau sombre interactif */}
        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <ServicesPanel eyebrow="Nos domaines" title="Des expertises complémentaires" items={about.competences.map((item) => ({ title: item.title, text: item.text, image: item.image, alt: item.title }))} />
        </section>

        {/* 4. RÉALISATIONS — masqué si vide */}
        {latestProjects.length > 0 && (
          <section className="py-24" style={{ backgroundColor: "var(--plan-paper)" }}>
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <Reveal>
                <MockEyebrow className="justify-center">Nos réalisations</MockEyebrow>
                <h2 className="display mt-4 text-center text-3xl leading-[1.1] text-anthracite md:text-4xl">Des projets qui prennent forme.</h2>
              </Reveal>
              <ProjectStack projects={latestProjects} />
            </div>
          </section>
        )}

        {/* 5. TÉMOIGNAGE — masqué si vide */}
        {testimonials.length > 0 && (
          <section className="bg-white py-24">
            <TestimonialSlider items={testimonials} />
          </section>
        )}

        {/* 6. CHIFFRES CLÉS — masqué si vide */}
        {stats.length > 0 && (
          <section className="bg-white pb-24">
            <StatsCounters stats={stats.slice(0, 4)} />
          </section>
        )}

        {/* 7. FAQ + partenaires */}
        <section className="py-24" style={{ backgroundColor: "var(--plan-paper)" }}>
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-10">
            <Reveal variant="left">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
                <Image src={faqSlot.url} alt={faqSlot.alt} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" style={{ objectPosition: faqSlot.focal }} />
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <MockEyebrow>Questions fréquentes</MockEyebrow>
              <h2 className="display mt-4 text-3xl leading-[1.1] text-anthracite md:text-4xl">Vous vous posez ces questions ?</h2>
              <div className="mt-8"><FaqAccordion items={home.faq} /></div>
            </Reveal>
          </div>
          {about.partners.length > 0 && (
            <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
              <div className="marquee border-y border-slate-200 py-6" role="list" aria-label="Partenaires">
                <div className="marquee-track">
                  {[...about.partners, ...about.partners].map((partner, index) => (
                    <span key={`${partner}-${index}`} role="listitem" className="display flex items-center gap-10 pr-10 text-lg tracking-[.12em] text-slate-300">
                      {partner}
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: "var(--plan-accent)" }} aria-hidden="true" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 8. CONTACT */}
        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:px-10">
            <Reveal variant="left">
              <MockEyebrow>Contact</MockEyebrow>
              <h2 className="display mt-4 text-3xl leading-[1.1] text-anthracite md:text-4xl">Construisons ensemble.</h2>
              <div className="mt-9 grid gap-5">
                {firstPhone && (
                  <a href={`tel:${firstPhone.number.replace(/\s/g, "")}`} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-[var(--plan-accent)]">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: "var(--plan-accent)" }}><Phone className="h-5 w-5" aria-hidden="true" /></span>
                    <span><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Téléphone</span><span className="block text-sm font-bold text-anthracite">{firstPhone.number}</span></span>
                  </a>
                )}
                {settings?.email && (
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-[var(--plan-accent)]">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: "var(--plan-accent)" }}><Mail className="h-5 w-5" aria-hidden="true" /></span>
                    <span><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">E-mail</span><span className="block text-sm font-bold text-anthracite">{settings.email}</span></span>
                  </a>
                )}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: "var(--plan-accent)" }}><Clock className="h-5 w-5" aria-hidden="true" /></span>
                  <span><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Horaires</span><span className="block text-sm font-bold text-anthracite">Lundi – Vendredi · 8h00 – 17h00</span></span>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: "var(--plan-accent)" }}><MapPin className="h-5 w-5" aria-hidden="true" /></span>
                  <span><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Adresse</span><span className="block text-sm font-bold text-anthracite">Avenue du Port, Nouvelles Galeries Présidentielles, 5<sup>e</sup> étage, Bureau 504, Gombe-Kinshasa</span></span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="right"><InquiryForm type="contact" /></Reveal>
          </div>
          <div className="mx-auto mt-14 max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[2.5rem]">
                <Image src={contactSlot.url} alt={contactSlot.alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: contactSlot.focal }} />
                {home.contactVideoUrl && (
                  <a href={home.contactVideoUrl} target="_blank" rel="noreferrer" aria-label="Lire la vidéo de présentation" className="focus-ring absolute inset-0 grid place-items-center">
                    <span className="grid h-20 w-20 place-items-center rounded-full bg-white/90 shadow-2xl transition hover:scale-105"><Play className="h-8 w-8 text-[var(--plan-navy)]" aria-hidden="true" /></span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 9. BANDEAUX DÉFILANTS INCLINÉS */}
        <section aria-hidden="true" className="relative my-10 h-44 overflow-hidden lg:h-52">
          <div className="absolute inset-x-[-10%] top-6 -rotate-2" style={{ backgroundColor: "var(--plan-accent)" }}>
            <MarqueeRibbon items={["Génie civil", "Bâtiments", "Travaux publics", "Ouvrages d'art"]} dark={false} />
          </div>
          <div className="absolute inset-x-[-10%] top-24 rotate-2" style={{ backgroundColor: "#101a33" }}>
            <div className="marquee overflow-hidden py-4">
              <div className="marquee-track">
                {[...Array(2)].flatMap((_, repetition) => ["Bureau d'études", "Infrastructures", "Ingénierie", "Construction"].map((item, index) => (
                  <span key={`${repetition}-${index}`} className="display flex items-center gap-8 pr-8 text-2xl uppercase text-outline">
                    {item}
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--plan-accent)" }} />
                  </span>
                )))}
              </div>
            </div>
          </div>
        </section>

        {/* ACTUALITÉS — masqué si vide */}
        {latestArticles.length > 0 && (
          <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <MockEyebrow>Actualités</MockEyebrow>
                  <h2 className="display mt-4 text-3xl leading-[1.1] text-anthracite md:text-4xl">{home.newsTitle}</h2>
                </div>
                <PillLink href="/actualites" variant="accent" className="shrink-0">Toutes les actualités</PillLink>
              </div>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestArticles.map((article, index) => (
                  <Reveal key={article.slug} delay={index * 0.05}><ArticleCard article={article} /></Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </SiteShell>
  );
}
