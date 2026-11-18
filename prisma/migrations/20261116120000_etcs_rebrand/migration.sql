-- Rebrand : GTGC SARL -> ETCS SPRL
ALTER TABLE "SiteSettings" ALTER COLUMN "companyName" SET DEFAULT 'ETCS SPRL';
UPDATE "SiteSettings" SET "companyName" = 'ETCS SPRL' WHERE "companyName" LIKE 'GTGC%';
