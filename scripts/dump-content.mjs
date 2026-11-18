import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [services, projects, articles, team] = await Promise.all([
    prisma.service.findMany(),
    prisma.project.findMany(),
    prisma.article.findMany(),
    prisma.teamMember.findMany(),
  ]);
  console.log("SERVICES:", services.map((s) => `${s.slug} | ${s.title} | ${s.publicationStatus} | ${s.description.slice(0, 60)}`));
  console.log("PROJECTS:", projects.map((p) => `${p.slug} | ${p.title} | ${p.publicationStatus}`));
  console.log("ARTICLES:", articles.map((a) => `${a.slug} | ${a.title} | ${a.publicationStatus}`));
  console.log("TEAM:", team.map((t) => `${t.name} | ${t.role}`));
}

main().then(() => prisma.$disconnect());
