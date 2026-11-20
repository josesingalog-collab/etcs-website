import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { AdminHeader } from "@/components/admin/ui";
import { pageMetas } from "@/lib/page-content";

export default function ContenusIndex() {
  return (
    <>
      <AdminHeader eyebrow="SITE PUBLIC" title="Contenus des pages" text="Modifiez les textes, images et listes affichés sur les pages publiques du site." />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pageMetas.map((meta) => (
          <Link
            key={meta.key}
            href={`/admin/contenus/${meta.key}`}
            className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-royal/50 hover:shadow-md"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal/10 text-royal">
              <FileText className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-base font-extrabold text-anthracite">{meta.label}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{meta.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-royal transition group-hover:gap-3">
              Modifier <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
