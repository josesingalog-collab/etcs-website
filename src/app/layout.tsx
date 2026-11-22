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
  title: { default: "E.T.C.S Sarl | Bureau d'études et entreprise générale de génie civil", template: "%s | E.T.C.S Sarl" },
  description: "E.T.C.S Sarl (Etudes Techniques Conceptions des Structures), bureau d'études et entreprise générale de génie civil : ingénierie, bâtiments et travaux publics à Kinshasa (RDC) et à Montrouge (France).",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CD",
    siteName: "E.T.C.S Sarl",
    title: "E.T.C.S Sarl | Bureau d'études et entreprise générale de génie civil",
    description: "Ingénierie, génie civil, bâtiments et travaux publics à Kinshasa (RDC) et à Montrouge (France).",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "E.T.C.S Sarl — Bureau d'études et entreprise générale" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

const organization = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://etcs-ingenierie.com/#organisation",
  name: company.name,
  alternateName: ["ETCS", "E.T.C.S Sarl"],
  legalName: company.fullName,
  description: "Bureau d'études et entreprise générale de génie civil : ingénierie, bâtiments et travaux publics.",
  url: "https://etcs-ingenierie.com",
  logo: "https://etcs-ingenierie.com/logo-etcs.png",
  image: "https://etcs-ingenierie.com/og-image.png",
  email: company.email,
  telephone: [company.phone, company.phoneAlt, company.phoneFixed],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenue du Port, Nouvelles Galeries Présidentielles, 5e étage, Bureau 504",
    addressLocality: "Gombe, Kinshasa",
    addressCountry: "CD",
  },
  geo: { "@type": "GeoCoordinates", latitude: -4.3217, longitude: 15.3125 },
  branch: {
    "@type": "LocalBusiness",
    name: "E.T.C.S Sarl — Bureau d'études (France)",
    address: { "@type": "PostalAddress", addressLocality: "Montrouge", addressCountry: "FR" },
    geo: { "@type": "GeoCoordinates", latitude: 48.8186, longitude: 2.3194 },
  },
  areaServed: ["République Démocratique du Congo", "France"],
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
