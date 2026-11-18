import Image from "next/image";

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text?: string; image?: string | null }) {
  return (
    <section className="relative isolate bg-vinci text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-0 pt-32 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pt-36">
        <div className="rise lg:pb-24">
          <p className="text-xs font-bold tracking-[.22em] text-vinci-sky">{eyebrow}</p>
          <h1 className="display mt-6 max-w-3xl text-4xl leading-[1.08] md:text-5xl">{title}</h1>
          {text && <p className="mt-6 max-w-xl text-base leading-7 text-slate-100">{text}</p>}
        </div>
        {image ? (
          <div className="kenburns-wrap rise relative z-10 hidden lg:block lg:translate-y-24">
            <div className="relative aspect-[3/2] overflow-hidden bg-vinci-navy shadow-2xl shadow-vinci-navy/40">
              <Image src={image} alt={title} fill sizes="(max-width:1024px) 100vw, 50vw" priority className="kenburns object-cover" />
            </div>
          </div>
        ) : (
          <div className="grid-lines hidden lg:block" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}
