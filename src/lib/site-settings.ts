import { connection } from "next/server";
import type { SiteSettings } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getSiteSettings() {
  await connection();
  return prisma.siteSettings.findUnique({ where: { id: 1 } });
}

/** Liste des téléphones affichables : champ principal + numéros additionnels (dédupliqués, max 4).
 * Chaque numéro peut porter une annotation après " | " (ex. "+33 7 44 25 51 68 | WhatsApp Direction Générale"). */
export function getPhoneList(settings: SiteSettings | null): string[] {
  if (!settings) return [];
  const extras = Array.isArray(settings.phones)
    ? (settings.phones as unknown[]).filter((value): value is string => typeof value === "string" && value.trim() !== "")
    : [];
  return [...new Set([settings.phone, ...extras].map((value) => value.trim()).filter(Boolean))].slice(0, 4);
}

/** Sépare un numéro de son annotation éventuelle. */
export function splitPhone(phone: string): { number: string; note?: string } {
  const [number, ...rest] = phone.split(" | ");
  const note = rest.join(" | ").trim();
  return { number: number.trim(), note: note || undefined };
}

/** Renvoie le lien WhatsApp (wa.me) si un numéro est annoté « WhatsApp ». */
export function getWhatsAppLink(settings: SiteSettings | null): string | null {
  for (const raw of getPhoneList(settings)) {
    const { number, note } = splitPhone(raw);
    if (note && /whatsapp/i.test(note)) {
      return `https://wa.me/${number.replace(/[^\d]/g, "")}`;
    }
  }
  return null;
}
