import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { InquiryForm } from "@/components/inquiry-form";
import { getSiteSettings } from "@/lib/site-settings";
import { Reveal } from "@/components/public/reveal";

export const metadata = { title: "Demander un devis" };
export const instant = false;

const fallbackImage = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85";

const steps = [
  { number: "01", title: "Décrivez votre besoin", text: "Type de projet, localisation, contraintes : complétez le formulaire en quelques minutes." },
  { number: "02", title: "Étude de votre demande", text: "Nos ingénieurs analysent votre dossier et préparent une proposition adaptée." },
  { number: "03", title: "Réponse et rendez-vous", text: "Nous revenons vers vous avec une offre claire et, si besoin, une visite de site." },
];

export default async function Quote() {
  const settings = await getSiteSettings();
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="PARLONS DE VOTRE PROJET"
          title="Demander un devis"
          text="Décrivez votre besoin : les informations transmises sont destinées uniquement à GTGC pour traiter votre demande."
          image={settings?.heroImageUrl || fallbackImage}
        />
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <Reveal>
              <div>
                <h2 className="display text-3xl uppercase leading-tight text-anthracite md:text-4xl">Un processus simple en trois étapes</h2>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  Ce formulaire est protégé contre les envois automatisés. Vos informations restent confidentielles et ne sont utilisées que pour traiter votre demande de devis.
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
        <section className="relative isolate overflow-hidden">
          <div className="h-[380px] w-full sm:h-[460px]">
            <Image src={settings?.heroImageUrl || fallbackImage} alt="Chantier GTGC" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-anthracite/55" />
            <div className="absolute inset-0 grid place-items-center px-6 text-center">
              <h2 className="display max-w-2xl text-3xl uppercase leading-tight text-white md:text-5xl">Votre projet mérite une écoute attentive.</h2>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
