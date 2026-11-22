import { connection } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { IMAGES } from "@/lib/images";

export const pageKeys = ["home", "about", "services", "contact", "quote", "footer", "typography"] as const;
export type PageKey = (typeof pageKeys)[number];

export type PageMeta = { key: PageKey; label: string; description: string; publicPath: string };
export const pageMetas: PageMeta[] = [
  { key: "home", label: "Accueil", description: "Bannière, présentation, expertises, engagements, citation, présence, CTA.", publicPath: "/" },
  { key: "about", label: "À propos", description: "Bannière, mission/vision/valeurs, partenaires, formations, qualité.", publicPath: "/a-propos" },
  { key: "services", label: "Services", description: "Bannière, introduction et textes de la page Services.", publicPath: "/services" },
  { key: "contact", label: "Contact", description: "Bannière, horaires et textes de la page Contact.", publicPath: "/contact" },
  { key: "quote", label: "Devis", description: "Bannière, étapes du processus et bandeau de la page Devis.", publicPath: "/devis" },
  { key: "footer", label: "Pied de page", description: "Texte de présentation affiché dans le footer de toutes les pages.", publicPath: "/" },
  { key: "typography", label: "Typographie", description: "Polices des titres et des textes, taille générale, interligne, espacement, justification.", publicPath: "/" },
];

export type HomeContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroHook: string;
  heroImage: string;
  introText: string;
  phases: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  testimonial: { quote: string; author: string; role: string };
  presentationTitle: string;
  presentationImage: string;
  strengths: string[];
  domainsEyebrow: string;
  domainsTitle: string;
  domainsText: string;
  features: { title: string; text: string }[];
  projectsEyebrow: string;
  projectsTitle: string;
  projectsText: string;
  engagementTitle: string;
  engagementText: string;
  engagementImage: string;
  commitments: { title: string; text: string }[];
  quote: string;
  quoteAuthor: string;
  convictionImage: string;
  presenceTitle: string;
  presenceText: string;
  newsTitle: string;
  ctaTitle: string;
  ctaText: string;
};

export type AboutContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  heroImage: string;
  introEyebrow: string;
  introTitle: string;
  introText: string;
  introImage: string;
  introValues: { title: string; text: string }[];
  pillarsEyebrow: string;
  pillarsTitle: string;
  pillars: { title: string; text: string }[];
  competencesEyebrow: string;
  competencesTitle: string;
  competencesIntro: string;
  competences: { title: string; text: string; image?: string }[];
  processusEyebrow: string;
  processusTitle: string;
  processusIntro: string;
  processusSteps: { label: string }[];
  valeursEyebrow: string;
  valeursTitle: string;
  valeurs: { title: string; text: string }[];
  teamEyebrow: string;
  teamTitle: string;
  partnersEyebrow: string;
  partnersTitle: string;
  partnersText: string;
  partners: string[];
  trainingEyebrow: string;
  trainingTitle: string;
  trainingText: string;
  trainingPoints: string[];
  trainingModules: string[];
  qualityEyebrow: string;
  qualityTitle: string;
  qualityText: string;
  qualityAsideTitle: string;
  qualityPoints: string[];
  ctaTitle: string;
  ctaText: string;
};

export type ServicesContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  heroImage: string;
  statement: string;
  customEyebrow: string;
  customTitle: string;
  customText: string;
  ctaTitle: string;
  ctaText: string;
};

export type ContactContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  hoursLabel: string;
  hours: string;
  hoursLocation: string;
  formEyebrow: string;
  formTitle: string;
};

export type QuoteContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  stepsTitle: string;
  stepsText: string;
  steps: { title: string; text: string }[];
  bannerEyebrow: string;
  bannerTitle: string;
  bannerCtaLabel: string;
};

export type FooterContent = {
  aboutText: string;
};

export type TypographyContent = {
  headingFont: string;
  bodyFont: string;
  textScale: string;
  lineHeight: string;
  letterSpacing: string;
  justifyText: string;
};

