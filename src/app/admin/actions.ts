"use server";

import { Prisma, RequestStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { persistPageContent, pageKeys, type PageKey } from "@/lib/page-content";
import { articleSchema, projectSchema, requestStatus, serviceSchema, settingsSchema, teamSchema } from "@/lib/validation";

function values(formData: FormData) { return Object.fromEntries(formData) as Record<string, string>; }
function invalid(): never { throw new Error("Données administratives invalides."); }
function refresh(...paths: string[]) { paths.forEach((path) => revalidatePath(path)); }

export async function saveProject(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  const data = projectSchema.safeParse(values(formData));
  if (!data.success) invalid();
  const { imageUrls, ...project } = data.data;
  const images = imageUrls.split(/\r?\n/).map((url) => url.trim()).filter(Boolean);
  if (!images.every((url) => /^https:\/\/.{1,2040}$/.test(url))) invalid();
  const projectData = { ...project, projectDate: project.projectDate ? new Date(project.projectDate) : null, images: { create: images.map((url, position) => ({ url, position })) } };
  if (id) await prisma.project.update({ where: { id }, data: { ...projectData, images: { deleteMany: {}, create: projectData.images.create } } });
  else await prisma.project.create({ data: projectData });
  refresh("/", "/realisations", "/admin/realisations");
  redirect("/admin/realisations?saved=1");
}

export async function deleteProject(formData: FormData) { await requireAdmin(); await prisma.project.delete({ where: { id: String(formData.get("id")) } }); refresh("/", "/realisations", "/admin/realisations"); }

export async function saveService(formData: FormData) {
  await requireAdmin(); const id = formData.get("id")?.toString(); const parsed = serviceSchema.safeParse(values(formData)); if (!parsed.success) invalid();
  if (id) await prisma.service.update({ where: { id }, data: parsed.data }); else await prisma.service.create({ data: parsed.data });
  refresh("/", "/services", "/admin/services"); redirect("/admin/services?saved=1");
}
export async function deleteService(formData: FormData) { await requireAdmin(); await prisma.service.delete({ where: { id: String(formData.get("id")) } }); refresh("/", "/services", "/admin/services"); }

export async function saveArticle(formData: FormData) {
  await requireAdmin(); const id = formData.get("id")?.toString(); const parsed = articleSchema.safeParse(values(formData)); if (!parsed.success) invalid();
  const data = { ...parsed.data, publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : parsed.data.publicationStatus === "PUBLISHED" ? new Date() : null };
  if (id) await prisma.article.update({ where: { id }, data }); else await prisma.article.create({ data });
  refresh("/actualites", "/admin/actualites"); redirect("/admin/actualites?saved=1");
}
export async function deleteArticle(formData: FormData) { await requireAdmin(); await prisma.article.delete({ where: { id: String(formData.get("id")) } }); refresh("/actualites", "/admin/actualites"); }

export async function saveTeamMember(formData: FormData) {
  await requireAdmin(); const id = formData.get("id")?.toString(); const parsed = teamSchema.safeParse(values(formData)); if (!parsed.success) invalid();
  if (id) await prisma.teamMember.update({ where: { id }, data: parsed.data }); else await prisma.teamMember.create({ data: parsed.data });
  refresh("/a-propos", "/admin/equipe"); redirect("/admin/equipe?saved=1");
}
export async function deleteTeamMember(formData: FormData) { await requireAdmin(); await prisma.teamMember.delete({ where: { id: String(formData.get("id")) } }); refresh("/a-propos", "/admin/equipe"); }

export async function updateQuoteStatus(formData: FormData) { await requireAdmin(); const status = requestStatus.safeParse(formData.get("status")); if (!status.success) invalid(); await prisma.quoteRequest.update({ where: { id: String(formData.get("id")) }, data: { status: status.data as RequestStatus } }); refresh("/admin/demandes"); }
export async function updateMessageStatus(formData: FormData) { await requireAdmin(); const status = requestStatus.safeParse(formData.get("status")); if (!status.success) invalid(); await prisma.contactMessage.update({ where: { id: String(formData.get("id")) }, data: { status: status.data as RequestStatus } }); refresh("/admin/messages"); }

export async function saveSettings(formData: FormData) {
  await requireAdmin(); const parsed = settingsSchema.safeParse(values(formData)); if (!parsed.success) invalid();
  const phones = [parsed.data.phone2, parsed.data.phone3, parsed.data.phone4].map((value) => (value ?? "").trim()).filter(Boolean);
  if (phones.length > 3) invalid();
  let socialLinks: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput = Prisma.JsonNull;
  if (parsed.data.socialLinks) { try { const value: unknown = JSON.parse(parsed.data.socialLinks); if (!value || Array.isArray(value) || typeof value !== "object") invalid(); socialLinks = value as Record<string, string>; } catch { invalid(); } }
  let keyStats: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput = Prisma.JsonNull;
  if (parsed.data.keyStats) {
    try {
      const value: unknown = JSON.parse(parsed.data.keyStats);
      if (!Array.isArray(value) || !value.every((entry) => !!entry && typeof entry === "object" && typeof (entry as Record<string, unknown>).label === "string" && typeof (entry as Record<string, unknown>).value === "string")) invalid();
      keyStats = value as Prisma.InputJsonValue;
    } catch { invalid(); }
  }
  const settingsData = { companyName: parsed.data.companyName, phone: parsed.data.phone, phones, email: parsed.data.email, address: parsed.data.address, aboutText: parsed.data.aboutText, logoUrl: parsed.data.logoUrl, heroImageUrl: parsed.data.heroImageUrl, mapEmbedUrl: parsed.data.mapEmbedUrl, socialLinks, keyStats };
  await prisma.siteSettings.upsert({ where: { id: 1 }, update: settingsData, create: { id: 1, ...settingsData } });
  refresh("/", "/contact", "/admin/parametres"); redirect("/admin/parametres?saved=1");
}

export async function savePageContent(formData: FormData) {
  await requireAdmin();
  const pageKey = String(formData.get("page"));
  if (!pageKeys.includes(pageKey as PageKey)) invalid();
  const page = pageKey as PageKey;
  await persistPageContent(page, formData);
  refresh("/", "/a-propos", "/services", "/contact", "/devis", `/admin/contenus/${page}`);
  redirect(`/admin/contenus/${page}?saved=1`);
}
