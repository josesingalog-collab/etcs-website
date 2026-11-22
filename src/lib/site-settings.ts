import { connection } from "next/server";
import type { SiteSettings } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getSiteSettings() {
  await connection();
  return prisma.siteSettings.findUnique({ where: { id: 1 } });
}

/** Liste des téléphones affichables : champ principal + numéros additionnels (dédupliqués, max 4). */
export function getPhoneList(settings: SiteSettings | null): string[] {
  if (!settings) return [];
  const extras = Array.isArray(settings.phones)
    ? (settings.phones as unknown[]).filter((value): value is string => typeof value === "string" && value.trim() !== "")
    : [];
  return [...new Set([settings.phone, ...extras].map((value) => value.trim()).filter(Boolean))].slice(0, 4);
}
