import type { Metadata } from "next";
import localFont from "next/font/local";
import { company } from "@/lib/content";
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

const encode = localFont({
  src: [
    { path: "../fonts/expanded/EncodeSansExpanded-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/expanded/EncodeSansExpanded-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/expanded/EncodeSansExpanded-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/expanded/EncodeSansExpanded-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-encode",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const instant = false;

export const metadata: Metadata = {
  metadataBase: new URL("https://etcs-ingenierie.com"),
  title: { default: "ETCS | Etudes Techniques Conceptions des Structures", template: "%s | ETCS" },
  description: "E.T.C.S Sarl (Etudes Techniques Conceptions des Structures), entreprise générale d'ingénierie, de génie civil et de travaux publics à Kinshasa, RDC.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "fr_CD", siteName: "E.T.C.S Sarl", title: "ETCS | Etudes Techniques Conceptions des Structures", description: "Entreprise générale d'ingénierie, de génie civil et de travaux publics à Kinshasa, RDC." },
  twitter: { card: "summary_large_image" },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: ["ETCS", "E.T.C.S Sarl"],
  legalName: company.fullName,
  url: "https://etcs-ingenierie.com",
  logo: "https://etcs-ingenierie.com/logo-etcs.png",
  email: company.email,
  telephone: company.phone,
  address: { "@type": "PostalAddress", streetAddress: company.address, addressLocality: "Kinshasa", addressCountry: "CD" },
  areaServed: "République Démocratique du Congo",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${encode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        {children}
      </body>
    </html>
  );
}
