import type { Metadata } from "next";

export const SITE_URL = "https://etcs-ingenierie.com";
export const OG_IMAGE = "/og-image.png";

/** Metadata complète par page : canonical unique, description et OpenGraph dédiés. */
export function pageMetadata(options: { title: string; description: string; path: string; image?: string }): Metadata {
  const { title, description, path, image = OG_IMAGE } = options;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | E.T.C.S Sarl`,
      description,
      url: path,
      siteName: "E.T.C.S Sarl",
      locale: "fr_CD",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | E.T.C.S Sarl`,
      description,
      images: [image],
    },
  };
}
