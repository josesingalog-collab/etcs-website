import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { clientKey, isRateLimited } from "@/lib/rate-limit";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  "application/pdf": "pdf",
  "image/png": "png",
  "image/jpeg": "jpg",
};

/** Upload public d'un plan ou document joint à une demande de devis (PDF/JPG/PNG, 10 Mo max). */
export async function POST(request: Request) {
  if (isRateLimited(clientKey(request, "plans"), 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Trop d'envois. Réessayez plus tard." }, { status: 429 });
  }
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  const ext = ALLOWED[file.type];
  if (!ext) return NextResponse.json({ error: "Format non supporté. Utilisez PDF, JPG ou PNG." }, { status: 415 });
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "Fichier trop volumineux (10 Mo maximum)." }, { status: 413 });
  const base =
    file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "plan";
  const name = `${base}-${randomBytes(4).toString("hex")}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "plans");
  try {
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  } catch {
    return NextResponse.json({ error: "Écriture impossible sur le serveur." }, { status: 500 });
  }
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  const host = request.headers.get("host");
  const origin = host ? `${proto}://${host}` : new URL(request.url).origin;
  return NextResponse.json({ url: `${origin}/uploads/plans/${name}` }, { status: 201 });
}
