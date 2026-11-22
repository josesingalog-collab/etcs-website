import { Footer } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { MotionProvider } from "@/components/public/reveal";
import { getSiteSettings } from "@/lib/site-settings";
import { getPageContent } from "@/lib/page-content";
import { prisma } from "@/lib/prisma";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [settings, footerContent, projectCount, articleCount] = await Promise.all([
    getSiteSettings(),
    getPageContent("footer"),
    prisma.project.count({ where: { publicationStatus: "PUBLISHED" } }),
    prisma.article.count({ where: { publicationStatus: "PUBLISHED" } }),
  ]);
  const socials = settings?.socialLinks && typeof settings.socialLinks === "object" && !Array.isArray(settings.socialLinks)
    ? (Object.entries(settings.socialLinks as Record<string, unknown>) as [string, string][]).filter((entry): entry is [string, string] => typeof entry[1] === "string" && /^https:\/\//.test(entry[1]))
    : [];
  return (
    <MotionProvider>
      <SiteHeader
        companyName={settings?.companyName}
        logoUrl={settings?.logoUrl}
        hasProjects={projectCount > 0}
        hasArticles={articleCount > 0}
        socialLinks={socials}
      />
      {children}
      <Footer settings={settings} aboutText={footerContent.aboutText} />
      <WhatsAppFloat />
    </MotionProvider>
  );
}
