"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ExternalLink, FileText, FolderKanban, LayoutDashboard, LogOut, Mail, Menu, Newspaper, PenLine, Settings, Users, X } from "lucide-react";

const groups: { label: string; links: { href: string; label: string; icon: typeof LayoutDashboard }[] }[] = [
  {
    label: "Pilotage",
    links: [
      { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
      { href: "/admin/contenus", label: "Contenus des pages", icon: PenLine },
    ],
  },
  {
    label: "Contenus",
    links: [
      { href: "/admin/realisations", label: "Réalisations", icon: FolderKanban },
      { href: "/admin/services", label: "Services", icon: Building2 },
      { href: "/admin/equipe", label: "Équipe", icon: Users },
      { href: "/admin/actualites", label: "Actualités", icon: Newspaper },
    ],
  },
  {
    label: "Échanges",
    links: [
      { href: "/admin/demandes", label: "Demandes de devis", icon: FileText },
      { href: "/admin/messages", label: "Messages", icon: Mail },
    ],
  },
  {
    label: "Système",
    links: [{ href: "/admin/parametres", label: "Paramètres", icon: Settings }],
  },
];

export function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);



  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const nav = (
    <>
      <div className="flex items-center gap-3 px-2 pt-1">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-royal to-royal-deep text-lg font-black text-white shadow-lg ring-1 ring-white/10">ET</span>
        <div>
          <p className="text-sm font-extrabold tracking-wide">E.T.C.S Sarl</p>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-gold">Administration</p>
        </div>
      </div>
      <nav className="mt-9 grid gap-6 overflow-y-auto" aria-label="Navigation administration">
        {groups.map((group) => (
          <div key={group.label} className="grid gap-1.5">
            <p className="px-4 text-[10px] font-black uppercase tracking-[.22em] text-slate-500">{group.label}</p>
            {group.links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={isActive(href) ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold transition ${isActive(href) ? "bg-white/10 text-white shadow-[inset_2px_0_0_0_var(--color-gold)]" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive(href) ? "text-gold" : "text-slate-400"}`} />
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <div className="mt-auto grid gap-3 border-t border-white/10 pt-6">
        <div className="flex items-center gap-3 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/20 text-xs font-black text-gold">{adminName.slice(0, 2).toUpperCase() || "AD"}</span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">{adminName}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Administrateur</p>
          </div>
        </div>
        <Link href="/" target="_blank" className="flex items-center gap-2 text-sm font-bold text-gold transition hover:text-white">
          <ExternalLink className="h-4 w-4" />Voir le site
        </Link>
        <form action="/api/auth/logout" method="post">
          <button type="submit" className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-bold text-slate-400 transition hover:text-white">
            <LogOut className="h-4 w-4" />Déconnexion
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between bg-anthracite px-4 py-3 text-white lg:hidden">
        <span className="text-sm font-extrabold tracking-wide">ETCS<span className="ml-2 text-[10px] font-bold uppercase tracking-[.2em] text-gold">ADMIN</span></span>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} className="grid h-10 w-10 place-items-center rounded-lg border border-white/20">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-anthracite p-6 lg:hidden">
          {nav}
        </div>
      )}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-anthracite p-6 text-white lg:flex lg:border-r lg:border-white/5">
        {nav}
      </aside>
    </>
  );
}
