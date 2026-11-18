import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Service } from "@prisma/client";
import { saveService } from "@/app/admin/actions";
import { Field, inputClass } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/submit-button";

export function ServiceForm({ service }: { service?: Service }) {
  return (
    <>
      <header>
        <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm font-bold text-royal transition hover:gap-3"><ArrowLeft className="h-4 w-4" />Services</Link>
        <h1 className="display mt-4 text-4xl uppercase leading-none">{service ? "Modifier le service" : "Nouveau service"}</h1>
      </header>
      <form action={saveService} className="mt-8 grid max-w-3xl gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <input type="hidden" name="id" value={service?.id ?? ""} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Titre"><input className={inputClass} name="title" required defaultValue={service?.title} /></Field>
          <Field label="Identifiant URL" hint="Lettres minuscules, chiffres et tirets uniquement"><input className={inputClass} name="slug" required pattern="[a-z0-9-]+" defaultValue={service?.slug} /></Field>
        </div>
        <Field label="Résumé" hint="Visible dans les cartes du site public"><textarea className={inputClass} name="excerpt" rows={3} required defaultValue={service?.excerpt} /></Field>
        <Field label="Description"><textarea className={inputClass} name="description" rows={9} required defaultValue={service?.description} /></Field>
        <div className="grid gap-5 border-t border-slate-100 pt-8 sm:grid-cols-2">
          <Field label="Image (URL HTTPS)"><input className={inputClass} name="image" type="url" defaultValue={service?.image ?? ""} /></Field>
          <Field label="Visibilité">
            <select className={inputClass} name="publicationStatus" defaultValue={service?.publicationStatus ?? "DRAFT"}>
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publié</option>
            </select>
          </Field>
        </div>
        <SubmitButton />
      </form>
    </>
  );
}