/** Polices web sûres (aucun téléchargement externe requis). Valeur vide = police du site. */
export const fontOptions: { value: string; label: string }[] = [
  { value: "", label: "Police du site (par défaut)" },
  { value: "Arial, Helvetica, sans-serif", label: "Arial / Helvetica" },
  { value: "'Segoe UI', system-ui, sans-serif", label: "Segoe UI / Système" },
  { value: "Verdana, Geneva, sans-serif", label: "Verdana" },
  { value: "'Trebuchet MS', Tahoma, sans-serif", label: "Trebuchet MS" },
  { value: "Tahoma, Geneva, sans-serif", label: "Tahoma" },
  { value: "Georgia, 'Times New Roman', serif", label: "Georgia" },
  { value: "'Times New Roman', Times, serif", label: "Times New Roman" },
  { value: "'Palatino Linotype', 'Book Antiqua', serif", label: "Palatino" },
  { value: "Garamond, 'Times New Roman', serif", label: "Garamond" },
  { value: "'Courier New', Courier, monospace", label: "Courier New" },
];

export const textScaleOptions: { value: string; label: string }[] = [
  { value: "90", label: "Plus petit (90 %)" },
  { value: "95", label: "Légèrement plus petit (95 %)" },
  { value: "100", label: "Normal (100 %)" },
  { value: "105", label: "Légèrement plus grand (105 %)" },
  { value: "110", label: "Plus grand (110 %)" },
  { value: "115", label: "Très grand (115 %)" },
];

export const lineHeightOptions: { value: string; label: string }[] = [
  { value: "", label: "Interligne du site (par défaut)" },
  { value: "1.45", label: "Compact (1,45)" },
  { value: "1.6", label: "Aéré (1,6)" },
  { value: "1.75", label: "Très aéré (1,75)" },
];

export const letterSpacingOptions: { value: string; label: string }[] = [
  { value: "", label: "Espacement du site (par défaut)" },
  { value: "0", label: "Serré (0)" },
  { value: ".02em", label: "Espacé (0,02em)" },
  { value: ".035em", label: "Très espacé (0,035em)" },
];

export const justifyOptions: { value: string; label: string }[] = [
  { value: "true", label: "Texte justifié (style actuel du site)" },
  { value: "false", label: "Aligné à gauche" },
];

function optionValue(options: { value: string }[], candidate: unknown, fallback = ""): string {
  const raw = typeof candidate === "string" ? candidate : "";
  return options.some((option) => option.value === raw) ? raw : fallback;
}

/** Renvoie le CSS d'application de la typographie (valeurs validées par liste blanche — sans risque d'injection). */
export function typographyCss(content: TypographyContent): string {
  const heading = optionValue(fontOptions, content.headingFont);
  const body = optionValue(fontOptions, content.bodyFont);
  const scale = Number(content.textScale);
  const lineHeight = optionValue(lineHeightOptions, content.lineHeight);
  const letterSpacing = optionValue(letterSpacingOptions, content.letterSpacing);
  const lines: string[] = [];
  if (heading) lines.push(`--admin-heading-font:${heading}`);
  if (body) lines.push(`--admin-body-font:${body}`);
  if (Number.isFinite(scale) && scale >= 80 && scale <= 130 && scale !== 100) lines.push(`--admin-text-scale:${scale}%`);
  if (lineHeight) lines.push(`--admin-body-line-height:${lineHeight}`);
  if (letterSpacing) lines.push(`--admin-body-letter-spacing:${letterSpacing}`);
  const root = lines.length > 0 ? `:root{${lines.join(";")}}` : "";
  const justify = content.justifyText === "false" ? ".text-justify{text-align:left!important}" : "";
  return [root, justify].filter(Boolean).join(" ");
}

export type AllPageContent = {
  home: HomeContent;
  about: AboutContent;
  services: ServicesContent;
  contact: ContactContent;
  quote: QuoteContent;
  footer: FooterContent;
  typography: TypographyContent;
};

