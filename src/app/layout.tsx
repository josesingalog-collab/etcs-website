import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "../fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Poppins-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/Poppins-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
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
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
