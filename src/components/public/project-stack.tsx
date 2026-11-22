import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/public/reveal";
import type { Project } from "@prisma/client";

type ProjectWithImage = Project & { images: { url: string; alt?: string | null }[] };

/** Cartes projets empilées au défilement (sticky), carte blanche posée sur grande image, alternées. */
export function ProjectStack({ projects }: { projects: ProjectWithImage[] }) {
  return (
    <div className="mx-auto mt-14 grid max-w-5xl gap-10">
      {projects.map((project, index) => {
        const image = project.images[0]?.url;
        const reversed = index % 2 === 1;
        return (
          <div key={project.slug} className="lg:sticky lg:top-24" style={{ zIndex: index + 1, marginBottom: "2.5rem" }}>
            <Reveal>
              <article className={`relative grid items-end gap-0 md:grid-cols-[1.3fr_1fr] ${reversed ? "md:[direction:rtl]" : ""}`}>
                <div className="relative aspect-[16/10] w-full overflow-hidden md:[direction:ltr]" style={{ borderRadius: "2rem", clipPath: reversed ? "polygon(0 0, 100% 0, 100% 100%, 64px 100%, 0 calc(100% - 64px))" : "polygon(0 0, calc(100% - 64px) 0, 100% calc(100% - 64px), 100% 100%, 0 100%)" }}>
                  {image ? (
                    <Image src={image} alt={project.images[0]?.alt ?? project.title} fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center bg-mist"><span className="display text-5xl text-slate-300">{String(index + 1).padStart(2, "0")}</span></div>
                  )}
                </div>
                <div className={`relative z-10 mx-4 -mt-16 rounded-3xl bg-white p-6 shadow-xl shadow-black/10 md:mx-0 md:mb-10 md:-mt-0 md:shadow-2xl md:[direction:ltr] ${reversed ? "md:-mr-10 md:rounded-l-[2rem]" : "md:-ml-10 md:rounded-r-[2rem]"} md:rounded-b-[2rem] md:rounded-tl-[2rem] md:rounded-tr-[2rem]`}>
                  <p className="text-[11px] font-extrabold uppercase tracking-[.18em]" style={{ color: "var(--plan-accent)" }}>{project.category}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{project.location}</p>
                  <h3 className="display mt-3 text-2xl leading-tight text-anthracite">{project.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{project.description}</p>
                  <Link href={`/realisations/${project.slug}`} className="focus-ring mt-5 inline-flex items-center gap-3 rounded-full py-2 pl-5 pr-2 text-sm font-bold text-white transition hover:gap-4" style={{ backgroundColor: "var(--plan-accent)" }}>
                    Découvrir le projet
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-black/15" aria-hidden="true">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
