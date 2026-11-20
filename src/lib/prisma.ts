import { PrismaClient } from "@prisma/client";

type Client = PrismaClient;
const globalForPrisma = global as unknown as { etcsPrisma?: Client };

function createClient(): Client {
  return new PrismaClient();
}

function currentClient(): Client {
  if (!globalForPrisma.etcsPrisma) globalForPrisma.etcsPrisma = createClient();
  return globalForPrisma.etcsPrisma;
}

function resetClient() {
  const instance = globalForPrisma.etcsPrisma;
  globalForPrisma.etcsPrisma = undefined;
  if (instance) {
    try { void instance.$disconnect(); } catch { /* moteur deja plante */ }
  }
}

/** Détecte les pannes irrécupérables du moteur de requêtes (paniques observées sur hébergement mutualisé CloudLinux). */
function isFatalEngineError(error: unknown): boolean {
  const message = String((error as Error)?.message ?? error);
  return /RustPanic|timer has gone away|query engine|PANIC/i.test(message);
}

async function run<T>(call: (client: Client) => Promise<T>): Promise<T> {
  try {
    return await call(currentClient());
  } catch (error) {
    if (!isFatalEngineError(error)) throw error;
    resetClient();
    return call(currentClient());
  }
}

/**
 * Client Prisma avec auto-réparation : si le moteur plante, il est recréé et la requête rejouée une fois.
 * L'objet se comporte comme un PrismaClient classique (prisma.user.findUnique, prisma.$transaction…).
 */
export const prisma = new Proxy({} as Client, {
  get(_target, property) {
    if (property === "then" || property === "catch" || property === "finally") return undefined;
    const value = (currentClient() as unknown as Record<string | symbol, unknown>)[property];
    if (typeof value === "function") {
      return (...args: unknown[]) => run((client) => ((client as unknown as Record<string | symbol, (...args: unknown[]) => Promise<unknown>>)[property])(...args));
    }
    const delegates = currentClient() as unknown as Record<string | symbol, Record<string | symbol, unknown>>;
    const delegate = (delegates[property] ?? {}) as Record<string | symbol, unknown>;
    return new Proxy(delegate, {
      get(_delegateTarget, subProperty) {
        const subValue = (currentClient() as unknown as Record<string | symbol, Record<string | symbol, unknown>>)[property]?.[subProperty];
        if (typeof subValue !== "function") return subValue;
        return (...args: unknown[]) => run((client) => (client as unknown as Record<string | symbol, Record<string | symbol, (...args: unknown[]) => Promise<unknown>>>)[property]?.[subProperty](...args));
      },
    });
  },
}) as Client;

if (process.env.NODE_ENV !== "production") {
  const globalForDev = global as unknown as { etcsPrismaProxy?: Client };
  globalForDev.etcsPrismaProxy = prisma;
}
