import Link from "next/link";
import Image from "next/image";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { deleteProject } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { AdminHeader, SavedBanner, PublicationBadge } from "@/components/admin/ui";

export default async function ProjectsAdmin({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [projects, params] = await Promise.all([
    prisma.project.findMany({ include: { images: { orderBy: { position: "asc" }, take: 1 } }, orderBy: { updatedAt: "desc" } }),
    searchParams,
  ]);
  return (
    <>
      <AdminHeader eyebrow="CONTENU" title="Réalisations" text="Portfolio des projets présentés sur le site public." actionLabel="Nouvelle réalisation" actionHref="/admin/realisations/nouveau" />
      <SavedBanner saved={params.saved} />
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-mist text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-4">Projet</th>
              <th className="hidden px-5 py-4 md:table-cell">Catégorie</th>
              <th className="px-5 py-4">État</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-slate-100 transition hover:bg-royal-50/40">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    {project.images[0] ? (
                      <span className="relative block h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <Image src={project.images[0].url} alt="" fill sizes="64px" className="object-cover" />
                      </span>
                    ) : (
                      <span className="block h-12 w-16 shrink-0 rounded-lg bg-slate-100" />
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-anthracite">{project.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{project.location}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-5 py-4 text-slate-600 md:table-cell">{project.category}</td>
                <td className="px-5 py-4"><PublicationBadge status={project.publicationStatus} /></td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/realisations/${project.id}`} className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-royal transition hover:bg-royal-50">Modifier</Link>
                    <ConfirmDelete action={deleteProject} id={project.id} label={project.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && <p className="px-5 py-10 text-center text-sm text-slate-500">Aucune réalisation enregistrée. Créez la première avec « Nouvelle réalisation ».</p>}
      </div>
    </>
  );
}
