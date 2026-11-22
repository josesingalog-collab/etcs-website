import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/public/reveal";

export type ServiceCardData = { slug: string; title: string; image: string | null };

export const domainTags: Record<string, string> = {
  "genie-civil-ouvrages-art": "Ouvrages d'art",
  "ingenierie-routiere": "Routes",
  "barrages-hydraulique": "Énergie & eau",
  "aeroports-voies-ferrees": "Aéroports",
  "batiments": "Bâtiments",
  "etudes-conseils": "Études",
};

/** Carte domaine style Colas : image avec coin décoqué et étiquette, bloc coloré alterné avec flèche diagonale. */
export function DomainCard({ service, index }: { service: ServiceCardData; index: number }) {
  const tag = domainTags[service.slug] ?? "E.T.C.S Sarl";
  const notched = index % 2 === 1;
  return (
    <Reveal delay={index * 0.05}>
      <Link href={`/services/${service.slug}`} className="group block h-full">
        <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ clipPath: notched ? "polygon(0 0, 100% 0, 100% 100%, 64px 100%, 0 calc(100% - 52px))" : "polygon(0 0, 100% 0, 100% calc(100% - 52px), calc(100% - 72px) 100%, 0 100%)" }}>
          {service.image ? (
            <Image src={service.image} alt={service.title} fill sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
          ) : (
            <div className="grid h-full place-items-center bg-slate-200"><span className="display text-5xl text-slate-400">{String(index + 1).padStart(2, "0")}</span></div>
          )}
          <span className="absolute left-4 top-4 rounded-md bg-[var(--plan-accent)] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md">{tag}</span>
        </div>
        <div className="relative px-6 pb-9 pt-6" style={{ backgroundColor: notched ? "#1637b8" : "#101a33" }}>
          <span className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition duration-300 group-hover:bg-white group-hover:text-[var(--plan-accent)]" aria-hidden="true">
            <ArrowUpRight className="h-4 w-4" />
          </span>
          <h3 className="display max-w-[80%] text-xl leading-snug text-white">{service.title}</h3>
        </div>
      </Link>
    </Reveal>
  );
}
