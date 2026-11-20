import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { savePageContent } from "@/app/admin/actions";
import { Field, inputClass } from "@/components/admin/form-fields";
import { RepeaterField } from "@/components/admin/repeater";
import { UploadField } from "@/components/admin/upload-field";
import { AdminHeader, SavedBanner } from "@/components/admin/ui";
import { SubmitButton } from "@/components/submit-button";
import { defaultPageContent, getPageContent, labelList, pageKeys, pageMetas, type PageKey } from "@/lib/page-content";

type Props = { params: Promise<{ page: string }>; searchParams: Promise<{ saved?: string }> };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-slate-100 pt-8">
      <h2 className="text-sm font-black uppercase tracking-wider text-royal">{title}</h2>
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}

const listFields = (valueFields: { name: string; label: string; type?: "text" | "textarea" }[]) => valueFields;

export default async function PageContentEditor({ params, searchParams }: Props) {
  const [{ page: rawPage }, query] = await Promise.all([params, searchParams]);
  if (!pageKeys.includes(rawPage as PageKey)) notFound();
  const page = rawPage as PageKey;
  const meta = pageMetas.find((entry) => entry.key === page)!;
  const content = await getPageContent(page);
  const defaults = defaultPageContent[page] as Record<string, unknown>;
  const value = (key: string) => {
    const current = (content as unknown as Record<string, unknown>)[key];
    return typeof current === "string" ? current : String(defaults[key] ?? "");
  };
  const list = (key: string) => (content as unknown as Record<string, unknown>)[key];

  return (
    <>
      <Link href="/admin/contenus" className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-royal transition hover:gap-3"><ArrowLeft className="h-4 w-4" />Contenus des pages</Link>
      <AdminHeader eyebrow="CONTENUS" title={meta.label} text={meta.description} />
      <SavedBanner saved={query.saved} />
      <Link href={meta.publicPath} target="_blank" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-royal">
        <ExternalLink className="h-4 w-4" />Voir la page publique
      </Link>
      <form action={savePageContent} className="mt-5 grid max-w-4xl gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <input type="hidden" name="page" value={page} />

        {page === "home" && (
          <>
            <Section title="Bannière d'accueil">
              <Field label="Titre principal" hint="Un retour à la ligne crée un saut de ligne visuel">
                <textarea className={inputClass} name="heroTitle" rows={3} defaultValue={value("heroTitle")} />
              </Field>
              <UploadField name="heroImage" label="Image de la bannière" hint="Importez un fichier (PNG/JPEG/WebP, 5 Mo max.) ou collez une URL HTTPS." defaultValue={value("heroImage")} />
              <Field label="Texte d'introduction" hint="Affiché sous le titre. Laisser vide pour utiliser le texte de présentation des Paramètres.">
                <textarea className={inputClass} name="introText" rows={4} defaultValue={value("introText")} />
              </Field>
            </Section>
            <Section title="Présentation (qui sommes-nous ?)">
              <Field label="Titre de section"><input className={inputClass} name="presentationTitle" defaultValue={value("presentationTitle")} /></Field>
              <UploadField name="presentationImage" label="Photo de présentation" defaultValue={value("presentationImage")} />
              <RepeaterField
                name="strengths"
                label="Points forts"
                addLabel="Ajouter un point fort"
                itemTitleKey="label"
                fields={listFields([{ name: "label", label: "Intitulé" }])}
                items={labelList(list("strengths"))}
              />
            </Section>
            <Section title="Domaines d'expertise (affiché si aucun service publié)">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Sur-titre"><input className={inputClass} name="domainsEyebrow" defaultValue={value("domainsEyebrow")} /></Field>
                <Field label="Titre"><input className={inputClass} name="domainsTitle" defaultValue={value("domainsTitle")} /></Field>
              </div>
              <Field label="Texte d'introduction"><textarea className={inputClass} name="domainsText" rows={3} defaultValue={value("domainsText")} /></Field>
              <RepeaterField
                name="features"
                label="Cartes d'expertise"
                addLabel="Ajouter une carte"
                itemTitleKey="title"
                fields={listFields([{ name: "title", label: "Titre" }, { name: "text", label: "Texte", type: "textarea" }])}
                items={list("features") as { title: string; text: string }[]}
              />
            </Section>
            <Section title="Réalisations">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Sur-titre"><input className={inputClass} name="projectsEyebrow" defaultValue={value("projectsEyebrow")} /></Field>
                <Field label="Titre"><input className={inputClass} name="projectsTitle" defaultValue={value("projectsTitle")} /></Field>
              </div>
              <Field label="Texte d'introduction"><textarea className={inputClass} name="projectsText" rows={3} defaultValue={value("projectsText")} /></Field>
            </Section>
            <Section title="Notre engagement">
              <Field label="Titre de section"><input className={inputClass} name="engagementTitle" defaultValue={value("engagementTitle")} /></Field>
              <Field label="Texte d'introduction"><textarea className={inputClass} name="engagementText" rows={3} defaultValue={value("engagementText")} /></Field>
              <UploadField name="engagementImage" label="Photo de la section" defaultValue={value("engagementImage")} />
              <RepeaterField
                name="commitments"
                label="Engagements"
                addLabel="Ajouter un engagement"
                itemTitleKey="title"
                fields={listFields([{ name: "title", label: "Titre" }, { name: "text", label: "Texte", type: "textarea" }])}
                items={list("commitments") as { title: string; text: string }[]}
              />
            </Section>
            <Section title="Citation">
              <Field label="Citation"><textarea className={inputClass} name="quote" rows={3} defaultValue={value("quote")} /></Field>
              <Field label="Signataire"><input className={inputClass} name="quoteAuthor" defaultValue={value("quoteAuthor")} /></Field>
              <UploadField name="convictionImage" label="Photo de fond de la citation" defaultValue={value("convictionImage")} />
            </Section>
            <Section title="Présentation & actualités">
              <Field label="Titre de la section présence"><input className={inputClass} name="presenceTitle" defaultValue={value("presenceTitle")} /></Field>
              <Field label="Texte de la section présence"><textarea className={inputClass} name="presenceText" rows={4} defaultValue={value("presenceText")} /></Field>
              <Field label="Titre de la section actualités"><input className={inputClass} name="newsTitle" defaultValue={value("newsTitle")} /></Field>
            </Section>
            <Section title="Appel à l'action final">
              <Field label="Titre"><input className={inputClass} name="ctaTitle" defaultValue={value("ctaTitle")} /></Field>
              <Field label="Texte"><textarea className={inputClass} name="ctaText" rows={3} defaultValue={value("ctaText")} /></Field>
            </Section>
          </>
        )}

        {page === "about" && (
          <>
            <Section title="Bannière">
              <Field label="Sur-titre"><input className={inputClass} name="heroEyebrow" defaultValue={value("heroEyebrow")} /></Field>
              <Field label="Titre"><input className={inputClass} name="heroTitle" defaultValue={value("heroTitle")} /></Field>
              <Field label="Texte"><textarea className={inputClass} name="heroText" rows={2} defaultValue={value("heroText")} /></Field>
              <UploadField name="heroImage" label="Photo de la bannière" hint="Laisser vide pour utiliser l'image principale des Paramètres." defaultValue={value("heroImage")} />
            </Section>
            <Section title="Introduction">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Sur-titre"><input className={inputClass} name="introEyebrow" defaultValue={value("introEyebrow")} /></Field>
                <Field label="Titre"><input className={inputClass} name="introTitle" defaultValue={value("introTitle")} /></Field>
              </div>
              <Field label="Texte" hint="Un saut de ligne simple conserve le retour à la ligne"><textarea className={inputClass} name="introText" rows={6} defaultValue={value("introText")} /></Field>
              <UploadField name="introImage" label="Photo de la section" defaultValue={value("introImage")} />
              <RepeaterField
                name="introValues"
                label="Valeurs mises en avant"
                addLabel="Ajouter une valeur"
                itemTitleKey="title"
                fields={listFields([{ name: "title", label: "Mot-clé (ex. Rigueur)" }, { name: "text", label: "Complément" }])}
                items={list("introValues") as { title: string; text: string }[]}
              />
            </Section>
            <Section title="Mission, vision et valeurs">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Sur-titre"><input className={inputClass} name="pillarsEyebrow" defaultValue={value("pillarsEyebrow")} /></Field>
                <Field label="Titre"><input className={inputClass} name="pillarsTitle" defaultValue={value("pillarsTitle")} /></Field>
              </div>
              <RepeaterField
                name="pillars"
                label="Cartes institutionnelles"
                addLabel="Ajouter une carte"
                itemTitleKey="title"
                fields={listFields([{ name: "title", label: "Titre" }, { name: "text", label: "Texte", type: "textarea" }])}
                items={list("pillars") as { title: string; text: string }[]}
              />
            </Section>
            <Section title="Équipe">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Sur-titre"><input className={inputClass} name="teamEyebrow" defaultValue={value("teamEyebrow")} /></Field>
                <Field label="Titre"><input className={inputClass} name="teamTitle" defaultValue={value("teamTitle")} /></Field>
              </div>
              <p className="text-xs text-slate-500">Les membres de l&apos;équipe se gèrent dans la rubrique « Équipe » du menu.</p>
            </Section>
            <Section title="Partenaires">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Sur-titre"><input className={inputClass} name="partnersEyebrow" defaultValue={value("partnersEyebrow")} /></Field>
                <Field label="Titre"><input className={inputClass} name="partnersTitle" defaultValue={value("partnersTitle")} /></Field>
              </div>
              <Field label="Texte d'introduction"><textarea className={inputClass} name="partnersText" rows={2} defaultValue={value("partnersText")} /></Field>
              <RepeaterField
                name="partners"
                label="Noms des partenaires"
                addLabel="Ajouter un partenaire"
                itemTitleKey="label"
                fields={listFields([{ name: "label", label: "Nom" }])}
                items={labelList(list("partners"))}
              />
            </Section>
            <Section title="Centre de formations">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Sur-titre"><input className={inputClass} name="trainingEyebrow" defaultValue={value("trainingEyebrow")} /></Field>
                <Field label="Titre"><input className={inputClass} name="trainingTitle" defaultValue={value("trainingTitle")} /></Field>
              </div>
              <Field label="Texte"><textarea className={inputClass} name="trainingText" rows={4} defaultValue={value("trainingText")} /></Field>
              <RepeaterField
                name="trainingPoints"
                label="Points du programme"
                addLabel="Ajouter un point"
                itemTitleKey="label"
                fields={listFields([{ name: "label", label: "Point" }])}
                items={labelList(list("trainingPoints"))}
              />
              <RepeaterField
                name="trainingModules"
                label="Modules proposés"
                addLabel="Ajouter un module"
                itemTitleKey="label"
                fields={listFields([{ name: "label", label: "Module" }])}
                items={labelList(list("trainingModules"))}
              />
            </Section>
            <Section title="Qualité & expertise">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Sur-titre"><input className={inputClass} name="qualityEyebrow" defaultValue={value("qualityEyebrow")} /></Field>
                <Field label="Titre"><input className={inputClass} name="qualityTitle" defaultValue={value("qualityTitle")} /></Field>
              </div>
              <Field label="Texte" hint="Une ligne vide sépare deux paragraphes"><textarea className={inputClass} name="qualityText" rows={5} defaultValue={value("qualityText")} /></Field>
              <Field label="Titre de l'encadré"><input className={inputClass} name="qualityAsideTitle" defaultValue={value("qualityAsideTitle")} /></Field>
              <RepeaterField
                name="qualityPoints"
                label="Points du contrôle qualité"
                addLabel="Ajouter un point"
                itemTitleKey="label"
                fields={listFields([{ name: "label", label: "Point" }])}
                items={labelList(list("qualityPoints"))}
              />
            </Section>
            <Section title="Appel à l'action final">
              <Field label="Titre"><input className={inputClass} name="ctaTitle" defaultValue={value("ctaTitle")} /></Field>
              <Field label="Texte"><textarea className={inputClass} name="ctaText" rows={3} defaultValue={value("ctaText")} /></Field>
            </Section>
          </>
        )}

        {page === "services" && (
          <>
            <Section title="Bannière">
              <Field label="Sur-titre"><input className={inputClass} name="heroEyebrow" defaultValue={value("heroEyebrow")} /></Field>
              <Field label="Titre principal"><input className={inputClass} name="heroTitle" defaultValue={value("heroTitle")} /></Field>
              <Field label="Texte d'introduction"><textarea className={inputClass} name="heroText" rows={3} defaultValue={value("heroText")} /></Field>
              <UploadField name="heroImage" label="Photo de la bannière" defaultValue={value("heroImage")} />
            </Section>
            <Section title="Phrase d'accroche">
              <Field label="Texte mis en avant"><textarea className={inputClass} name="statement" rows={4} defaultValue={value("statement")} /></Field>
            </Section>
            <Section title="Approche sur mesure">
              <Field label="Sur-titre"><input className={inputClass} name="customEyebrow" defaultValue={value("customEyebrow")} /></Field>
              <Field label="Titre"><input className={inputClass} name="customTitle" defaultValue={value("customTitle")} /></Field>
              <Field label="Texte"><textarea className={inputClass} name="customText" rows={3} defaultValue={value("customText")} /></Field>
            </Section>
            <Section title="Appel à l'action final">
              <Field label="Titre"><input className={inputClass} name="ctaTitle" defaultValue={value("ctaTitle")} /></Field>
              <Field label="Texte"><textarea className={inputClass} name="ctaText" rows={3} defaultValue={value("ctaText")} /></Field>
            </Section>
            <p className="text-xs text-slate-500">La liste des services se gère dans la rubrique « Services » du menu.</p>
          </>
        )}

        {page === "contact" && (
          <>
            <Section title="Bannière">
              <Field label="Sur-titre"><input className={inputClass} name="heroEyebrow" defaultValue={value("heroEyebrow")} /></Field>
              <Field label="Titre"><input className={inputClass} name="heroTitle" defaultValue={value("heroTitle")} /></Field>
              <Field label="Texte"><textarea className={inputClass} name="heroText" rows={2} defaultValue={value("heroText")} /></Field>
            </Section>
            <Section title="Horaires">
              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Libellé"><input className={inputClass} name="hoursLabel" defaultValue={value("hoursLabel")} /></Field>
                <Field label="Horaires"><input className={inputClass} name="hours" defaultValue={value("hours")} /></Field>
                <Field label="Lieu"><input className={inputClass} name="hoursLocation" defaultValue={value("hoursLocation")} /></Field>
              </div>
            </Section>
            <Section title="Formulaire">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Sur-titre"><input className={inputClass} name="formEyebrow" defaultValue={value("formEyebrow")} /></Field>
                <Field label="Titre"><input className={inputClass} name="formTitle" defaultValue={value("formTitle")} /></Field>
              </div>
            </Section>
            <p className="text-xs text-slate-500">Les coordonnées (adresse, téléphone, email, carte) se règlent dans « Paramètres ».</p>
          </>
        )}

        {page === "quote" && (
          <>
            <Section title="Bannière">
              <Field label="Sur-titre"><input className={inputClass} name="heroEyebrow" defaultValue={value("heroEyebrow")} /></Field>
              <Field label="Titre"><input className={inputClass} name="heroTitle" defaultValue={value("heroTitle")} /></Field>
              <Field label="Texte"><textarea className={inputClass} name="heroText" rows={2} defaultValue={value("heroText")} /></Field>
            </Section>
            <Section title="Processus">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Titre de la section"><input className={inputClass} name="stepsTitle" defaultValue={value("stepsTitle")} /></Field>
              </div>
              <Field label="Texte d'introduction"><textarea className={inputClass} name="stepsText" rows={3} defaultValue={value("stepsText")} /></Field>
              <RepeaterField
                name="steps"
                label="Étapes"
                addLabel="Ajouter une étape"
                itemTitleKey="title"
                fields={listFields([{ name: "title", label: "Titre" }, { name: "text", label: "Texte", type: "textarea" }])}
                items={list("steps") as { title: string; text: string }[]}
              />
            </Section>
            <Section title="Bandeau final">
              <Field label="Sur-titre"><input className={inputClass} name="bannerEyebrow" defaultValue={value("bannerEyebrow")} /></Field>
              <Field label="Titre"><input className={inputClass} name="bannerTitle" defaultValue={value("bannerTitle")} /></Field>
              <Field label="Libellé du bouton"><input className={inputClass} name="bannerCtaLabel" defaultValue={value("bannerCtaLabel")} /></Field>
            </Section>
          </>
        )}

        {page === "footer" && (
          <Section title="Présentation du pied de page">
            <Field label="Texte de présentation" hint="Affiché sous le logo dans le footer de toutes les pages">
              <textarea className={inputClass} name="aboutText" rows={4} defaultValue={value("aboutText")} />
            </Field>
          </Section>
        )}

        <div className="border-t border-slate-100 pt-8">
          <SubmitButton label={`Enregistrer : ${meta.label}`} />
        </div>
      </form>
    </>
  );
}
