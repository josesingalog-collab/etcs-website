import { Footer } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { MotionProvider } from "@/components/public/reveal";
import { getSiteSettings } from "@/lib/site-settings";
import { getPageContent, typographyCss } from "@/lib/page-content";
import { prisma } from "@/lib/prisma";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [settings, footerContent, typography, projectCount, articleCount] = await Promise.all([
    getSiteSettings(),
    getPageContent("footer"),
    getPageContent("typography"),
    prisma.project.count({ where: { publicationStatus: "PUBLISHED" } }),
    prisma.article.count({ where: { publicationStatus: "PUBLISHED" } }),
  ]);
  const css = typographyCss(typography);
  return (
    <MotionProvider>
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      <SiteHeader companyName={settings?.companyName} logoUrl={settings?.logoUrl} hasProjects={projectCount > 0} hasArticles={articleCount > 0} />
      {children}
      <Footer settings={settings} aboutText={footerContent.aboutText} />
      <WhatsAppFloat />
    </MotionProvider>
  );
}
