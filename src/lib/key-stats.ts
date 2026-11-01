export type KeyStat = { label: string; value: string };

export function parseKeyStats(raw: unknown): KeyStat[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((entry): entry is { label: string; value: string } => {
      if (!entry || typeof entry !== "object") return false;
      const { label, value } = entry as Record<string, unknown>;
      return typeof label === "string" && label.trim().length > 0 && typeof value === "string" && value.trim().length > 0;
    })
    .map((entry) => ({ label: entry.label.trim().slice(0, 80), value: entry.value.trim().slice(0, 40) }))
    .slice(0, 6);
}
