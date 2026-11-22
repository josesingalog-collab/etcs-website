/** Centralisation des images du site — remplacez ces fichiers (public/images/) par de vraies photos
 * de chantier E.T.C.S Sarl en gardant les mêmes noms, tout le site se met à jour.
 * Cible : ~1600px de large, JPEG/WEBP, < 400 Ko si possible. */
export const IMAGES = {
  hero: {
    src: "/images/hero.jpg",
    alt: "Chantier d'infrastructure en cours de réalisation avec engins de terrassement",
  },
  presentation: {
    src: "/images/presentation.jpg",
    alt: "Ingénieur consultant un plan sur un chantier de génie civil",
  },
  engagement: {
    src: "/images/engagement.jpg",
    alt: "Ouvrage de génie civil en béton armé en cours de construction",
  },
  conviction: {
    src: "/images/conviction.jpg",
    alt: "Grue de chantier et structure en construction à l'aube",
  },
  etudes: {
    src: "/images/etudes.jpg",
    alt: "Bureau d'études : plans de coffrage et dessins techniques sur table de travail",
  },
  transport: {
    src: "/images/transport.jpg",
    alt: "Route et chaussée en construction avec véhicules d'entreprise",
  },
  batiments: {
    src: "/images/batiments.jpg",
    alt: "Immeuble de grande hauteur en construction, structure béton apparente",
  },
  energie: {
    src: "/images/energie.jpg",
    alt: "Ouvrage hydraulique : barrage et installations énergétiques",
  },
  urbanisme: {
    src: "/images/urbanisme.jpg",
    alt: "Vue aérienne d'un quartier urbain en développement",
  },
  environnement: {
    src: "/images/environnement.jpg",
    alt: "Paysage végétal illustrant le développement durable sur un site de projet",
  },
  aproposIntro: {
    src: "/images/urbanisme-intro.jpg",
    alt: "Zone urbaine et infrastructures en développement à Kinshasa",
  },
} as const;

export type ImageKey = keyof typeof IMAGES;
