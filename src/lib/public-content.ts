import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

export async function publishedProjects() { await connection(); return prisma.project.findMany({ where: { publicationStatus: "PUBLISHED" }, include: { images: { orderBy: { position: "asc" } } }, orderBy: { projectDate: "desc" } }); }
export async function publishedProject(slug: string) { await connection(); return prisma.project.findFirst({ where: { slug, publicationStatus: "PUBLISHED" }, include: { images: { orderBy: { position: "asc" } } } }); }
export async function publishedServices() { await connection(); return prisma.service.findMany({ where: { publicationStatus: "PUBLISHED" }, orderBy: { title: "asc" } }); }
export async function publishedService(slug: string) { await connection(); return prisma.service.findFirst({ where: { slug, publicationStatus: "PUBLISHED" } }); }
export async function publishedArticles() { await connection(); return prisma.article.findMany({ where: { publicationStatus: "PUBLISHED" }, orderBy: { publishedAt: "desc" } }); }
export async function publishedArticle(slug: string) { await connection(); return prisma.article.findFirst({ where: { slug, publicationStatus: "PUBLISHED" } }); }