export const defaultHome: HomeContent = {
  heroEyebrow: "CONSTRUIRE AUTREMENT",
  heroTitle: "Bâtir et moderniser les infrastructures.",
  heroHook: "Bureau d'études et entreprise générale de génie civil, au service des grandes infrastructures en RDC et à l'international.",
  heroImage: IMAGES.hero.src,
  introText: "E.T.C.S Sarl (Etudes Techniques Conceptions des Structures) est une entreprise congolaise d'ingénierie et une entreprise générale, dont le siège social est établi à Kinshasa, Avenue du Port, Nouvelles Galeries Présidentielles, 5e étage, Bureau 504, commune de la Gombe.\n\nÀ l'international, une filiale établie en France, dans la région parisienne, opère comme bureau d'études de génie civil, de bâtiments et de travaux publics.\n\nE.T.C.S Sarl a pour vocation d'assurer l'ensemble des missions que comportent les études : la maîtrise d'œuvre, la vérification et la conduite des opérations pour la réalisation des grandes infrastructures de travaux publics et de génie civil.\n\nPorteuse d'une synergie de compétences et d'un élan d'innovation, E.T.C.S Sarl fournit les solutions nécessaires pour réussir à bâtir et à rénover la République.",
  phases: [
    { title: "Études préliminaires", text: "Faisabilité, avant-projets et dimensionnement des ouvrages." },
    { title: "Assistance à maîtrise d'ouvrage", text: "Programmation, études économiques et conseil au maître d'ouvrage." },
    { title: "Maîtrise d'œuvre", text: "Conception détaillée, direction et contrôle de l'exécution des travaux." },
  ],
  testimonial: { quote: "", author: "", role: "" },
  faq: [
    { question: "Quel type de projets réalise E.T.C.S Sarl ?", answer: "Des infrastructures de transport (routes, ouvrages d'art, aéroports), des bâtiments complexes et de grande hauteur, des ouvrages hydrauliques et énergétiques, ainsi que des études, de la faisabilité à la mise en service." },
    { question: "Où intervient E.T.C.S Sarl ?", answer: "Le siège social est à Kinshasa (RDC) et un bureau d'études opère à Montrouge, dans la région parisienne. Nous intervenons en RDC et à l'international." },
    { question: "Comment obtenir une estimation et des quantitatifs ?", answer: "Décrivez votre projet via le formulaire de devis et joignez vos plans (PDF, JPG, PNG). Nos ingénieurs analysent votre dossier et reviennent vers vous avec une proposition claire et documentée." },
    { question: "Quels sont vos domaines de compétences ?", answer: "Infrastructures de transport, bâtiments complexes et IGH, énergie et bâtiments industriels, aménagement urbain, environnement et développement durable." },
    { question: "E.T.C.S Sarl forme-t-elle des techniciens ?", answer: "Oui, notre centre de formations propose des modules adaptés au génie civil, au BTP et à l'architecture, dispensés par des intervenants agréés." },
  ],
  presentationTitle: "L'expertise au service de vos projets.",
  presentationImage: IMAGES.presentation.src,
  strengths: [
    "Tous les métiers pour une approche globale",
    "Ingénieurs et techniciens supérieurs expérimentés",
    "Un engagement sur les performances et la qualité",
  ],
  domainsEyebrow: "NOS DOMAINES",
  domainsTitle: "Des expertises complémentaires.",
  domainsText: "Nous mobilisons l'ensemble de nos compétences pour vos projets d'ingénierie, de génie civil, de bâtiments et de travaux publics.",
  features: [
    { title: "Études et ingénierie", text: "Études de faisabilité, avant-projets, maîtrise d'œuvre, conduite et contrôle des travaux." },
    { title: "Routes et autoroutes", text: "Ingénierie routière et autoroutière, voiries et réseaux divers, transports urbains." },
    { title: "Ouvrages d'art", text: "Ouvrages d'art courants et complexes : viaducs, ponts haubanés, tunnels." },
    { title: "Bâtiments", text: "Construction, réhabilitation, rénovation et maintenance des bâtiments et immeubles." },
    { title: "Hydraulique et assainissement", text: "Barrages et micro-barrages, centrales hydrauliques et thermiques, stations d'épuration." },
  ],
  projectsEyebrow: "NOS RÉALISATIONS",
  projectsTitle: "Des projets qui prennent forme.",
  projectsText: "Découvrez notre approche à travers les projets et les ouvrages réalisés par E.T.C.S Sarl. Chaque réalisation témoigne de notre engagement envers la qualité et la rigueur technique.",
  engagementTitle: "Pourquoi choisir E.T.C.S Sarl ?",
  engagementText: "La réussite d'un projet dans le domaine de la construction civile, des bâtiments et des travaux publics repose sur une bonne préparation, une approche technique rigoureuse et un engagement constant envers la qualité.",
  engagementImage: IMAGES.engagement.src,
  commitments: [
    { title: "Une approche sur mesure", text: "Chaque projet a ses contraintes propres : nous mettons en œuvre des procédés techniques spécifiques à chaque chantier, en parfaite adéquation avec les exigences du maître d'ouvrage." },
    { title: "Qualité de service", text: "E.T.C.S Sarl, bureau d'études et entreprise générale, accepte le risque de s'engager sur les performances et assure la qualité de son service, du dimensionnement à la réception des travaux." },
    { title: "Innovation continue", text: "Être toujours en avance sur l'innovation : faire plus beau, plus vite, moins coûteux, et tenir nos objectifs de qualité." },
    { title: "Harmonie des talents", text: "Nos équipes couvrent l'ensemble des enjeux techniques, économiques, juridiques et financiers, de l'étude de faisabilité à la mise en service." },
  ],
  quote: "E.T.C.S Sarl est porteuse et promotrice d'une synergie de compétences et d'un élan d'innovation pour fournir les solutions nécessaires pour réussir à bâtir et à moderniser les infrastructures.",
  quoteAuthor: "Etudes Techniques Conceptions des Structures",
  convictionImage: IMAGES.conviction.src,
  presenceTitle: "Notre présence congolaise et internationale",
  presenceText: "E.T.C.S Sarl, entreprise congolaise avec une filiale en France : le siège social est établi à Kinshasa, dans la commune de la Gombe, et un bureau d'études opère à Montrouge, dans la région parisienne, en tant que bureau d'études de génie civil, de bâtiments et de travaux publics.",
  newsTitle: "Les actualités d'E.T.C.S Sarl",
  ctaTitle: "Un projet ? Construisons-le ensemble.",
  ctaText: "Expliquez-nous votre besoin : nos ingénieurs vous accompagneront de l'étude de faisabilité à la mise en service de l'ouvrage.",
};

