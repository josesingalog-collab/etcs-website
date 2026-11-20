import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TeamMember } from "@prisma/client";
import { saveTeamMember } from "@/app/admin/actions";
import { Field, inputClass } from "@/components/admin/form-fields";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/submit-button";

export function TeamForm({ member }: { member?: TeamMember }) {
  return (
    <>
      <header>
        <Link href="/admin/equipe" className="inline-flex items-center gap-2 text-sm font-bold text-royal transition hover:gap-3"><ArrowLeft className="h-4 w-4" />Équipe</Link>
        <h1 className="display mt-4 text-4xl uppercase leading-none">{member ? "Modifier le membre" : "Nouveau membre"}</h1>
      </header>
      <form action={saveTeamMember} className="mt-8 grid max-w-3xl gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <input type="hidden" name="id" value={member?.id ?? ""} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nom complet"><input className={inputClass} name="name" required defaultValue={member?.name} /></Field>
          <Field label="Fonction" hint="Ex. Directeur technique"><input className={inputClass} name="role" required defaultValue={member?.role} /></Field>
        </div>
        <Field label="Bio (optionnel)" hint="Une phrase sur la personne, visible dans la carte"><textarea className={inputClass} name="bio" rows={3} defaultValue={member?.bio ?? ""} /></Field>
        <div className="grid gap-5 border-t border-slate-100 pt-8 sm:grid-cols-2">
          <UploadField name="photo" label="Photo" hint="Portrait au format vertical de préférence. Importez un fichier ou collez une URL HTTPS." defaultValue={member?.photo ?? ""} />
          <Field label="Ordre d'affichage" hint="Les plus petits numéros s'affichent en premier"><input className={inputClass} name="position" type="number" min={0} max={999} defaultValue={member?.position ?? 0} /></Field>
        </div>
        <Field label="Visibilité">
          <select className={inputClass} name="publicationStatus" defaultValue={member?.publicationStatus ?? "PUBLISHED"}>
            <option value="PUBLISHED">Publié</option>
            <option value="DRAFT">Brouillon</option>
          </select>
        </Field>
        <SubmitButton />
      </form>
    </>
  );
}
