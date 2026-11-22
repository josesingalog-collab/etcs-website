import Link from "next/link";
import { Lock } from "lucide-react";
import type { SiteSettings } from "@prisma/client";
import { getPhoneList, splitPhone } from "@/lib/site-settings";

const navLinks: [string, string][] = [
  ["À propos", "/a-propos"],
  ["Services", "/services"],
  ["Réalisations", "/realisations"],
  ["Actualités", "/actualites"],
  ["Contact", "/contact"],
  ["Demander un devis", "/devis"],
];

function Cell({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-5 py-4 ${className}`}>
      <p className="annotation text-[9px] text-slate-400">{label}</p>
      <div className="mt-1.5 text-sm leading-6 text-slate-100">{children}</div>
    </div>
  );
}

/** Pied de page conçu comme le cartouche d'un plan d'ingénieur. */
export function Footer({ settings, aboutText }: { settings: SiteSettings | null; aboutText: string }) {
  const year = new Date().getFullYear();
  const phones = getPhoneList(settings);
  return (
    <footer style={{ backgroundColor: "var(--plan-paper-dark)" }} className="text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <div className="border border-white/25">
          {/* Ligne titre du cartouche */}
          <div className="flex flex-wrap items-stretch justify-between border-b border-white/25">
            <div className="flex items-center gap-3 px-5 py-4">
              {settings?.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={settings.logoUrl} alt={`Logo ${settings?.companyName ?? "E.T.C.S Sarl"}`} className="h-10 w-auto" />
              ) : (
                <span className="grid h-10 w-10 place-items-center bg-[var(--plan-accent)] text-sm font-black text-white">ET</span>
              )}
              <div>
                <p className="text-sm font-extrabold tracking-wide">{settings?.companyName ?? "E.T.C.S Sarl"}</p>
                <p className="annotation text-[9px] text-slate-400">Etudes Techniques Conceptions des Structures</p>
              </div>
            </div>
            <div className="flex items-center gap-5 px-5 py-4">
              <span className="annotation text-[9px] text-slate-400">ÉCH. 1:1 — IND. A</span>
              <span className="annotation text-[9px] text-slate-400">{year}</span>
            </div>
          </div>
          {/* Corps du cartouche en cellules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Cell label="MAÎTRE D'OUVRAGE" className="border-b border-r border-white/25">
              <p className="font-bold">{settings?.companyName ?? "E.T.C.S Sarl"}</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">{aboutText}</p>
            </Cell>
            <Cell label="PROJET" className="border-b border-white/25 lg:border-r">
              <p>Site institutionnel <span className="annotation text-[10px] text-slate-400">/ Vitrine d'entreprise</span></p>
              <p className="mt-1 text-xs text-slate-400">Domaine : ingénierie &amp; BTP</p>
            </Cell>
            <Cell label="SIÈGE — KINSHASA (RDC)" className="border-b sm:border-r border-white/25">
              <p className="leading-5">{settings?.address ?? "Avenue du Port, Nouvelles Galeries Présidentielles, 5e étage, Bureau 504, Gombe-Kinshasa"}</p>
              <p className="annotation mt-1 text-[9px] text-slate-500">4°19'18"S — 15°18'45"E · 415 m</p>
            </Cell>
            <Cell label="BUREAU D'ÉTUDES — MONTROUGE (FRANCE)" className="border-b border-white/25">
              <p className="leading-5">Montrouge, région parisienne [À COMPLÉTER : adresse]</p>
              <p className="annotation mt-1 text-[9px] text-slate-500">48°49'07"N — 2°19'10"E</p>
            </Cell>
            <Cell label="CONTACT" className="border-b border-r border-white/25">
              <ul className="grid gap-1">
                {phones.map((raw) => {
                  const { number, note } = splitPhone(raw);
                  const isWhatsapp = note ? /whatsapp/i.test(note) : false;
                  const href = isWhatsapp ? `https://wa.me/${number.replace(/[^\d]/g, "")}` : `tel:${number.replace(/\s/g, "")}`;
                  return (
                    <li key={number}>
                      <a href={href} className="transition hover:text-white">{number}{note && <span className="ml-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">{note}</span>}</a>
                    </li>
                  );
                })}
                {settings?.email && (
                  <li><a href={`mailto:${settings.email}`} className="break-all transition hover:text-white">{settings.email}</a></li>
                )}
              </ul>
            </Cell>
            <Cell label="HORAIRES" className="border-b border-white/25 lg:border-r">
              <p>[À COMPLÉTER — ex. Lundi – Vendredi, 8h00 – 17h00]</p>
            </Cell>
            <Cell label="NAVIGATION" className="border-b sm:border-r border-white/25">
              <nav aria-label="Liens rapides du pied de page">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {navLinks.map(([label, href]) => (
                    <li key={href}><Link href={href} className="transition hover:text-white">{label}</Link></li>
                  ))}
                </ul>
              </nav>
            </Cell>
            <Cell label="MENTIONS" className="border-b border-white/25">
              <ul className="grid gap-1">
                <li><Link href="/mentions-legales" className="transition hover:text-white">Mentions légales</Link></li>
                <li><Link href="/politique-confidentialite" className="transition hover:text-white">Politique de confidentialité</Link></li>
              </ul>
            </Cell>
          </div>
          {/* Ligne réglementaire */}
          <div className="grid grid-cols-1 border-t border-white/25 sm:grid-cols-3">
            <Cell label="RCCM"><p className="text-xs">{settings?.companyName === "E.T.C.S Sarl" ? "CD/KIN/RCCM/14-B-6272 [À VÉRIFIER]" : "[À COMPLÉTER]"}</p></Cell>
            <Cell label="ID. NAT. / N° IMPÔT" className="sm:border-l sm:border-r border-white/25"><p className="text-xs">01-403-N44539F · A0700086C [À VÉRIFIER]</p></Cell>
            <Cell label="AGRÉMENTS / SIRET (FRANCE)"><p className="text-xs">[À COMPLÉTER]</p></Cell>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="annotation text-[9px] text-slate-500">© {year} {settings?.companyName ?? "E.T.C.S Sarl"} — TOUS DROITS RÉSERVÉS</p>
          <Link href="/admin/login" aria-label="Espace administrateur" title="Espace administrateur"
            className="focus-ring inline-flex items-center gap-2 border border-white/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 transition hover:bg-white hover:text-[var(--plan-navy)]">
            <Lock className="h-3 w-3" />Espace admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
