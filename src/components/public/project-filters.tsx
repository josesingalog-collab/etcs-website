"use client";

import { useMemo, useState } from "react";
import { Project, ProjectImage } from "@prisma/client";
import { SlidersHorizontal } from "lucide-react";
import { ProjectCard } from "@/components/public/cards";

export function ProjectGallery({ projects }: { projects: (Project & { images: ProjectImage[] })[] }) {
  const categories = useMemo(
    () => Array.from(new Set(projects.map((project) => project.category.trim()))).sort((a, b) => a.localeCompare(b, "fr")),
    [projects]
  );
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? projects.filter((project) => project.category.trim() === active) : projects;

  if (categories.length <= 1) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index === 0} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center gap-3" role="group" aria-label="Filtrer par catégorie">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <SlidersHorizontal className="h-4 w-4 text-royal" />Filtres :
        </span>
        <button
          type="button"
          onClick={() => setActive(null)}
          aria-pressed={active === null}
          className={`rounded-full border px-5 py-2 text-sm font-bold transition ${active === null ? "border-royal bg-royal text-white shadow-md shadow-royal/25" : "border-slate-300 bg-white text-anthracite hover:border-royal hover:text-royal"}`}
        >
          Tous
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(active === category ? null : category)}
            aria-pressed={active === category}
            className={`rounded-full border px-5 py-2 text-sm font-bold transition ${active === category ? "border-royal bg-royal text-white shadow-md shadow-royal/25" : "border-slate-300 bg-white text-anthracite hover:border-royal hover:text-royal"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index === 0} />
        ))}
      </div>
    </>
  );
}
