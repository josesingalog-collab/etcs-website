import Image from "next/image";
import { SiteShell } from "@/components/site-shell";
import { publishedServices } from "@/lib/public-content";
import { services as fallbackServices } from "@/lib/content";
import { getPhoneList, getSiteSettings } from "@/lib/site-settings";
import { getPageContent } from "@/lib/page-content";
import { CtaSection } from "@/components/public/sections";
import { Reveal } from "@/components/public/reveal";
import { DomainCard } from "@/components/public/domain-card";

export const metadata = { title: "Nos services" };
export const instant = false;

export default async function Services() {
  const [published, services, settings] = await Promise.all([publishedServices(), getPageContent("services"), getSiteSettings()]);
  const phones = getPhoneList(settings);
  const items = published.length > 0
    ? published.map((service) => ({ slug: service.slug, title: service.title, image: service.image }))
    : fallbackServices.map((service) => ({ slug: service.slug, title: service.title, image: service.image }));

  return (
    <SiteShell>
      <main>
        <section className="bg-white pt-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="rise flex items-center gap-3 text-xs font-bold tracking-[.22em] text-royal">
              <span />{services.heroEyebrow}
            </p>
            <h1 className="rise rise-1 display mt-6 max-w-4xl text-4xl leading-[1.08] text-anthracite md:text-5xl lg:text-6xl">
              {services.heroTitle} <span className="serif-accent">et bâtiments</span>
            </h1>
            <Reveal className="rise rise-2 mt-8 max-w-2xl">
              <p className="text-base leading-8 text-slate-600">
                {services.heroText}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="rise rise-3 mt-12">
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-mist shadow-2xl shadow-anthracite/15">
                <Image src={services.heroImage} alt="Chantier E.T.C.S Sarl — génie civil" fill priority sizes="100vw" className="object-cover" />
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <DomainCard key={item.slug} service={item} index={index} />
              ))}
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
                  {phones.map((phone, index) => (
                    <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className={index === 0 ? "rounded-xl bg-royal px-6 py-4 font-bold text-white transition hover:bg-royal-deep" : "rounded-xl border border-royal/20 bg-white px-6 py-4 font-bold text-royal transition hover:bg-royal-50"}>{phone}</a>
                  ))}
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