export const defaultAbout: AboutContent = {
  heroEyebrow: "E.T.C.S Sarl",
  heroTitle: "Une vision construite pour durer",
  heroText: "Ingénierie, génie civil et travaux publics — de l'étude de faisabilité à la mise en service.",
  heroImage: IMAGES.engagement.src,
  introEyebrow: "NOTRE ENGAGEMENT",
  introTitle: "Faire avancer chaque projet avec exigence",
  introText: "Etudes Techniques Conceptions des Structures (E.T.C.S Sarl) est l'une des sociétés d'ingénierie congolaises les plus importantes. Composée d'ingénieurs et de techniciens supérieurs de formation en constructions civiles et travaux publics, l'entreprise porte une grande expérience et assure la maîtrise d'œuvre, la vérification et la conduite des opérations pour les grandes infrastructures.",
  introImage: IMAGES.aproposIntro.src,
  introValues: [
    { title: "Rigueur", text: "à chaque étape du chantier" },
    { title: "Écoute", text: "de chaque besoin exprimé" },
    { title: "Vision", text: "pour un avenir construit" },
  ],
  pillarsEyebrow: "INSTITUTIONNEL",
  pillarsTitle: "Mission, vision et valeurs",
  pillars: [
    { title: "Notre mission", text: "Assurer l'ensemble des missions que comportent les études : la maîtrise d'œuvre, la vérification et la conduite des opérations pour la réalisation des grandes infrastructures de travaux publics et de génie civil." },
    { title: "Notre vision", text: "Être l'une des sociétés d'ingénierie congolaises de référence : une entreprise congolaise avec une filiale en France, reconnue pour ses grandes infrastructures en RDC et au-delà." },
    { title: "Nos valeurs", text: "S'engager sur les performances, assurer la qualité de son service, progresser chaque jour dans notre savoir-faire : harmonie des talents, construire autrement." },
  ],
  competencesEyebrow: "NOS DOMAINES",
  competencesTitle: "Nos domaines de compétences",
  competencesIntro: "E.T.C.S Sarl se distingue par son expertise pluridisciplinaire dans de nombreux domaines de l'ingénierie, notamment les transports et les infrastructures, les bâtiments, l'énergie, l'aménagement urbain, et l'environnement et le développement durable :",
  competences: [
    { title: "Infrastructures de transport", text: "Conception, modernisation et élargissement des infrastructures de transport, y compris les systèmes routiers, ferroviaires, aéroportuaires et de transports urbains. Nous accompagnons nos clients de la planification à la mise en œuvre, avec une forte expérience dans la maintenance et la réparation des infrastructures existantes.", image: IMAGES.transport.src },
    { title: "Bâtiments complexes et IGH", text: "Conception et réalisation de bâtiments complexes et de grande hauteur (IGH), avec des compétences en architecture, structure et équipements techniques. Ces projets requièrent une coordination étroite et une maîtrise des enjeux techniques et environnementaux.", image: IMAGES.batiments.src },
    { title: "Énergie et bâtiments industriels", text: "Des solutions pour les projets liés à l'énergie et aux bâtiments industriels, incluant la conception, la réalisation et la gestion des installations énergétiques et industrielles.", image: IMAGES.energie.src },
    { title: "Aménagement urbain", text: "Des projets d'aménagement urbain contribuant à la création de quartiers durables et à la réhabilitation de zones urbaines. Cela inclut la gestion de l'eau, des déchets et l'intégration de solutions de mobilité durable.", image: IMAGES.urbanisme.src },
    { title: "Environnement et développement durable", text: "Notre expertise environnementale couvre l'évaluation des impacts, la gestion des risques et le développement de solutions pour la transition énergétique et écologique, afin d'atténuer les émissions de gaz à effet de serre et de promouvoir la résilience des territoires face aux changements climatiques.", image: IMAGES.environnement.src },
  ],
  processusEyebrow: "NOS EXPERTISES",
  processusTitle: "Un accompagnement à chaque étape du projet",
  processusIntro: "Par sa diversité, E.T.C.S Sarl rassemble toutes les compétences nécessaires pour assurer la totalité des prestations couvrant toute la vie d'un projet, depuis les études de faisabilité jusqu'à la mise en service.",
  processusSteps: [
    { label: "Études préliminaires" },
    { label: "Assistance à maîtrise d'ouvrage" },
    { label: "Maîtrise d'œuvre" },
    { label: "Gestion de projet" },
    { label: "Conseil & expertise" },
  ],
  valeursEyebrow: "NOS VALEURS",
  valeursTitle: "Nos engagements au quotidien",
  valeurs: [
    { title: "Excellence", text: "La qualité comme standard d'exécution" },
    { title: "L'humain d'abord", text: "Des équipes au service de nos clients" },
    { title: "Libres d'oser", text: "L'innovation au service des projets" },
    { title: "Engagés, intègres et responsables", text: "Des engagements tenus, en toute transparence" },
  ],
  teamEyebrow: "NOTRE ÉQUIPE",
  teamTitle: "Les femmes et hommes qui portent vos projets",
  partnersEyebrow: "PARTENARIAT",
  partnersTitle: "Un réseau de compétences reconnu",
  partnersText: "E.T.C.S Sarl s'appuie sur des partenariats solides avec des acteurs de référence de l'ingénierie et de la construction.",
  partners: ["DICOMEX", "MATIERE", "SETEC", "RASEL-BEC", "SYSTRA", "EGIS", "ARTELIA", "EIFFAGE", "COLAS", "TECHNOVIA", "TOPEDEC", "DTA", "JADE", "MAP", "VINCI"],
  trainingEyebrow: "TRANSMISSION DES SAVOIRS",
  trainingTitle: "Notre centre de formations",
  trainingText: "Nos programmes d'enseignement se déclinent en modules adaptés à votre corps de métiers : génie civil, BTP et architecture. Les formations sont dispensées par des intervenants agréés, dans nos locaux ou directement chez le client.",
  trainingPoints: [
    "Utilisation des dernières versions des logiciels",
    "PC de dernières générations, un seul PC par stagiaire",
    "Sessions de 4 personnes au maximum",
    "Adaptabilité du programme en fonction des besoins",
  ],
  trainingModules: ["AutoCAD", "Micro Station", "Calcul par éléments finis", "ArmaCAD", "After", "Pack Office"],
  qualityEyebrow: "QUALITÉ & EXPERTISE",
  qualityTitle: "L'excellence comme standard d'exécution",
  qualityText: "Nos équipes appliquent des procédures de contrôle systématiques : vérification des matériaux, suivi des plans d'exécution, respect des règles de sécurité et contrôle qualité à chaque phase du chantier.\n\nCette discipline technique est le socle de la confiance que nous accordent nos partenaires institutionnels et privés.",
  qualityAsideTitle: "Un contrôle qualité à toutes les phases",
  qualityPoints: [
    "Sélection et vérification des matériaux",
    "Suivi des plans et études d'exécution",
    "Sécurité des équipes et des tiers",
    "Reporting régulier vers le client",
  ],
  ctaTitle: "Confiez-nous votre prochain ouvrage",
  ctaText: "Discutons de votre projet : nos équipes vous répondent avec une proposition claire et documentée.",
};

