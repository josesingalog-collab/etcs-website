import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrainTrack, Building2, Zap, Sprout, Globe2 } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { getPhoneList, getSiteSettings, splitPhone } from "@/lib/site-settings";
import { getPageContent } from "@/lib/page-content";
import { CtaSection } from "@/components/public/sections";
import { SectionLabel } from "@/components/plan/plan-section";
import { Reveal } from "@/components/public/reveal";

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Nos services", description: "Domaines d'expertise d'E.T.C.S Sarl : infrastructures de transport, bâtiments complexes et IGH, énergie, aménagement urbain, environnement et développement durable.", path: "/services" });
export const instant = false;

const competenceIcons = [TrainTrack, Building2, Zap, Sprout, Globe2];

export default async function Services() {
  const [services, settings, about] = await Promise.all([getPageContent("services"), getSiteSettings(), getPageContent("about")]);
  const phones = getPhoneList(settings);

  return (
    <SiteShell>
      <main>
        <section className="bg-white pt-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="rise flex items-center gap-3 text-xs font-bold tracking-[.22em] text-royal">
              <span />{services.heroEyebrow}
            </p>
            <h1 className="rise rise-1 display mt-6 max-w-4xl text-4xl leading-[1.08] text-anthracite md:text-5xl lg:text-6xl">
              {services.heroTitle}
            </h1>
            <Reveal className="rise rise-2 mt-8 max-w-2xl">
              <p className="text-base leading-8 text-slate-600">
                {services.heroText}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="rise rise-3 mt-12">
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-mist shadow-2xl shadow-anthracite/15">
                <Image src={services.heroImage} alt="Chantier de génie civil : grues et structure en béton" fill priority sizes="100vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-white pb-8 pt-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Reveal>
              <p className="display text-2xl leading-relaxed text-anthracite md:text-3xl md:leading-relaxed">
                {services.statement}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionLabel code="COUPE B-B" label="NOS DOMAINES D'EXPERTISE" />
            <div className="grid gap-10">
              {about.competences.map((item, index) => {
                const Icon = competenceIcons[index % competenceIcons.length];
                return (
                  <Reveal key={`${item.title}-${index}`}>
                    <article className="grid gap-8 border-t border-slate-200 pt-12 lg:grid-cols-[auto_1fr_minmax(0,420px)] lg:items-center lg:gap-12">
                      <div className="flex items-start gap-6">
                        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-royal text-white shadow-lg shadow-royal/30">
                          <Icon className="h-7 w-7" aria-hidden="true" />
                        </span>
                        <div>
                          <h2 className="display text-2xl leading-[1.12] text-royal md:text-3xl">{item.title}</h2>
                          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{item.text}</p>
                          <Link
                            href="/devis"
                            className="mt-6 inline-flex w-fit items-center gap-2 border-b-2 border-gold pb-1 text-sm font-bold text-royal transition hover:gap-3.5 hover:text-royal-deep"
                          >
                            Discuter de ce besoin <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-mist shadow-xl shadow-anthracite/10 lg:aspect-[4/3]">
                        {item.image ? (
                          <Image src={item.image} alt={item.title} fill sizes="(max-width:1024px) 100vw, 420px" className="object-cover transition duration-700 hover:scale-[1.03]" />
                        ) : (
                          <span className="grid-lines absolute inset-0 grid place-items-center">
                            <span className="display text-5xl text-royal/30">{String(index + 1).padStart(2, "0")}</span>
                          </span>
                        )}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-mist py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <div className="grid items-center gap-10 rounded-3xl bg-white p-8 shadow-lg shadow-anthracite/5 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <p className="flex items-center gap-3 text-xs font-bold tracking-[.22em] text-gold">
                    <span />{services.customEyebrow}
                  </p>
                  <h2 className="display mt-4 text-3xl leading-[1.12] text-anthracite md:text-4xl">
                    {services.customTitle}
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
                    {services.customText}
                  </p>
                </div>
                <div className="grid gap-3 text-sm">
                  {phones.map((raw, index) => {
                    const { number, note } = splitPhone(raw);
                    return (
                      <a key={number} href={`tel:${number.replace(/\s/g, "")}`} className={index === 0 ? "rounded-xl bg-royal px-6 py-4 font-bold text-white transition hover:bg-royal-deep" : "rounded-xl border border-royal/20 bg-white px-6 py-4 font-bold text-royal transition hover:bg-royal-50"}>
                        {number}{note && <span className="ml-2 text-[10px] font-bold uppercase tracking-wider opacity-70">{note}</span>}
                      </a>
                    );
                  })}
                  {settings?.email && (
                    <a href={`mailto:${settings.email}`} className="break-all rounded-xl border border-royal/20 px-6 py-4 font-bold text-royal transition hover:bg-royal-50">{settings.email}</a>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <CtaSection title={services.ctaTitle} text={services.ctaText} />
      </main>
    </SiteShell>
  );
}
