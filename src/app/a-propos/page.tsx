import Image from "next/image";
import { Eye, Target, Gem, BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteSettings } from "@/lib/site-settings";
import { SectionHeading, CtaSection } from "@/components/public/sections";
import { Reveal } from "@/components/public/reveal";
import { prisma } from "@/lib/prisma";
import { partners, trainingModules } from "@/lib/content";

export const metadata = { title: "À propos" };
export const instant = false;

const fallbackImage = "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1600&q=85";

const initialsOf = (name: string) => name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] ?? "").join("").toUpperCase();

const pillars = [
  { icon: Target, title: "Notre mission", text: "Assurer l'ensemble des missions que comportent les études : la maîtrise d'œuvre, la vérification et la conduite des opérations pour la réalisation des grandes infrastructures de travaux publics et de génie civil." },
  { icon: Eye, title: "Notre vision", text: "Être l'une des sociétés d'ingénierie congolaises les plus importantes : une entreprise congolaise d'abord et multinationale, reconnue pour ses grandes infrastructures en RDC et au-delà." },
  { icon: Gem, title: "Nos valeurs", text: "S'engager sur les performances, assurer la qualité de son service, progresser chaque jour dans notre savoir-faire : harmonie des talents, construire autrement." },
];

export default async function About() {
  const settings = await getSiteSettings();
  const [text, members] = await Promise.all([
    Promise.resolve(settings?.aboutText || "Etudes Techniques Conceptions des Structures (ETCS SARL) est l'une des sociétés d'ingénierie congolaises les plus importantes. Composée d'ingénieurs et de techniciens supérieurs de formation en constructions civiles et travaux publics, l'entreprise porte une grande expérience et assure la maîtrise d'œuvre, la vérification et la conduite des opérations pour les grandes infrastructures."),
    prisma.teamMember.findMany({ where: { publicationStatus: "PUBLISHED" }, orderBy: [{ position: "asc" }, { name: "asc" }] }),
  ]);
  const image = settings?.heroImageUrl || fallbackImage;
  const sectionImage = "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&w=1600&q=85";

  return (
    <SiteShell>
      <main>
        <PageHero eyebrow={settings?.companyName || "ETCS SARL"} title="Une vision construite pour durer" text="Ingénierie, génie civil et travaux publics — de l'étude de faisabilité à la mise en service." image={image} />

        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-anthracite/20">
                <Image src={sectionImage} alt="Chantier ETCS" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading eyebrow="NOTRE ENGAGEMENT" title="Faire avancer chaque projet avec exigence" />
              <p className="mt-6 whitespace-pre-wrap text-justify leading-8 text-slate-600">{text}</p>
              <div className="mt-10 grid gap-6 border-t border-slate-200 pt-8 sm:grid-cols-3">
                <div><p className="text-sm font-black uppercase tracking-wide text-royal">Rigueur</p><p className="mt-1 text-sm text-slate-500">à chaque étape du chantier</p></div>
                <div><p className="text-sm font-black uppercase tracking-wide text-royal">Écoute</p><p className="mt-1 text-sm text-slate-500">de chaque besoin exprimé</p></div>
                <div><p className="text-sm font-black uppercase tracking-wide text-royal">Vision</p><p className="mt-1 text-sm text-slate-500">pour un avenir construit</p></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-mist py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal><SectionHeading align="center" eyebrow="INSTITUTIONNEL" title="Mission, vision et valeurs" /></Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {pillars.map(({ icon: Icon, title, text }, index) => (
                <Reveal key={title} delay={index * 0.07}>
                  <div className="card-hover h-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-royal shadow-md shadow-royal/30"><Icon className="h-6 w-6 text-white" /></span>
                    <h3 className="mt-6 text-lg font-extrabold uppercase tracking-wide text-anthracite">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {members.length > 0 && (
          <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal><SectionHeading align="center" eyebrow="NOTRE ÉQUIPE" title="Les femmes et hommes qui portent vos projets" /></Reveal>
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
            <Reveal><SectionHeading align="center" eyebrow="PARTENARIAT" title="Un réseau de compétences reconnu" /></Reveal>
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-7 text-slate-600">
              ETCS s&apos;appuie sur des partenariats solides avec des acteurs de référence de l&apos;ingénierie et de la construction.
            </p>
            <div className="marquee mt-12" role="list" aria-label="Partenaires">
              <div className="marquee-track">
                {[...partners, ...partners].map((partner, index) => (
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
              <SectionHeading eyebrow="TRANSMISSION DES SAVOIRS" title="Notre centre de formations" />
              <p className="mt-6 leading-8 text-slate-600">
                Nos programmes d&apos;enseignement se déclinent en modules adaptés à votre corps de métiers : génie civil, BTP et architecture. Les formations sont dispensées par des intervenants agréés, dans nos locaux ou directement chez le client.
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-slate-600">
                <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />Utilisation des dernières versions des logiciels</li>
                <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />PC de dernières générations, un seul PC par stagiaire</li>
                <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />Sessions de 4 personnes au maximum</li>
                <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />Adaptabilité du programme en fonction des besoins</li>
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                {trainingModules.map((module) => (
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
              <SectionHeading light eyebrow="QUALITÉ & EXPERTISE" title="L'excellence comme standard d'exécution" />
              <p className="mt-6 leading-8 text-slate-100">
                Nos équipes appliquent des procédures de contrôle systématiques : vérification des matériaux, suivi des plans d'exécution, respect des règles de sécurité et contrôle qualité à chaque phase du chantier.
              </p>
              <p className="mt-4 leading-8 text-slate-100">
                Cette discipline technique est le socle de la confiance que nous accordent nos partenaires institutionnels et privés.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-vinci-sky/40 bg-white/10 p-8 backdrop-blur">
                <BadgeCheck className="h-8 w-8 text-vinci-sky" />
                <p className="mt-5 text-lg font-extrabold">Un contrôle qualité à toutes les phases</p>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-100">
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vinci-sky" />Sélection et vérification des matériaux</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vinci-sky" />Suivi des plans et études d'exécution</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vinci-sky" />Sécurité des équipes et des tiers</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vinci-sky" />Reporting régulier vers le client</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <CtaSection title="Confiez-nous votre prochain ouvrage" text="Discutons de votre projet : nos équipes vous répondent avec une proposition claire et documentée." primaryHref="/devis" />
      </main>
    </SiteShell>
  );
}
