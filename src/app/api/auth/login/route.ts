import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { clientKey, isRateLimited } from "@/lib/rate-limit";

const input = z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1) });

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 4096) return NextResponse.json({ error: "Requête trop volumineuse." }, { status: 413 });
  if (isRateLimited(clientKey(request, "login"), 5, 15 * 60 * 1000)) return NextResponse.json({ error: "Trop de tentatives. Réessayez plus tard." }, { status: 429 });
  const parsed = input.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) return NextResponse.json({ error: "Service d'authentification indisponible." }, { status: 503 });
  try {
    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!user || !await bcrypt.compare(parsed.data.password, user.passwordHash)) return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const token = await new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" }).setSubject(user.id).setIssuedAt().setExpirationTime("8h").sign(secret);
    const response = NextResponse.json({ ok: true });
    response.cookies.set("etcs_admin", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
    return response;
  } catch (error) {
    try { (await import("fs")).appendFileSync("error.log", `\n[${new Date().toISOString()}] [login] ${error instanceof Error ? error.stack : String(error)}\n`); } catch {}
    return NextResponse.json({ error: "Service d'authentification indisponible." }, { status: 503 });
  }
}
