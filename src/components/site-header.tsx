"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

type NavLink = { label: string; href: string };

export function SiteHeader({ companyName, logoUrl, hasProjects = true, hasArticles = true, socialLinks = [] }: {
  companyName?: string | null;
  logoUrl?: string | null;
  hasProjects?: boolean;
  hasArticles?: boolean;
  socialLinks?: [string, string][];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links: NavLink[] = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    ...(hasProjects ? [{ label: "Réalisations", href: "/realisations" as const }] : []),
    ...(hasArticles ? [{ label: "Actualités", href: "/actualites" as const }] : []),
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? "bg-white shadow-lg shadow-black/5" : "bg-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Logo light={!solid} companyName={companyName ?? "E.T.C.S Sarl"} logoUrl={logoUrl} />
        <nav className={`hidden items-center gap-8 lg:flex ${solid ? "" : "absolute left-1/2 -translate-x-1/2"}`} aria-label="Navigation principale">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-bold transition ${active(link.href) ? (solid ? "text-[var(--plan-accent)]" : "text-white") : solid ? "text-slate-600 hover:text-[var(--plan-accent)]" : "text-white/80 hover:text-white"}`}
            >
              {link.label}
              {active(link.href) && <span className={`absolute -bottom-2 left-0 h-0.5 w-full rounded-full ${solid ? "bg-[var(--plan-accent)]" : "bg-white"}`} />}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/devis" className={`focus-ring group hidden items-center gap-2.5 rounded-full py-2 pl-5 pr-2 text-sm font-bold transition sm:inline-flex ${solid ? "bg-[var(--plan-accent)] text-white hover:bg-[#1a5fd6]" : "bg-white/10 text-white ring-1 ring-white/40 backdrop-blur hover:bg-[var(--plan-accent)]"}`}>
            Demander un devis
            <span className="grid h-8 w-8 place-items-center rounded-full bg-black/15 transition group-hover:bg-white group-hover:text-[var(--plan-accent)]" aria-hidden="true">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className={`focus-ring grid h-11 w-11 place-items-center rounded-full border transition lg:hidden ${solid ? "border-slate-200 text-anthracite" : "border-white/40 text-white"}`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto rounded-b-[2rem] lg:hidden" style={{ backgroundColor: "#101a33" }}>
          <nav className="mx-auto grid max-w-7xl gap-1 px-6 py-8" aria-label="Navigation mobile">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`flex items-center justify-between rounded-2xl px-5 py-4 text-base font-bold transition ${active(link.href) ? "bg-white/10 text-white" : "text-slate-200 hover:bg-white/5"}`}>
                {link.label}
                <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
              </Link>
            ))}
            <Link href="/devis" onClick={() => setOpen(false)} className="focus-ring group mt-4 flex items-center justify-between rounded-full bg-[var(--plan-accent)] px-6 py-4 text-base font-bold text-white">
              Demander un devis
              <span className="grid h-9 w-9 place-items-center rounded-full bg-black/20" aria-hidden="true"><ArrowRight className="h-4 w-4" /></span>
            </Link>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socialLinks.map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-xs font-bold text-white transition hover:bg-white hover:text-[var(--plan-navy)]">
                    {name.slice(0, 2).toUpperCase()}
                  </a>
                ))}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
