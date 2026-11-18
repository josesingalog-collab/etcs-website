import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { InquiryForm } from "@/components/inquiry-form";
import { getSiteSettings } from "@/lib/site-settings";
import { SectionHeading } from "@/components/public/sections";
import { Reveal } from "@/components/public/reveal";

export const metadata = { title: "Contact" };
export const instant = false;

function isEmbeddableMap(url: string | null | undefined) {
  return typeof url === "string" && /^https:\/\/(maps\.google\.|www\.google\.com\/maps|www\.openstreetmap\.org\/export\/embed)/.test(url);
}

export default async function Contact() {
  const settings = await getSiteSettings();
  const showMap = isEmbeddableMap(settings?.mapEmbedUrl);
  const cards = [
    { icon: MapPin, label: "Adresse", value: settings?.address ?? "", href: undefined },
    { icon: Phone, label: "Téléphone", value: settings?.phone ?? "", href: settings?.phone ? `tel:${settings.phone.replace(/\s/g, "")}` : undefined },
    { icon: Mail, label: "Email", value: settings?.email ?? "", href: settings?.email ? `mailto:${settings.email}` : undefined },
  ];

  return (
    <SiteShell>
      <main>
        <PageHero eyebrow="CONTACT" title="Entrons en contact" text="Une question, un projet, une demande de rendez-vous ? Notre équipe vous répond." />
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
            <Reveal>
              <SectionHeading eyebrow="COORDONNÉES" title="Nous joindre directement" />
              <div className="mt-10 grid gap-4">
                {cards.map(({ icon: Icon, label, value, href }) => value && (
                  <div key={label} className="card-hover flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal shadow-md shadow-royal/30"><Icon className="h-5 w-5 text-white" /></span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
                      {href ? (
                        <a href={href} className="mt-1 block break-all font-semibold text-anthracite transition hover:text-royal">{value}</a>
                      ) : (
                        <p className="mt-1 font-semibold leading-6 text-anthracite">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-mist p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-vinci"><Clock className="h-5 w-5 text-vinci-sky" /></span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Horaires</p>
                    <p className="mt-1 font-semibold text-anthracite">Lundi – Vendredi · 8h00 – 17h00</p>
                    <p className="text-sm text-slate-600">Kinshasa, RDC</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading eyebrow="FORMULAIRE" title="Écrivez-nous" />
              <div className="mt-10"><InquiryForm type="contact" /></div>
            </Reveal>
          </div>
        </section>
        {showMap && (
          <section className="border-t border-slate-200">
            <iframe
              src={settings?.mapEmbedUrl ?? ""}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte — localisation de ETCS"
              className="h-[420px] w-full border-0"
            />
          </section>
        )}
      </main>
    </SiteShell>
  );
}