export const defaultServices: ServicesContent = {
  heroEyebrow: "NOS DOMAINES",
  heroTitle: "Ingénierie, génie civil, travaux publics et bâtiments",
  heroText: "Nous rassemblons un ensemble d'expertises complémentaires pour mener vos projets de l'étude de faisabilité à la mise en service, avec une approche globale de tous les métiers du secteur.",
  heroImage: IMAGES.etudes.src,
  statement: "Nous assurons l'ensemble des missions que comportent les études : la maîtrise d'œuvre, la vérification et la conduite des opérations, dans les domaines de la route, des ouvrages d'art, des voies ferrées, des aéroports, des bâtiments et des transports.",
  customEyebrow: "UNE APPROCHE SUR MESURE",
  customTitle: "Chaque projet a ses contraintes propres.",
  customText: "E.T.C.S Sarl met en œuvre des procédés techniques spécifiques à chaque chantier, pour apporter une réponse en parfaite adéquation avec les exigences du maître d'ouvrage.",
  ctaTitle: "Besoin d'une prestation précise ?",
  ctaText: "Décrivez votre besoin : nous vous répondrons avec une offre claire et adaptée à votre projet.",
};

export const defaultContact: ContactContent = {
  heroEyebrow: "CONTACT",
  heroTitle: "Entrons en contact",
  heroText: "Une question, un projet, une demande de rendez-vous ? Notre équipe vous répond.",
  hoursLabel: "Horaires",
  hours: "Lundi – Vendredi · 8h00 – 17h00",
  hoursLocation: "Kinshasa, RDC",
  formEyebrow: "FORMULAIRE",
  formTitle: "Écrivez-nous",
};

