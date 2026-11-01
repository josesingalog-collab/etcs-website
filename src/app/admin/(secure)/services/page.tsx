import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { deleteService } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { AdminHeader, SavedBanner, PublicationBadge } from "@/components/admin/ui";

export default async function ServicesAdmin({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [services, params] = await Promise.all([
    prisma.service.findMany({ orderBy: { updatedAt: "desc" } }),
    searchParams,
  ]);
  return (
    <>
      <AdminHeader eyebrow="OFFRE" title="Services" text="Domaines d'expertise diffusés dans la section Services du site." actionLabel="Nouveau service" actionHref="/admin/services/nouveau" />
      <SavedBanner saved={params.saved} />
      <div className="mt-8 grid gap-4">
        {services.map((service) => (
          <article key={service.id} className="card-hover flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex min-w-0 items-center gap-4">
              {service.image && (
                <span className="relative hidden h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:block">
                  <Image src={service.image} alt="" fill sizes="80px" className="object-cover" />
                </span>
              )}
              <div className="min-w-0">
                <h2 className="truncate font-bold text-anthracite">{service.title}</h2>
                <p className="mt-1 text-xs text-slate-500">/services/{service.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PublicationBadge status={service.publicationStatus} />
              <div className="flex items-center gap-2">
                <Link href={`/admin/services/${service.id}`} className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-royal transition hover:bg-royal-50"><Pencil className="h-3.5 w-3.5" />Modifier</Link>
                <ConfirmDelete action={deleteService} id={service.id} label={service.title} />
              </div>
            </div>
          </article>
        ))}
        {services.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-sm text-slate-500">Aucun service enregistré. Créez le premier avec « Nouveau service ».</p>}
      </div>
    </>
  );
}
