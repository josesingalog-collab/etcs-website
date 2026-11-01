import bcrypt from "bcryptjs";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const { PrismaClient } = await import("@prisma/client");

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
if (!email || !password || password.length < 12) {
  throw new Error("Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters before running this command.");
}
const prisma = new PrismaClient();
try {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("An administrator with this email already exists. No account was changed.");
  await prisma.user.create({ data: { email, passwordHash: await bcrypt.hash(password, 12) } });
  console.info("Administrator account created.");
} finally {
  await prisma.$disconnect();
}
