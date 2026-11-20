import { Footer } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MotionProvider } from "@/components/public/reveal";
import { getSiteSettings } from "@/lib/site-settings";
import { getPageContent, typographyCss } from "@/lib/page-content";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [settings, footerContent, typography] = await Promise.all([
    getSiteSettings(),
    getPageContent("footer"),
    getPageContent("typography"),
  ]);
  const css = typographyCss(typography);
  return (
    <MotionProvider>
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      <SiteHeader companyName={settings?.companyName} logoUrl={settings?.logoUrl} />
      {children}
      <Footer settings={settings} aboutText={footerContent.aboutText} />
    </MotionProvider>
  );
}
