export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text?: string; image?: string | null }) {
  return (
    <section className="relative isolate overflow-hidden bg-anthracite pt-32 text-white">
      {image && (
        <div className="absolute inset-0 after:absolute after:inset-0 after:bg-gradient-to-t after:from-anthracite after:via-anthracite/85 after:to-anthracite/40">
          <div className="h-full w-full bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${image})` }} />
        </div>
      )}
      <div className={`relative ${image ? "" : "grid-lines"}`}>
        <div className="rise mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="flex items-center gap-3 text-xs font-bold tracking-[.22em] text-gold">
            <span className="h-px w-10 bg-gold" />{eyebrow}
          </p>
          <h1 className="display mt-6 max-w-3xl text-4xl uppercase leading-[1.05] md:text-5xl lg:text-6xl">{title}</h1>
          {text && <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">{text}</p>}
        </div>
      </div>
      <div className="absolute bottom-0 h-1 w-full bg-gradient-to-r from-royal via-gold to-royal" aria-hidden="true" />
    </section>
  );
}
