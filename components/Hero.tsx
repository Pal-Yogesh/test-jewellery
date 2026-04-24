"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SLIDES = [
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1800&q=90",
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1800&q=90",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1800&q=90",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1800&q=90",
];

const DURATION = 4500;

const CATEGORIES = [
  { label: "Earrings", href: "/collections/earrings", image: "https://shopnimai.in/cdn/shop/files/Frame_21.png?v=1765890566&width=900" },
  { label: "Rings", href: "/collections/rings", image: "https://shopnimai.in/cdn/shop/files/Frame_22.png?v=1765890565&width=900" },
  { label: "Neckpieces", href: "/collections/neckpieces", image: "https://shopnimai.in/cdn/shop/files/Frame_20.png?v=1765890268&width=900" },
  { label: "Bangles", href: "/collections/bangles", image: "https://shopnimai.in/cdn/shop/files/Frame_23.png?v=1765890559&width=900" },
];

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
    <div className="bg-white">
      {/* ── Banner ── */}
      <div
        className="px-4 sm:px-6 lg:px-16 lg:pt-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <section
          className="relative w-full overflow-hidden"
          style={{ height: "calc(100vh - 72px)", borderRadius: "24px" }}
        >
          {/* Slides — crossfade + subtle zoom */}
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
      </div>

      {/* ── Category Row ── */}
      <div className="px-5 sm:px-8 lg:px-16 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <a key={cat.label} href={cat.href} className="group flex flex-col items-center">
              <div className="relative w-full overflow-hidden rounded-sm bg-[#f5f3f0]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p
                className="mt-3 text-center text-sm tracking-[0.15em] uppercase text-gray-800 group-hover:text-[#C8102E] transition-colors duration-200 font-medium"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {cat.label}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
