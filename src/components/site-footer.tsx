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

function socialIcons(settings: SiteSettings | null): [string, string][] {
  if (!settings?.socialLinks || Array.isArray(settings.socialLinks) || typeof settings.socialLinks !== "object") return [];
  return (Object.entries(settings.socialLinks) as [string, unknown][]).filter((entry): entry is [string, string] => typeof entry[1] === "string" && /^https:\/\//.test(entry[1]));
}

/** Pied de page sombre arrondi, avec logo en filigrane, style maquette. */
export function Footer({ settings, aboutText }: { settings: SiteSettings | null; aboutText: string }) {
  const socials = socialIcons(settings);
  const phones = getPhoneList(settings);
  return (
    <footer className="px-4 pb-8 sm:px-6 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] text-white" style={{ backgroundColor: "#101a33" }}>
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{ background: "var(--plan-accent)" }} aria-hidden="true" />
        <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              {settings?.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={settings.logoUrl} alt={`Logo ${settings?.companyName ?? "E.T.C.S Sarl"}`} className="h-12 w-auto" />
              ) : (
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--plan-accent)] text-lg font-black text-white">ET</span>
              )}
              <div>
                <p className="text-lg font-extrabold">{settings?.companyName ?? "E.T.C.S Sarl"}</p>
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Etudes Techniques Conceptions des Structures</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">{aboutText}</p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[10px] font-bold text-slate-300 transition hover:bg-white hover:text-[var(--plan-navy)]">
                    {name.slice(0, 2).toUpperCase()}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-extrabold text-white">Navigation</p>
            <ul className="mt-5 grid gap-2.5 text-sm text-slate-400">
              {navLinks.map(([label, href]) => (
                <li key={href}><Link href={href} className="transition hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-extrabold text-white">Domaines</p>
            <ul className="mt-5 grid gap-2.5 text-sm text-slate-400">
              <li>Infrastructures de transport</li>
              <li>Bâtiments complexes et IGH</li>
              <li>Énergie et bâtiments industriels</li>
              <li>Aménagement urbain</li>
              <li>Environnement et développement durable</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-extrabold text-white">Contact</p>
            <ul className="mt-5 grid gap-2.5 text-sm text-slate-400">
              {phones.map((raw) => {
                const { number, note } = splitPhone(raw);
                const isWhatsapp = note ? /whatsapp/i.test(note) : false;
                const href = isWhatsapp ? `https://wa.me/${number.replace(/[^\d]/g, "")}` : `tel:${number.replace(/\s/g, "")}`;
                return (
                  <li key={number}>
                    <a href={href} className="transition hover:text-white">{number}{note && <span className="ml-2 text-[9px] font-bold uppercase tracking-wider text-slate-500">{note}</span>}</a>
                  </li>
                );
              })}
              {settings?.email && <li><a href={`mailto:${settings.email}`} className="break-all transition hover:text-white">{settings.email}</a></li>}
              {settings?.address && <li className="leading-6">{settings.address}</li>}
              <li>[À COMPLÉTER — horaires]</li>
            </ul>
          </div>
        </div>
        <div className="relative border-t border-white/10">
          <p className="pointer-events-none select-none px-8 pb-2 pt-6 text-center display text-[clamp(2.5rem,9vw,7rem)] leading-none text-white/[.04]">{settings?.companyName ?? "E.T.C.S Sarl"}</p>
          <div className="flex flex-wrap items-center justify-between gap-3 px-8 pb-8 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {settings?.companyName ?? "E.T.C.S Sarl"}. Tous droits réservés.</p>
            <p className="flex gap-5">
              <Link href="/mentions-legales" className="transition hover:text-white">Mentions légales</Link>
              <Link href="/politique-confidentialite" className="transition hover:text-white">Confidentialité</Link>
            </p>
            <Link href="/admin/login" aria-label="Espace administrateur" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition hover:bg-white hover:text-[var(--plan-navy)]">
              <Lock className="h-3 w-3" />Espace admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
