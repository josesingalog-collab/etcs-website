import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const { PrismaClient } = await import("@prisma/client");
const prisma = new PrismaClient();
try {
  const count = await prisma.user.count();
  console.info(count === 0 ? "No administrator account exists." : "At least one administrator account exists.");
} finally {
  await prisma.$disconnect();
}
