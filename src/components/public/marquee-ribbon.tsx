/** Ruban défilant type référence : texte en capitales séparées par des étoiles. */
export function MarqueeRibbon({ items, dark = true }: { items: string[]; dark?: boolean }) {
  if (items.length === 0) return null;
  const row = [...items, ...items];
  return (
    <div className="marquee overflow-hidden py-4" style={{ backgroundColor: dark ? "var(--plan-navy)" : "var(--plan-paper)" }} role="presentation">
      <div className="marquee-track">
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8 pr-8 text-sm font-black uppercase tracking-[.18em]" style={{ color: dark ? "var(--plan-sky)" : "var(--plan-accent)" }}>
            {item}
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: dark ? "var(--plan-accent)" : "var(--plan-navy)" }} aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
