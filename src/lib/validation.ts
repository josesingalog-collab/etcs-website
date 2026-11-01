import { z } from "zod";
export const inquirySchema = z.object({ name:z.string().trim().min(2).max(100), email:z.string().email().max(254), phone:z.string().trim().min(6).max(40), subject:z.string().trim().min(2).max(160), message:z.string().trim().min(10).max(5000), website:z.string().max(0).optional() });

const status = z.enum(["DRAFT", "PUBLISHED"]);
const requestStatus = z.enum(["NEW", "IN_PROGRESS", "PROCESSED", "ARCHIVED"]);
const optionalUrl = z.union([z.literal(""), z.string().url().max(2048)]).transform((value) => value || null);
export const projectSchema = z.object({ title:z.string().trim().min(2).max(160), slug:z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180), description:z.string().trim().min(10).max(10000), location:z.string().trim().min(2).max(160), category:z.string().trim().min(2).max(100), status:z.string().trim().min(2).max(100), projectDate:z.union([z.literal(""), z.string().date()]).transform((value) => value || null), publicationStatus:status, imageUrls:z.string().max(12000) });
export const serviceSchema = z.object({ title:z.string().trim().min(2).max(160), slug:z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180), excerpt:z.string().trim().min(10).max(500), description:z.string().trim().min(10).max(10000), image:optionalUrl, publicationStatus:status });
export const articleSchema = z.object({ title:z.string().trim().min(2).max(160), slug:z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180), excerpt:z.string().trim().min(10).max(500), content:z.string().trim().min(10).max(20000), coverImage:optionalUrl, publicationStatus:status, publishedAt:z.union([z.literal(""), z.string().date()]).transform((value) => value || null) });
export const settingsSchema = z.object({ companyName:z.string().trim().min(2).max(160), phone:z.string().trim().min(4).max(40), email:z.string().email().max(254), address:z.string().trim().min(4).max(500), aboutText:z.string().trim().max(10000).optional(), logoUrl:optionalUrl, heroImageUrl:optionalUrl, mapEmbedUrl:optionalUrl, socialLinks:z.string().max(4000), keyStats:z.string().max(4000) });
export const teamSchema = z.object({ name:z.string().trim().min(2).max(120), role:z.string().trim().min(2).max(160), bio:z.string().trim().max(2000).optional(), photo:optionalUrl, position:z.coerce.number().int().min(0).max(999), publicationStatus:status });
export { requestStatus };
