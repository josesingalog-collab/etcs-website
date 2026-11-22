import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Project, ProjectImage, Service, Article } from "@prisma/client";

export function ProjectCard({ project, priority = false, featured = false, ctaLabel = "Voir le projet" }: { project: Project & { images: ProjectImage[] }; priority?: boolean; featured?: boolean; ctaLabel?: string }) {
  const cover = project.images[0];
  return (
    <Link href={`/realisations/${project.slug}`} className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className={`relative overflow-hidden bg-slate-100 ${featured ? "min-h-[260px] grow md:min-h-[320px]" : "aspect-[4/3]"}`}>
        {cover ? (
          <Image src={cover.url} alt={cover.alt ?? project.title} fill priority={priority} sizes={featured ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"} className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid-lines h-full w-full bg-anthracite/90" />
        )}
        <span className="absolute left-4 top-4 rounded-md bg-anthracite/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-gold backdrop-blur">{project.category}</span>
      </div>
      <div className="flex grow flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-semibold text-slate-500"><MapPin className="h-3.5 w-3.5 text-royal" />{project.location}</p>
        <h3 className="mt-2 text-lg font-extrabold leading-snug text-anthracite transition group-hover:text-royal">{project.title}</h3>
        <span className="mt-3 block" aria-hidden="true" />
        <p className="mt-3 line-clamp-2 grow text-sm leading-6 text-slate-500">{project.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-royal">
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link href={`/services/${service.slug}`} className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-royal/40">
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        {service.image ? (
          <Image src={service.image} alt={service.title} fill sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-royal-deep via-royal to-royal-deep">
            <span className="grid-lines absolute inset-0 opacity-30" aria-hidden="true" />
            <span className="display relative text-6xl text-gold/90">{String(index + 1).padStart(2, "0")}</span>
          </div>
        )}
      </div>
      <div className="flex grow flex-col p-6">
        <span className="text-[10px] font-bold uppercase tracking-[.18em] text-royal">EXPERTISE {String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-2 text-lg font-extrabold leading-snug text-anthracite transition group-hover:text-royal">{service.title}</h3>
      <span className="mt-3 block" aria-hidden="true" />
      <p className="mt-3 line-clamp-3 grow text-sm leading-6 text-slate-500">{service.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-royal">
          En savoir plus <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link href={`/actualites/${article.slug}`} className={`card-hover group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${featured ? "md:row-span-2 md:grid md:grid-rows-[auto_1fr]" : ""}`}>
      <div className={`relative overflow-hidden bg-slate-100 ${featured ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
        {article.coverImage ? (
          <Image src={article.coverImage} alt={article.title} fill sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid-lines h-full w-full bg-royal-deep" />
        )}
      </div>
      <div className="flex grow flex-col p-6">
        <time className="text-xs font-bold uppercase tracking-wider text-royal" dateTime={article.publishedAt?.toISOString()}>
          {article.publishedAt ? article.publishedAt.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "À paraître"}
        </time>
        <h3 className="mt-2 text-lg font-extrabold leading-snug text-anthracite transition group-hover:text-royal">{article.title}</h3>
        <p className="mt-2 line-clamp-3 grow text-sm leading-6 text-slate-500">{article.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-royal">
          Lire l&apos;article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
