"use client";

import { useEffect, useState } from "react";

export type HeroPhrase = { lines: string[]; className: string };

/** Transition de textes du hero : « Construire autrement » puis le titre, en fondu glissé.
 * Texte fixe (le titre) si prefers-reduced-motion. */
export function HeroTextTransition({ phrases }: { phrases: HeroPhrase[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || phrases.length < 2) {
      const settle = setTimeout(() => setIndex(phrases.length - 1), 0);
      return () => clearTimeout(settle);
    }
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <span className="grid justify-items-center">
      {phrases.map((phrase, phraseIndex) => (
        <span
          key={phraseIndex}
          aria-hidden={phraseIndex !== index}
          className={`col-start-1 row-start-1 block transition-all duration-1000 ease-out ${phrase.className} ${phraseIndex === index ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4"}`}
        >
          {phrase.lines.map((line, lineIndex) => (
            <span key={lineIndex} className="block">{line}</span>
          ))}
        </span>
      ))}
    </span>
  );
}
