import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Project, ProjectImage } from "@prisma/client";
import { saveProject } from "@/app/admin/actions";
import { Field, inputClass } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/submit-button";

export function ProjectForm({ project }: { project?: Project & { images: ProjectImage[] } }) {
  const date = project?.projectDate?.toISOString().slice(0, 10) ?? "";
  return (
    <>
      <header>
        <Link href="/admin/realisations" className="inline-flex items-center gap-2 text-sm font-bold text-royal transition hover:gap-3"><ArrowLeft className="h-4 w-4" />Réalisations</Link>
        <h1 className="display mt-4 text-4xl uppercase leading-none">{project ? "Modifier la réalisation" : "Nouvelle réalisation"}</h1>
      </header>
      <form action={saveProject} className="mt-8 grid max-w-3xl gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <input type="hidden" name="id" value={project?.id ?? ""} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Titre"><input className={inputClass} name="title" required defaultValue={project?.title} /></Field>
          <Field label="Identifiant URL" hint="Lettres minuscules, chiffres et tirets uniquement"><input className={inputClass} name="slug" required pattern="[a-z0-9-]+" defaultValue={project?.slug} /></Field>
          <Field label="Localisation"><input className={inputClass} name="location" required defaultValue={project?.location} /></Field>
          <Field label="Catégorie" hint="Sert aussi de filtre sur le site public"><input className={inputClass} name="category" required defaultValue={project?.category} /></Field>
          <Field label="Statut du chantier"><input className={inputClass} name="status" required defaultValue={project?.status} /></Field>
          <Field label="Date"><input className={inputClass} type="date" name="projectDate" defaultValue={date} /></Field>
        </div>
        <Field label="Description"><textarea className={inputClass} name="description" rows={7} required defaultValue={project?.description} /></Field>
        <div className="grid gap-5 border-t border-slate-100 pt-8 sm:grid-cols-2">
          <Field label="Photographies (une URL HTTPS par ligne)" hint="Astuce : importez d'abord une image via un champ « Importer » (par ex. Paramètres), puis copiez l'URL obtenue ici.">
            <textarea className={inputClass} name="imageUrls" rows={5} defaultValue={project?.images.map((image) => image.url).join("\n")} />
          </Field>
          <Field label="Visibilité">
            <select className={inputClass} name="publicationStatus" defaultValue={project?.publicationStatus ?? "DRAFT"}>
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publié</option>
            </select>
          </Field>
        </div>
        <p className="text-xs leading-5 text-slate-500">Les images sont référencées par URL HTTPS afin de rester compatibles avec un stockage objet de production. Les URLs non sécurisées sont refusées.</p>
        <SubmitButton />
      </form>
    </>
  );
}
