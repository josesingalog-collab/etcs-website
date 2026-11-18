import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const OLD_SLUGS = ["construction-batiment", "genie-civil", "travaux-publics", "rehabilitation-renovation", "etudes-ingenierie"];

const ETCS_SERVICES = [
  {
    slug: "genie-civil-ouvrages-art",
    title: "Génie civil & ouvrages d'art",
    excerpt: "Conception et réalisation d'ouvrages d'art courants et complexes : viaducs, ponts haubanés, échangeurs.",
    description: "ETCS réalise des ouvrages d'art courants et complexes : viaducs, ponts haubanés, échangeurs et structures majeures. Nos ingénieurs gèrent des projets complexes et leurs expertises dans les technologies du sol, les structures et l'ingénierie font référence.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "ingenierie-routiere",
    title: "Ingénierie routière et autoroutière",
    excerpt: "Études, construction et suivi de routes, autoroutes, voiries et réseaux divers.",
    description: "Routes et autoroutes, voiries urbaines, réseaux divers : nous réalisons tous types d'infrastructures de mobilité, depuis les études préliminaires et avant-projets jusqu'à la conduite et au contrôle des travaux.",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "barrages-hydraulique",
    title: "Barrages & travaux hydrauliques",
    excerpt: "Barrages, micro-barrages, centrales hydrauliques et thermiques, stations d'épuration.",
    description: "Barrages et micro-barrages, centrales hydrauliques et thermiques, stations d'épuration, travaux hydrauliques et d'assainissement : nos équipes assurent les études, la maîtrise d'œuvre et la surveillance des chantiers.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "aeroports-voies-ferrees",
    title: "Aéroports, ports & voies ferrées",
    excerpt: "Aménagement d'aéroports, de ports et quais, et d'infrastructures ferroviaires.",
    description: "Aménagement d'aéroports, de ports et quais, construction et réhabilitation d'infrastructures ferroviaires : une expertise complète au service de l'ouverture des territoires.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "batiments",
    title: "Bâtiments & immeubles",
    excerpt: "Construction, réhabilitation, rénovation et maintenance d'hôpitaux, écoles, bâtiments industriels et complexes sportifs.",
    description: "Hôpitaux, écoles, bâtiments industriels, complexes sportifs, logements : nous accompagnons les acteurs publics et privés pour la construction, la réhabilitation, la rénovation, l'entretien et la maintenance des bâtiments et immeubles.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "etudes-conseils",
    title: "Études, conseils & surveillance",
    excerpt: "Études de faisabilité, avant-projets, consultations techniques, conduite et contrôle des travaux.",
    description: "Études de faisabilité, avant-projets, consultations techniques, maîtrise d'œuvre, conduite et contrôle des travaux : notre personnel assure la totalité des prestations, couvrant les enjeux techniques, économiques, juridiques et financiers des projets.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
  },
];

async function main() {
  const deleted = await prisma.service.deleteMany({ where: { slug: { in: OLD_SLUGS } } });
  console.log(`Anciens services supprimés : ${deleted.count}`);
  for (const service of ETCS_SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: { ...service, publicationStatus: "PUBLISHED" },
      create: { ...service, publicationStatus: "PUBLISHED" },
    });
  }
  console.log("Services ETCS publiés : 6");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
