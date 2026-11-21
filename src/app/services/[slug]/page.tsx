import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { publishedService, publishedServices } from "@/lib/public-content";
import { getPhoneList, getSiteSettings } from "@/lib/site-settings";
import { Reveal } from "@/components/public/reveal";

export const instant = false;

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, others, settings] = await Promise.all([
    publishedService(slug),
    publishedServices(),
    getSiteSettings(),
  ]);
  if (!service) notFound();
  const phoneList = getPhoneList(settings);
  const related = others.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <SiteShell>
      <main>
        <PageHero eyebrow="SERVICE" title={service.title} text={service.excerpt} image={service.image} />
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
              <Reveal>
                <article>
                  {service.image && (
                    <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl shadow-lg shadow-anthracite/10">
                      <Image src={service.image} alt={service.title} fill priority sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
                    </div>
                  )}
                  <h2 className="display text-2xl uppercase text-anthracite md:text-3xl">Prestation</h2>
                  <div className="mt-6 whitespace-pre-wrap text-justify text-base leading-8 text-slate-600">{service.description}</div>
                  <Link href="/services" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-royal transition hover:gap-3">
                    <ArrowRight className="h-4 w-4 rotate-180" />Tous les services
                  </Link>
                </article>
              </Reveal>
              <Reveal delay={0.1}>
                <aside className="flex flex-col gap-6">
                  <div className="rounded-2xl bg-vinci-navy p-8 text-white shadow-xl shadow-vinci-navy/25">
                    <p className="text-xs font-bold tracking-[.2em] text-vinci-sky">DEVIS GRATUIT</p>
                    <h3 className="display mt-3 text-2xl leading-tight">Demander une offre pour ce service</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-200">Recevez une proposition adaptée à votre projet.</p>
                    <Link href="/devis" className="focus-ring mt-6 block rounded-full bg-white px-6 py-3.5 text-center text-sm font-bold text-vinci shadow-md transition hover:bg-vinci-sky hover:text-vinci-navy">
                      Demander un devis
                    </Link>
                  </div>
                  {phoneList.length > 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-mist p-7">
                      <p className="text-xs font-bold tracking-[.2em] text-royal">CONTACT DIRECT</p>
                      <div className="mt-4 grid gap-3 text-sm font-semibold text-anthracite">
                        {phoneList.map((phone) => (
                          <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3 transition hover:text-royal"><Phone className="h-4 w-4 shrink-0 text-royal" />{phone}</a>
                        ))}
                        {settings?.email && (
                          <a href={`mailto:${settings.email}`} className="flex items-center gap-3 break-all transition hover:text-royal"><Mail className="h-4 w-4 shrink-0 text-royal" />{settings.email}</a>
                        )}
                      </div>
                    </div>
                  )}
                  {related.length > 0 && (
                    <div className="rounded-2xl border border-slate-200 p-7">
                      <p className="text-xs font-bold tracking-[.2em] text-royal">AUTRES SERVICES</p>
                      <nav className="mt-4 grid gap-2 text-sm font-bold text-anthracite" aria-label="Autres services">
                        {related.map((item) => (
                          <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-lg px-3 py-2.5 transition hover:bg-royal-50 hover:text-royal">
                            {item.title}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  )}
                </aside>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
