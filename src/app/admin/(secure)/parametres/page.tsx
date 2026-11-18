import { Save } from "lucide-react";
import { saveSettings } from "@/app/admin/actions";
import { Field, inputClass, submitClass } from "@/components/admin/form-fields";
import { AdminHeader, SavedBanner } from "@/components/admin/ui";
import { UploadField } from "@/components/admin/upload-field";
import { prisma } from "@/lib/prisma";

export default async function Settings({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [settings, params] = await Promise.all([prisma.siteSettings.findUnique({ where: { id: 1 } }), searchParams]);
  return (
    <>
      <AdminHeader eyebrow="IDENTITÉ" title="Paramètres" text="Informations globales affichées dans le header, le footer et les pages de contact." />
      <SavedBanner saved={params.saved} />
      <form action={saveSettings} className="mt-8 grid max-w-4xl gap-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <section>
          <h2 className="text-sm font-black uppercase tracking-wider text-royal">Identité</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Nom commercial"><input className={inputClass} name="companyName" required defaultValue={settings?.companyName ?? "ETCS SARL"} /></Field>
            <Field label="Téléphone"><input className={inputClass} name="phone" required defaultValue={settings?.phone ?? ""} /></Field>
            <Field label="Email"><input className={inputClass} name="email" type="email" required defaultValue={settings?.email ?? ""} /></Field>
            <Field label="Adresse"><input className={inputClass} name="address" required defaultValue={settings?.address ?? ""} /></Field>
          </div>
        </section>
        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-sm font-black uppercase tracking-wider text-royal">Présentation</h2>
          <div className="mt-5 grid gap-5">
            <Field label="Texte de présentation" hint="Utilisé sur la page d'accueil et la page À propos"><textarea className={inputClass} name="aboutText" rows={7} defaultValue={settings?.aboutText ?? ""} /></Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <UploadField name="logoUrl" label="Logo" hint="Affiché dans l'en-tête et le pied de page — importez un fichier (PNG/JPEG/WebP/GIF, 5 Mo max.) ou collez une URL HTTPS." defaultValue={settings?.logoUrl ?? ""} />
              <UploadField name="heroImageUrl" label="Image principale" hint="Arrière-plan de l'accueil et bannières des pages — importez un fichier ou collez une URL HTTPS." defaultValue={settings?.heroImageUrl ?? ""} />
            </div>
          </div>
        </section>
        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-sm font-black uppercase tracking-wider text-royal">Chiffres clés</h2>
          <div className="mt-5 grid gap-5">
            <Field
              label="Statistiques affichées sur l'accueil (JSON)"
              hint='Format : [{"label":"Projets réalisés","value":"120"},{"label":"Collaborateurs","value":"45"}] — laissée vide, la section est masquée.'
            >
              <textarea className={inputClass} name="keyStats" rows={5} defaultValue={settings?.keyStats ? JSON.stringify(settings.keyStats, null, 2) : ""} />
            </Field>
          </div>
        </section>
        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-sm font-black uppercase tracking-wider text-royal">Carte & réseaux</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Carte Google Maps / OpenStreetMap (URL HTTPS)" hint="Lien d'intégration (embed). Laissée vide, la carte est masquée sur la page Contact."><input className={inputClass} name="mapEmbedUrl" type="url" defaultValue={settings?.mapEmbedUrl ?? ""} /></Field>
            <Field label='Liens sociaux (JSON, par exemple {"linkedin":"https://..."} )'><textarea className={inputClass} name="socialLinks" rows={4} defaultValue={settings?.socialLinks ? JSON.stringify(settings.socialLinks, null, 2) : ""} /></Field>
          </div>
        </section>
        <div className="border-t border-slate-100 pt-8">
          <button type="submit" className={submitClass}><Save className="h-4 w-4" />Enregistrer les paramètres</button>
        </div>
      </form>
    </>
  );
}
