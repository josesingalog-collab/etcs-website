import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { deleteTeamMember } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { AdminHeader, SavedBanner, PublicationBadge } from "@/components/admin/ui";

export const instant = false;

export default async function TeamAdmin({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [members, params] = await Promise.all([
    prisma.teamMember.findMany({ orderBy: [{ position: "asc" }, { name: "asc" }] }),
    searchParams,
  ]);
  return (
    <>
      <AdminHeader eyebrow="SOCIÉTÉ" title="Équipe" text="Les personnes affichées dans la section « Notre équipe » de la page À propos." actionLabel="Nouveau membre" actionHref="/admin/equipe/nouveau" />
      <SavedBanner saved={params.saved} />
      <div className="mt-8 grid gap-4">
        {members.map((member) => (
          <article key={member.id} className="card-hover flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex min-w-0 items-center gap-4">
              {member.photo ? (
                <span className="relative hidden h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100 sm:block">
                  <Image src={member.photo} alt="" fill sizes="56px" className="object-cover" />
                </span>
              ) : (
                <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-full bg-royal-deep text-sm font-black text-gold sm:grid">{member.name.slice(0, 2).toUpperCase()}</span>
              )}
              <div className="min-w-0">
                <h2 className="truncate font-bold text-anthracite">{member.name}</h2>
                <p className="mt-1 truncate text-xs text-slate-500">{member.role} · position {member.position}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PublicationBadge status={member.publicationStatus} />
              <div className="flex items-center gap-2">
                <Link href={`/admin/equipe/${member.id}`} className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-royal transition hover:bg-royal-50"><Pencil className="h-3.5 w-3.5" />Modifier</Link>
                <ConfirmDelete action={deleteTeamMember} id={member.id} label={member.name} />
              </div>
            </div>
          </article>
        ))}
        {members.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-sm text-slate-500">Aucun membre enregistré. Ajoutez le premier avec « Nouveau membre ».</p>}
      </div>
    </>
  );
}
