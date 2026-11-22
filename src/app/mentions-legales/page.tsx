import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { company } from "@/lib/content";
import { getPhoneList, getSiteSettings } from "@/lib/site-settings";

export const metadata = { title: "Mentions légales" };
export const instant = false;

export default async function Legal() {
  const settings = await getSiteSettings();
  const phones = getPhoneList(settings);
  return (
    <SiteShell>
      <PageHero eyebrow="INFORMATIONS" title="Mentions légales" />
      <article className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="display text-xl uppercase text-royal">Éditeur</h2>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            {company.name} — {company.fullName}, entreprise générale. Siège social : {company.address}. Bureau : {company.office}.
          </p>
          <h2 className="display mt-10 text-xl uppercase text-royal">Identification légale</h2>
          <dl className="mt-4 grid gap-2 text-sm leading-8 text-slate-600 sm:grid-cols-[auto_1fr] sm:gap-x-6">
            <dt className="font-bold text-anthracite">RCCM :</dt><dd>{company.rccm}</dd>
            <dt className="font-bold text-anthracite">ID NAT :</dt><dd>{company.idNat}</dd>
            <dt className="font-bold text-anthracite">Numéro d&apos;impôt :</dt><dd>{company.tax}</dd>
          </dl>
          <h2 className="display mt-10 text-xl uppercase text-royal">Contact</h2>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            {phones.length > 0 ? phones.join(" · ") : `Téléphone fixe : ${company.phoneFixed} · Mobile : ${company.phone} / ${company.phoneAlt}`}
            <br />
            Email : <a className="font-semibold text-royal" href={`mailto:${company.email}`}>{company.email}</a> / <a className="font-semibold text-royal" href={`mailto:${company.emailAlt}`}>{company.emailAlt}</a>
            <br />
            Site Internet : {company.website}
          </p>
          <h2 className="display mt-10 text-xl uppercase text-royal">Présence internationale</h2>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            À l&apos;international, E.T.C.S Sarl dispose d&apos;une filiale en Europe, précisément en France dans la région parisienne, immatriculée au registre du commerce et des sociétés et fonctionnant en tant que bureau d&apos;études de génie civil, de bâtiments et de travaux publics.
          </p>
        </section>
      </article>
    </SiteShell>
  );
}
