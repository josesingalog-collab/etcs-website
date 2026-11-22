import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { InquiryForm } from "@/components/inquiry-form";
import { getSiteSettings } from "@/lib/site-settings";
import { getPageContent } from "@/lib/page-content";
import { Reveal } from "@/components/public/reveal";

export const metadata = { title: "Demander un devis" };
export const instant = false;

const fallbackImage = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85";

export default async function Quote() {
  const [settings, quote] = await Promise.all([getSiteSettings(), getPageContent("quote")]);
  const steps = quote.steps.map((step, index) => ({ ...step, number: String(index + 1).padStart(2, "0") }));
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow={quote.heroEyebrow}
          title={quote.heroTitle}
          text={quote.heroText}
          image={settings?.heroImageUrl || fallbackImage}
        />
        <section id="form-devis" className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <Reveal>
              <div>
                <h2 className="display text-3xl uppercase leading-tight text-anthracite md:text-4xl">{quote.stepsTitle}</h2>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {quote.stepsText}
                </p>
                <ol className="mt-10 grid gap-6">
                  {steps.map((step, index) => (
                    <li key={step.number} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <span className="display grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-royal text-lg text-white shadow-md shadow-royal/30">{step.number}</span>
                        {index < steps.length - 1 && <span className="mt-2 w-px grow bg-slate-200" aria-hidden="true" />}
                      </div>
                      <div className="pb-2">
                        <p className="font-extrabold text-anthracite">{step.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={0.08}><InquiryForm type="quote" /></Reveal>
          </div>
        </section>
        <section className="relative isolate overflow-hidden bg-vinci-navy">
          <div className="relative h-[420px] w-full sm:h-[480px]">
            <Image src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1600&q=85" alt="Chantier E.T.C.S Sarl" fill sizes="100vw" className="object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-vinci-navy via-vinci-navy/80 to-vinci-navy/40" />
            <div className="relative flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
              <p className="text-xs font-bold tracking-[.24em] text-vinci-sky">{quote.bannerEyebrow}</p>
              <h2 className="display max-w-2xl text-3xl leading-[1.1] text-white md:text-5xl">{quote.bannerTitle}</h2>
              <Link href="#form-devis" className="focus-ring mt-2 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-vinci shadow-lg shadow-black/30 transition hover:bg-vinci-sky hover:text-vinci-navy">
                {quote.bannerCtaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
