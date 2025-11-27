"use client";
import React, { useState, useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode[];
  className?: string;
};

export default function SimpleCarousel({ children, className }: Props) {
  const slides = React.Children.toArray(children);
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const clamp = (i: number) => (i + slides.length) % slides.length;
  const prev = () => setIndex((i) => clamp(i - 1));
  const next = () => setIndex((i) => clamp(i + 1));

  // keyboard nav (left/right)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={className} aria-roledescription="carousel">
      {/* viewport */}
      <div className="overflow-hidden rounded-lg border-2 border-zinc-700">
        {/* track */}
        <div
          ref={trackRef}
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((child, i) => (
            <div
              key={i}
              className="w-full shrink-0 grow-0 basis-full p-4"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="mt-3 flex items-center justify-between">
        <button onClick={prev} className="snes-button" aria-label="Previous">
          ◀
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-blue-500" : "bg-zinc-600"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="snes-button" aria-label="Next">
          ▶
        </button>
      </div>
    </div>
  );
}
