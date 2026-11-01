type Entry = { count: number; resetAt: number };

const entries = new Map<string, Entry>();

export function isRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = entries.get(key);
  if (!entry || entry.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

export function clientKey(request: Request, scope: string) {
  // Deployment proxies must overwrite this header with the actual client address.
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return `${scope}:${address}`;
}
