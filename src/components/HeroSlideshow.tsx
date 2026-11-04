"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type HeroSlide = {
  src: string;
  alt: string;
  unoptimized?: boolean; // true for images uploaded from the admin panel
};

const INTERVAL_MS = 4000; // time each image stays on screen

/**
 * Hero background images. With one image it simply shows it;
 * with two or more it fades smoothly to the next one every 4 seconds.
 */
export default function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="absolute inset-0">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={i === active ? slide.alt : ""}
          aria-hidden={i === active ? undefined : true}
          fill
          priority={i === 0}
          quality={85}
          sizes="100vw"
          unoptimized={slide.unoptimized}
          className={`object-cover object-center transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}