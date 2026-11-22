import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Tag, HardHat } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { publishedProject, publishedProjects } from "@/lib/public-content";
import { ProjectCard } from "@/components/public/cards";
import { Reveal } from "@/components/public/reveal";
import type { Metadata } from "next";

export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await publishedProject(slug);
  if (!project) return {};
  const description = project.description.slice(0, 155);
  return {
    title: project.title,
    description,
    alternates: { canonical: `/realisations/${project.slug}` },
    openGraph: { title: `${project.title} | E.T.C.S Sarl`, description, url: `/realisations/${project.slug}`, siteName: "E.T.C.S Sarl", locale: "fr_CD", type: "website", images: ["/og-image.png"] },
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, others] = await Promise.all([publishedProject(slug), publishedProjects()]);
  if (!project) notFound();
  const related = others.filter((item) => item.slug !== slug).slice(0, 3);
  const meta = [
    { icon: MapPin, label: "Localisation", value: project.location },
    { icon: Tag, label: "Catégorie", value: project.category },
    { icon: HardHat, label: "Statut", value: project.status },
    ...(project.projectDate ? [{ icon: CalendarDays, label: "Année", value: project.projectDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) }] : []),
  ];

  return (
    <SiteShell>
      <main>
        <PageHero eyebrow={project.status} title={project.title} text={`${project.location} · ${project.category}`} image={project.images[0]?.url ?? null} />
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {project.images[0] && (
              <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-slate-100 shadow-2xl shadow-anthracite/15">
                <Image src={project.images[0].url} alt={project.images[0].alt ?? project.title} fill priority sizes="100vw" className="object-cover" />
              </div>
            )}

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.7fr_1fr]">
              <Reveal>
                <article>
                  <h2 className="display text-2xl uppercase text-anthracite md:text-3xl">Le projet</h2>
                  <div className="mt-6 whitespace-pre-wrap text-justify text-base leading-8 text-slate-600">{project.description}</div>
                </article>
              </Reveal>
              <Reveal delay={0.1}>
                <aside className="rounded-2xl border border-slate-200 bg-mist p-8">
                  <p className="text-xs font-bold tracking-[.2em] text-royal">CARACTÉRISTIQUES</p>
                  <dl className="mt-5 grid gap-5">
                    {meta.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white shadow-sm"><Icon className="h-4 w-4 text-royal" /></span>
                        <div>
                          <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</dt>
                          <dd className="text-sm font-semibold text-anthracite">{value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                  <Link href="/devis" className="focus-ring mt-7 block rounded-full bg-vinci px-6 py-3.5 text-center text-sm font-bold text-white shadow-md shadow-vinci/30 transition hover:bg-vinci-navy">
                    Un projet similaire ? Parlons-en <ArrowRight className="ml-1 inline h-4 w-4" />
                  </Link>
                </aside>
              </Reveal>
            </div>

            {project.images.length > 1 && (
              <div className="mt-16">
                <h2 className="display text-2xl uppercase text-anthracite md:text-3xl">Galerie</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {project.images.slice(1).map((image, index) => (
                    <div key={image.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-md">
                      <Image src={image.url} alt={image.alt ?? project.title} fill sizes="(max-width:768px) 100vw, 50vw" className={index % 3 === 0 ? "object-cover sm:col-span-2" : "object-cover"} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {related.length > 0 && (
          <section className="border-t border-slate-200 bg-mist py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="display text-3xl uppercase text-anthracite">Autres réalisations</h2>
                <Link href="/realisations" className="inline-flex items-center gap-2 text-sm font-bold text-royal transition hover:gap-3">
                  Toutes les réalisations <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => <ProjectCard key={item.slug} project={item} />)}
              </div>
            </div>
          </section>
        )}
      </main>
    </SiteShell>
  );
}
