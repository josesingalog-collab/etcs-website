"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

const links: [string, string][] = [
  ["Accueil", "/"],
  ["À propos", "/a-propos"],
  ["Services", "/services"],
  ["Réalisations", "/realisations"],
  ["Actualités", "/actualites"],
  ["Contact", "/contact"],
];

export function SiteHeader({ companyName, logoUrl }: { companyName?: string | null; logoUrl?: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <header className={`fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300 ${solid ? "shadow-lg shadow-vinci-navy/10" : "shadow-none"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo light={false} companyName={companyName ?? "E.T.C.S Sarl"} logoUrl={logoUrl} />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {links.map(([label, href]) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative text-sm font-bold transition ${active ? "text-vinci" : "text-vinci-navy hover:text-vinci-mid"}`}
              >
                {label}
                {active && <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-vinci" />}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/devis" className="focus-ring inline-flex items-center gap-2 rounded-full bg-vinci px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-vinci/30 transition hover:bg-vinci-navy sm:block">
            Demander un devis <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className={`focus-ring grid h-11 w-11 place-items-center rounded-lg border transition lg:hidden ${solid ? "border-slate-200 text-anthracite" : "border-vinci-navy/20 text-vinci-navy"}`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 top-20 z-40 overflow-y-auto border-t border-slate-100 bg-white lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-6 sm:px-6" aria-label="Navigation mobile">
            {links.map(([label, href]) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center justify-between rounded-xl px-4 py-4 text-base font-bold ${active ? "bg-royal-50 text-royal" : "text-anthracite hover:bg-mist"}`}>
                  {label}
                  <ArrowRight className={`h-4 w-4 ${active ? "text-royal" : "text-slate-300"}`} />
                </Link>
              );
            })}
            <Link href="/devis" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-vinci px-4 py-4 text-center text-base font-bold text-white shadow-md shadow-vinci/30">
              Demander un devis
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
