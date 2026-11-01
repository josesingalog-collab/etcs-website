import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const instant = false;

export const metadata: Metadata = {
  metadataBase: new URL("https://gtgc-sarl.com"),
  title: { default: "GTGC | Grand Travaux de Génie Civil", template: "%s | GTGC" },
  description: "Grand Travaux de Génie Civil, votre partenaire pour des projets de construction durables et ambitieux à Kinshasa.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "fr_CD", siteName: "GTGC SARL", title: "GTGC | Grand Travaux de Génie Civil", description: "Votre partenaire pour des projets de construction durables et ambitieux à Kinshasa." },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
