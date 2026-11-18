import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ETCS = {
  companyName: "ETCS SARL",
  phone: "+243 824 074 869",
  email: "etsinfo@etcs-ingenierie.com",
  address: "14, Avenue du Marché, Commune de la Gombe, Kinshasa, RDC",
  aboutText: [
    "ETCS SARL (Etudes Techniques Conceptions des Structures) est une entreprise congolaise d'ingénierie et une entreprise générale, dont le siège social est établi à Kinshasa, 14, Avenue du Marché, commune de la Gombe.",
    "À l'international, une filiale établie en France, dans la région parisienne, opère comme bureau d'études de génie civil, de bâtiments et de travaux publics.",
    "ETCS a pour vocation d'assurer l'ensemble des missions que comportent les études : la maîtrise d'œuvre, la vérification et la conduite des opérations pour la réalisation des grandes infrastructures de travaux publics et de génie civil.",
    "Porteuse d'une synergie de compétences et d'un élan d'innovation, ETCS fournit les solutions nécessaires pour réussir à bâtir et à rénover la République.",
  ].join("\n\n"),
};

async function main() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!settings) {
    await prisma.siteSettings.create({ data: { id: 1, ...ETCS } });
    console.log("SiteSettings créé avec les coordonnées ETCS.");
    return;
  }

  const data = {};
  if (settings.companyName !== ETCS.companyName) data.companyName = ETCS.companyName;
  if (settings.phone !== ETCS.phone) data.phone = ETCS.phone;
  if (settings.email !== ETCS.email) data.email = ETCS.email;
  if (settings.address !== ETCS.address) data.address = ETCS.address;
  if (!settings.aboutText?.trim() || /GTGC/i.test(settings.aboutText)) data.aboutText = ETCS.aboutText;

  if (Object.keys(data).length === 0) {
    console.log("SiteSettings déjà à jour.");
    return;
  }
  await prisma.siteSettings.update({ where: { id: 1 }, data });
  console.log("SiteSettings mis à jour :", Object.keys(data).join(", "));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
