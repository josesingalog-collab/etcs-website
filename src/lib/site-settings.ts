import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

export async function getSiteSettings() {
  await connection();
  return prisma.siteSettings.findUnique({ where: { id: 1 } });
}
