"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Slide = { src: string; alt: string };

/** Diaporama du hero : images qui se succèdent en fondu croisé, ordre aléatoire.
 * dimmed : image atténuée (opacity 55 %) pour recevoir une superposition sombre, comme la section citation.
 * Désactivé si prefers-reduced-motion (première image fixe). */
export function HeroSlideshow({ images, dimmed = false }: { images: Slide[]; dimmed?: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || images.length < 2) return;
    // départ aléatoire après montage (sans décalage d'hydratation)
    const startTimer = setTimeout(() => {
      setIndex(Math.floor(Math.random() * images.length));
    }, 0);
    const timer = setInterval(() => {
      setIndex((current) => (current + 1 + Math.floor(Math.random() * (images.length - 1))) % images.length);
    }, 6000);
    return () => {
      clearTimeout(startTimer);
      clearInterval(timer);
    };
  }, [images.length]);

  return (
    <div className="absolute inset-0" aria-hidden={false}>
      {images.map((image, slideIndex) => (
        <div key={image.src} className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${dimmed ? "opacity-55" : ""}`} style={{ opacity: slideIndex === index ? (dimmed ? 0.55 : 1) : 0 }}>
          <Image
            src={image.src}
            alt={slideIndex === index ? image.alt : ""}
            fill
            priority={slideIndex === 0}
            sizes="100vw"
            className="kenburns object-cover"
          />
        </div>
      ))}
    </div>
  );
}
