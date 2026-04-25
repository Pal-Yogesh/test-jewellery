"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  "https://i.pinimg.com/1200x/97/20/44/972044bcd12b64b342d532f6a11b6666.jpg",
  "https://i.pinimg.com/736x/e9/d6/b0/e9d6b0103854e095997bd8a7b6d776fa.jpg",
  "https://i.pinimg.com/736x/dc/41/6f/dc416f68be573e0c41e6ba2411c13280.jpg",
  "https://i.pinimg.com/1200x/65/25/eb/6525ebd1351659aa94b618162251c257.jpg",
  "https://i.pinimg.com/1200x/c0/33/17/c0331726c851e1f48385441204108e17.jpg",
];

const DURATION = 4500;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, DURATION);
    return () => clearTimeout(id);
  }, [current, paused, next]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false}>
        <motion.img
          key={current}
          src={SLIDES[current]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] as const }}
          draggable={false}
        />
      </AnimatePresence>

      {/* BRAND logo — absolute inside hero, never leaks outside */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none select-none">
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(10rem, 20vw, 14rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "#fff",
            lineHeight: 1,
            display: "block",
            textShadow: "0 2px 40px rgba(0,0,0,0.18)",
          }}
        >
          BRAND
        </span>
      </div>

      {/* Arrow buttons */}
      <button
        onClick={prev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#C8102E] hover:bg-[#a00d24] flex items-center justify-center transition-colors duration-200 shadow-lg"
        aria-label="Previous"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#C8102E] hover:bg-[#a00d24] flex items-center justify-center transition-colors duration-200 shadow-lg"
        aria-label="Next"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Progress dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className="relative overflow-hidden rounded-full transition-all duration-500"
            style={{
              width: i === current ? 28 : 8,
              height: 4,
              background: i === current ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.4)",
            }}
          >
            {i === current && (
              <motion.span
                key={`progress-${current}`}
                className="absolute inset-0 rounded-full bg-white"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ duration: DURATION / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
