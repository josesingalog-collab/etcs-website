import { Footer } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MotionProvider } from "@/components/public/reveal";
import { getSiteSettings } from "@/lib/site-settings";
import { getPageContent } from "@/lib/page-content";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [settings, footerContent] = await Promise.all([getSiteSettings(), getPageContent("footer")]);
  return (
    <MotionProvider>
      <SiteHeader companyName={settings?.companyName} logoUrl={settings?.logoUrl} />
      {children}
      <Footer settings={settings} aboutText={footerContent.aboutText} />
    </MotionProvider>
  );
}
