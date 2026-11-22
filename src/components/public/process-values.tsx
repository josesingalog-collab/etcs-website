import { BookOpenCheck, DraftingCompass, HardHat, Settings, MessagesSquare, Award, HeartHandshake, Lightbulb, BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/public/sections";
import { Reveal } from "@/components/public/reveal";

const processusIcons = [BookOpenCheck, DraftingCompass, HardHat, Settings, MessagesSquare];
const valeurIcons = [Award, HeartHandshake, Lightbulb, BadgeCheck];

export function ProcessTimeline({ eyebrow, title, intro, steps }: { eyebrow: string; title: string; intro?: string; steps: { label: string }[] }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal><SectionHeading align="center" eyebrow={eyebrow} title={title} /></Reveal>
        {intro && (
          <Reveal delay={0.05}>
            <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-slate-600">{intro}</p>
          </Reveal>
        )}
        <div className="relative mt-16">
          <div className="absolute left-[10%] right-[10%] top-10 hidden border-t-2 border-dashed border-royal/25 lg:block" aria-hidden="true" />
          <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = processusIcons[index % processusIcons.length];
              return (
                <Reveal key={step.label} delay={index * 0.07} className="flex flex-col items-center text-center">
                  <span className="relative grid h-20 w-20 place-items-center rounded-full bg-royal text-white shadow-xl shadow-royal/30">
                    <Icon className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <p className="mt-4 max-w-[12rem] text-sm font-black uppercase leading-snug tracking-wide text-royal">{step.label}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ValuesChips({ eyebrow, title, values }: { eyebrow: string; title: string; values: { title: string; text?: string }[] }) {
  return (
    <section className="bg-mist py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal><SectionHeading align="center" eyebrow={eyebrow} title={title} /></Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((valeur, index) => {
            const Icon = valeurIcons[index % valeurIcons.length];
            return (
              <Reveal key={valeur.title} delay={index * 0.06} className="text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-royal text-white shadow-lg shadow-royal/30">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <p className="mt-4 text-base font-extrabold text-anthracite">{valeur.title}</p>
                {valeur.text && <p className="mt-1 text-xs leading-5 text-slate-500">{valeur.text}</p>}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