export const defaultQuote: QuoteContent = {
  heroEyebrow: "PARLONS DE VOTRE PROJET",
  heroTitle: "Demander un devis",
  heroText: "Décrivez votre besoin : les informations transmises sont destinées uniquement à E.T.C.S Sarl pour traiter votre demande.",
  stepsTitle: "Un processus simple en trois étapes",
  stepsText: "Ce formulaire est protégé contre les envois automatisés. Vos informations restent confidentielles et ne sont utilisées que pour traiter votre demande de devis.",
  steps: [
    { title: "Décrivez votre besoin", text: "Type de projet, localisation, contraintes : complétez le formulaire en quelques minutes." },
    { title: "Étude de votre demande", text: "Nos ingénieurs analysent votre dossier et préparent une proposition adaptée." },
    { title: "Réponse et rendez-vous", text: "Nous revenons vers vous avec une offre claire et, si besoin, une visite de site." },
  ],
  bannerEyebrow: "PARLONS DE VOTRE PROJET",
  bannerTitle: "Votre projet mérite une écoute attentive.",
  bannerCtaLabel: "Demander mon devis",
};

export const defaultFooter: FooterContent = {
  aboutText: "E.T.C.S Sarl — Etudes Techniques Conceptions des Structures. Ingénierie, génie civil, travaux publics et bâtiments : de l'étude de faisabilité à la mise en service.",
};

export const defaultTypography: TypographyContent = {
  headingFont: "",
  bodyFont: "",
  textScale: "100",
  lineHeight: "",
  letterSpacing: "",
  justifyText: "true",
};

export const defaultPageContent: AllPageContent = {
  home: defaultHome,
  about: defaultAbout,
  services: defaultServices,
  contact: defaultContact,
  quote: defaultQuote,
  footer: defaultFooter,
  typography: defaultTypography,
};

