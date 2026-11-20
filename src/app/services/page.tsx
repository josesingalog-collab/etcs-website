import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { publishedServices } from "@/lib/public-content";
import { services as fallbackServices, company } from "@/lib/content";
import { getPageContent } from "@/lib/page-content";
import { CtaSection } from "@/components/public/sections";
import { Reveal } from "@/components/public/reveal";

export const metadata = { title: "Nos services" };
export const instant = false;

export default async function Services() {
  const [published, services] = await Promise.all([publishedServices(), getPageContent("services")]);
  const items = published.length > 0
    ? published.map((service) => ({ title: service.title, description: service.description, image: service.image }))
    : fallbackServices.map((service) => ({ title: service.title, description: service.excerpt, image: service.image }));

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
                <Image src={services.heroImage} alt="Chantier ETCS — génie civil" fill priority sizes="100vw" className="object-cover" />
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
            <div className="grid gap-10">
              {items.map((item, index) => (
                <Reveal key={`${item.title}-${index}`}>
                  <article className="grid gap-10 border-t border-slate-200 pt-14 lg:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col justify-center">
                      <p className="display text-sm tracking-[.2em] text-gold">{String(index + 1).padStart(2, "0")}</p>
                      <h2 className="display mt-4 text-3xl leading-[1.12] text-anthracite md:text-4xl">{item.title}</h2>
                      <p className="mt-6 text-base leading-8 text-slate-600">{item.description}</p>
                      <Link
                        href="/devis"
                        className="mt-8 inline-flex w-fit items-center gap-2 border-b-2 border-gold pb-1 text-sm font-bold text-royal transition hover:gap-3.5 hover:text-royal-deep"
                      >
                        Discuter de ce besoin <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="self-start lg:sticky lg:top-28">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-mist shadow-xl shadow-anthracite/10">
                        {item.image ? (
                          <Image src={item.image} alt={item.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition duration-700 hover:scale-[1.03]" />
                        ) : (
                          <span className="grid-lines absolute inset-0 grid place-items-center">
                            <span className="display text-5xl text-royal/30">{String(index + 1).padStart(2, "0")}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
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
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="rounded-xl bg-royal px-6 py-4 font-bold text-white transition hover:bg-royal-deep">{company.phone}</a>
                  <a href={`mailto:${company.email}`} className="break-all rounded-xl border border-royal/20 px-6 py-4 font-bold text-royal transition hover:bg-royal-50">{company.email}</a>
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
