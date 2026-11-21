import Image from "next/image";
import { Eye, Target, Gem, BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteSettings } from "@/lib/site-settings";
import { getPageContent, stringList } from "@/lib/page-content";
import { SectionHeading, CtaSection } from "@/components/public/sections";
import { Reveal } from "@/components/public/reveal";
import { prisma } from "@/lib/prisma";
import { CompanyBold } from "@/components/company-bold";

export const metadata = { title: "À propos" };
export const instant = false;

const fallbackImage = "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1600&q=85";

const initialsOf = (name: string) => name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] ?? "").join("").toUpperCase();

const pillarIcons = [Target, Eye, Gem];

export default async function About() {
  const [settings, members, about] = await Promise.all([
    getSiteSettings(),
    prisma.teamMember.findMany({ where: { publicationStatus: "PUBLISHED" }, orderBy: [{ position: "asc" }, { name: "asc" }] }),
    getPageContent("about"),
  ]);
  const text = about.introText;
  const image = about.heroImage || settings?.heroImageUrl || fallbackImage;
  const sectionImage = about.introImage;

  return (
    <SiteShell>
      <main>
        <PageHero eyebrow={about.heroEyebrow || settings?.companyName || "E.T.C.S Sarl"} title={about.heroTitle} text={about.heroText} image={image} />

        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-anthracite/20">
                <Image src={sectionImage} alt="Chantier ETCS" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading eyebrow={about.introEyebrow} title={about.introTitle} />
              <p className="mt-6 whitespace-pre-wrap text-justify leading-8 text-slate-600"><CompanyBold text={text} /></p>
              <div className="mt-10 grid gap-6 border-t border-slate-200 pt-8 sm:grid-cols-3">
                {about.introValues.map((value) => (
                  <div key={value.title}><p className="text-sm font-black uppercase tracking-wide text-royal">{value.title}</p><p className="mt-1 text-sm text-slate-500">{value.text}</p></div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-mist py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal><SectionHeading align="center" eyebrow={about.pillarsEyebrow} title={about.pillarsTitle} /></Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {about.pillars.map((pillar, index) => {
                const Icon = pillarIcons[index % pillarIcons.length];
                return (
                  <Reveal key={pillar.title} delay={index * 0.07}>
                    <div className="card-hover h-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-royal shadow-md shadow-royal/30"><Icon className="h-6 w-6 text-white" /></span>
                      <h3 className="mt-6 text-lg font-extrabold uppercase tracking-wide text-anthracite">{pillar.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{pillar.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {members.length > 0 && (
          <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal><SectionHeading align="center" eyebrow={about.teamEyebrow} title={about.teamTitle} /></Reveal>
              <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {members.map((member, index) => (
                  <Reveal key={member.id} delay={(index % 3) * 0.07}>
                    <article className="card-hover h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                      <div className="relative aspect-[4/5] overflow-hidden bg-royal-deep">
                        {member.photo ? (
                          <Image src={member.photo} alt={member.name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
                        ) : (
                          <span className="grid-lines absolute inset-0 grid place-items-center opacity-80">
                            <span className="display text-6xl text-gold/90">{initialsOf(member.name)}</span>
                          </span>
                        )}
                      </div>
                      <div className="relative p-6">
                        <h3 className="display text-lg uppercase tracking-wide text-anthracite">{member.name}</h3>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[.15em] text-royal">{member.role}</p>
                        {member.bio && <p className="mt-3 text-sm leading-6 text-slate-600">{member.bio}</p>}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal><SectionHeading align="center" eyebrow={about.partnersEyebrow} title={about.partnersTitle} /></Reveal>
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-7 text-slate-600">
              {about.partnersText}
            </p>
            <div className="marquee mt-12" role="list" aria-label="Partenaires">
              <div className="marquee-track">
                {[...stringList(about.partners), ...stringList(about.partners)].map((partner, index) => (
                  <span key={`${partner}-${index}`} role="listitem" className="display flex items-center gap-10 text-xl tracking-[.14em] text-royal">
                    {partner}
                    <span className="h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-mist py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <SectionHeading eyebrow={about.trainingEyebrow} title={about.trainingTitle} />
              <p className="mt-6 leading-8 text-slate-600">
                {about.trainingText}
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-slate-600">
                {stringList(about.trainingPoints).map((point) => (
                  <li key={point} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{point}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                {stringList(about.trainingModules).map((module) => (
                  <span key={module} className="card-hover rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center text-sm font-bold text-anthracite shadow-sm">
                    {module}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-vinci py-24 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
            <Reveal>
              <SectionHeading light eyebrow={about.qualityEyebrow} title={about.qualityTitle} />
              {about.qualityText.split(/\r?\n\s*\r?\n/).map((paragraph, index) => (
                <p key={index} className={`leading-8 text-slate-100 ${index === 0 ? "mt-6" : "mt-4"}`}>{paragraph}</p>
              ))}
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-vinci-sky/40 bg-white/10 p-8 backdrop-blur">
                <BadgeCheck className="h-8 w-8 text-vinci-sky" />
                <p className="mt-5 text-lg font-extrabold">{about.qualityAsideTitle}</p>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-100">
                  {about.qualityPoints.map((point) => (
                    <li key={point} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vinci-sky" />{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <CtaSection title={about.ctaTitle} text={about.ctaText} primaryHref="/devis" />
      </main>
    </SiteShell>
  );
}
