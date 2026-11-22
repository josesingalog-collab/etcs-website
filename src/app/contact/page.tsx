import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { InquiryForm } from "@/components/inquiry-form";
import { getPhoneList, getSiteSettings, splitPhone } from "@/lib/site-settings";
import { getPageContent } from "@/lib/page-content";
import { SectionHeading } from "@/components/public/sections";
import { Reveal } from "@/components/public/reveal";

export const metadata = { title: "Contact" };
export const instant = false;

function isEmbeddableMap(url: string | null | undefined) {
  return typeof url === "string" && /^https:\/\/(maps\.google\.|www\.google\.com\/maps|www\.openstreetmap\.org\/export\/embed)/.test(url);
}

export default async function Contact() {
  const [settings, contact] = await Promise.all([getSiteSettings(), getPageContent("contact")]);
  const showMap = isEmbeddableMap(settings?.mapEmbedUrl);
  const phones = getPhoneList(settings);
  const cards = [
    { icon: MapPin, label: "Adresse", value: settings?.address ?? "", note: undefined as string | undefined, href: undefined },
    ...phones.map((raw, index) => {
      const { number, note } = splitPhone(raw);
      return { icon: Phone, label: index === 0 ? "Téléphone" : `Téléphone ${index + 1}`, value: number, note, href: `tel:${number.replace(/\s/g, "")}` };
    }),
    { icon: Mail, label: "Email", value: settings?.email ?? "", note: undefined as string | undefined, href: settings?.email ? `mailto:${settings.email}` : undefined },
  ];

  return (
    <SiteShell>
      <main>
        <PageHero eyebrow={contact.heroEyebrow} title={contact.heroTitle} text={contact.heroText} />
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
            <Reveal>
              <SectionHeading eyebrow="COORDONNÉES" title="Nous joindre directement" />
              <div className="mt-10 grid gap-4">
                {cards.map(({ icon: Icon, label, value, note, href }) => value && (
                  <div key={label} className="card-hover flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal shadow-md shadow-royal/30"><Icon className="h-5 w-5 text-white" /></span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
                      {href ? (
                        <a href={href} className="mt-1 block break-all font-semibold text-anthracite transition hover:text-royal">{value}</a>
                      ) : (
                        <p className="mt-1 font-semibold leading-6 text-anthracite">{value}</p>
                      )}
                      {note && <p className="mt-0.5 text-xs text-slate-500">{note}</p>}
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-mist p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-vinci"><Clock className="h-5 w-5 text-vinci-sky" /></span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{contact.hoursLabel}</p>
                    <p className="mt-1 font-semibold text-anthracite">{contact.hours}</p>
                    <p className="text-sm text-slate-600">{contact.hoursLocation}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading eyebrow={contact.formEyebrow} title={contact.formTitle} />
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
              title="Carte — localisation de E.T.C.S Sarl"
              className="h-[420px] w-full border-0"
            />
          </section>
        )}
      </main>
    </SiteShell>
  );
}
