import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram, Twitter, Youtube, Lock } from "lucide-react";
import type { SiteSettings } from "@prisma/client";
import { Logo } from "@/components/logo";

const navLinks: [string, string][] = [
  ["À propos", "/a-propos"],
  ["Services", "/services"],
  ["Réalisations", "/realisations"],
  ["Actualités", "/actualites"],
  ["Contact", "/contact"],
  ["Demander un devis", "/devis"],
];

const socialIcons: Record<string, typeof Facebook> = {
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  "x": Twitter,
  youtube: Youtube,
};

function socials(settings: SiteSettings | null) {
  if (!settings?.socialLinks || Array.isArray(settings.socialLinks) || typeof settings.socialLinks !== "object") return [];
  return Object.entries(settings.socialLinks).filter((entry): entry is [string, string] => typeof entry[1] === "string" && /^https:\/\//.test(entry[1]));
}

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const socialLinks = socials(settings);
  const year = new Date().getFullYear();
  return (
    <footer className="grid-lines bg-anthracite text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-20 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr] lg:px-8">
        <div>
          <Logo light companyName={settings?.companyName ?? "GTGC SARL"} logoUrl={settings?.logoUrl} />
          <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300">
            Grand Travaux de Génie Civil — construction, infrastructures et ingénierie. Nous bâtissons aujourd&apos;hui les fondations de demain.
          </p>
          {socialLinks.length > 0 && (
            <div className="mt-6 flex gap-3">
              {socialLinks.map(([name, url]) => {
                const Icon = socialIcons[name.toLowerCase()] ?? null;
                return (
                  <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-slate-300 transition hover:border-gold hover:bg-gold hover:text-anthracite">
                    {Icon ? <Icon className="h-4 w-4" /> : <span className="text-[10px] font-bold uppercase">{name.slice(0, 2)}</span>}
                  </a>
                );
              })}
            </div>
          )}
        </div>
        <nav aria-label="Liens rapides">
          <p className="text-xs font-bold tracking-[.18em] text-gold">NAVIGATION</p>
          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            {navLinks.map(([label, href]) => (
              <Link key={href} href={href} className="w-fit transition hover:text-gold">{label}</Link>
            ))}
          </div>
        </nav>
        <div>
          <p className="text-xs font-bold tracking-[.18em] text-gold">CONTACT</p>
          <ul className="mt-6 grid gap-4 text-sm text-slate-300">
            {settings?.address && (
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span className="leading-6">{settings.address}</span></li>
            )}
            {settings?.phone && (
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-gold" /><a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="transition hover:text-gold">{settings.phone}</a></li>
            )}
            {settings?.email && (
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${settings.email}`} className="break-all transition hover:text-gold">{settings.email}</a></li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-6 text-xs text-slate-400 lg:justify-between lg:px-8">
          <p>© {year} {settings?.companyName ?? "GTGC SARL"}. Tous droits réservés.</p>
          <p className="flex gap-5">
            <Link href="/mentions-legales" className="transition hover:text-gold">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="transition hover:text-gold">Confidentialité</Link>
          </p>
          <Link href="/admin/login" aria-label="Espace administrateur" title="Espace administrateur"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 transition hover:border-gold hover:text-gold">
            <Lock className="h-3 w-3" />Espace admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
