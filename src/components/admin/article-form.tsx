import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Article } from "@prisma/client";
import { saveArticle } from "@/app/admin/actions";
import { Field, inputClass, submitClass } from "@/components/admin/form-fields";

export function ArticleForm({ article }: { article?: Article }) {
  const date = article?.publishedAt?.toISOString().slice(0, 10) ?? "";
  return (
    <>
      <header>
        <Link href="/admin/actualites" className="inline-flex items-center gap-2 text-sm font-bold text-royal transition hover:gap-3"><ArrowLeft className="h-4 w-4" />Actualités</Link>
        <h1 className="display mt-4 text-4xl uppercase leading-none">{article ? "Modifier l'article" : "Nouvel article"}</h1>
      </header>
      <form action={saveArticle} className="mt-8 grid max-w-3xl gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <input type="hidden" name="id" value={article?.id ?? ""} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Titre"><input className={inputClass} name="title" required defaultValue={article?.title} /></Field>
          <Field label="Identifiant URL" hint="Lettres minuscules, chiffres et tirets uniquement"><input className={inputClass} name="slug" required pattern="[a-z0-9-]+" defaultValue={article?.slug} /></Field>
        </div>
        <Field label="Résumé"><textarea className={inputClass} name="excerpt" rows={3} required defaultValue={article?.excerpt} /></Field>
        <Field label="Contenu"><textarea className={inputClass} name="content" rows={14} required defaultValue={article?.content} /></Field>
        <div className="grid gap-5 border-t border-slate-100 pt-8 sm:grid-cols-3">
          <Field label="Image de couverture (URL HTTPS)"><input className={inputClass} name="coverImage" type="url" defaultValue={article?.coverImage ?? ""} /></Field>
          <Field label="Date de publication"><input className={inputClass} name="publishedAt" type="date" defaultValue={date} /></Field>
          <Field label="Visibilité">
            <select className={inputClass} name="publicationStatus" defaultValue={article?.publicationStatus ?? "DRAFT"}>
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publié</option>
            </select>
          </Field>
        </div>
        <button type="submit" className={submitClass}><Save className="h-4 w-4" />Enregistrer</button>
      </form>
    </>
  );
}
