-- Additive migration: nullable columns only, existing data preserved.
ALTER TABLE "SiteSettings" ADD COLUMN "keyStats" JSONB;
ALTER TABLE "SiteSettings" ADD COLUMN "mapEmbedUrl" TEXT;
