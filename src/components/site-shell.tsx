import { Footer } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteSettings } from "@/lib/site-settings";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <>
      <SiteHeader companyName={settings?.companyName} logoUrl={settings?.logoUrl} />
      {children}
      <Footer settings={settings} />
    </>
  );
}