export function getPageLabel(page: string) {
  return pageMetas.find((meta) => meta.key === page)?.label ?? page;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMergeDefaults(defaults: unknown, saved: unknown): unknown {
  if (Array.isArray(defaults)) {
    if (Array.isArray(saved)) return saved;
    return defaults;
  }
  if (isPlainObject(defaults)) {
    const merged: Record<string, unknown> = { ...defaults };
    if (isPlainObject(saved)) {
      for (const [key, value] of Object.entries(saved)) {
        if (!(key in defaults)) continue;
        merged[key] = deepMergeDefaults(defaults[key], value);
      }
    }
    return merged;
  }
  return typeof saved === "string" ? saved : defaults;
}

export async function getPageContent<K extends PageKey>(page: K): Promise<AllPageContent[K]> {
  await connection();
  const row = await prisma.pageContent.findUnique({ where: { page } });
  return deepMergeDefaults(defaultPageContent[page], row?.data) as AllPageContent[K];
}

const MAX_TEXT = 20000;
const MAX_ITEMS = 20;

/** Normalise une liste pouvant contenir des chaînes ou des objets {label} en tableau de chaînes. */
export function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (typeof item === "object" && item !== null && typeof (item as { label?: unknown }).label === "string") return (item as { label: string }).label;
      return "";
    })
    .filter((item) => item.trim() !== "");
}

/** Normalise une liste en tableau d'objets {label} pour les répéteurs de l'admin. */
export function labelList(value: unknown): { label: string }[] {
  return stringList(value).map((label) => ({ label }));
}

function sanitize(value: unknown): unknown | null {
  if (typeof value === "string") return value.length <= MAX_TEXT ? value : null;
  if (Array.isArray(value)) {
    if (value.length > MAX_ITEMS) return null;
    const items = value.map(sanitize);
    return items.some((item) => item === null) ? null : items;
  }
  if (isPlainObject(value)) {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      const clean = sanitize(item);
      if (clean === null || !/^[a-zA-Z][a-zA-Z0-9_]{0,40}$/.test(key)) return null;
      result[key] = clean;
    }
    return result;
  }
  return null;
}

function assignPath(root: Record<string, unknown>, path: string[], value: string) {
  let node: Record<string, unknown> = root;
  for (let i = 0; i < path.length - 1; i++) {
    const part = path[i];
    if (part.startsWith("__")) return;
    const nextIndex = /^\d+$/.test(path[i + 1]);
    if (!(part in node) || typeof node[part] !== "object" || node[part] === null) {
      node[part] = nextIndex ? [] : {};
    }
    node = node[part] as Record<string, unknown>;
  }
  const last = path[path.length - 1];
  if (last.startsWith("__")) return;
  if (/^\d+$/.test(last)) {
    const list = node as unknown as unknown[];
    const index = Number(last);
    while (list.length <= index) list.push(undefined);
    list[index] = value;
  } else {
    node[last] = value;
  }
}

/** Reconstruit un objet à partir des champs du formulaire (`name`, `features[0][title]`, …). */
export function parsePageContentForm(formData: FormData): Record<string, unknown> {
  const root: Record<string, unknown> = {};
  for (const [rawKey, rawValue] of formData.entries()) {
    if (rawKey === "page" || typeof rawValue !== "string") continue;
    const path = rawKey.split(/[\[\]]+/).filter(Boolean).map((part) => part);
    if (path.length === 0 || path.some((part) => part.length > 60)) continue;
    assignPath(root, path, rawValue);
  }
  const hasContent = (value: unknown): boolean => {
    if (value === undefined || value === null) return false;
    if (typeof value === "string") return value.trim() !== "";
    if (isPlainObject(value)) return Object.values(value).some(hasContent);
    if (Array.isArray(value)) return value.some(hasContent);
    return true;
  };
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(root)) {
    if (!hasContent(value)) continue;
    if (typeof value === "string") {
      cleaned[key] = value.trim();
    } else if (Array.isArray(value)) {
      cleaned[key] = value.filter(hasContent).map((item) => (typeof item === "string" ? item.trim() : item));
    } else if (isPlainObject(value)) {
      const sub: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value)) {
        if (typeof v === "string") { if (v.trim() !== "") sub[k] = v.trim(); }
        else sub[k] = v;
      }
      cleaned[key] = sub;
    }
  }
  return cleaned;
}

export async function persistPageContent(page: PageKey, formData: FormData) {
  const raw = parsePageContentForm(formData);
  const clean = sanitize(raw);
  if (!clean || !isPlainObject(clean)) throw new Error("Contenu de page invalide.");
  const data = clean as Prisma.InputJsonValue;
  await prisma.pageContent.upsert({ where: { page }, update: { data }, create: { page, data } });
}
