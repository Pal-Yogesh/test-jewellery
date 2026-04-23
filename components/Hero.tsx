"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavArrow from "./NavArrow";

const SLIDES = [
  "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=1600&q=90",
  "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600&q=90",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=90",
];

const DURATION = 2000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % SLIDES.length),
    [],
  );
  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, DURATION);
    return () => clearTimeout(id);
  }, [current, paused, next]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#f5f3f0]"
      style={{ height: "calc(100vh - 0px)" }}
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
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          draggable={false}
        />
      </AnimatePresence>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-white/70 hover:bg-white text-gray-800 hover:text-[#C8102E] transition-all rounded-full backdrop-blur-sm border border-white/40"
        aria-label="Previous"
      >
        <NavArrow direction="left" />
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-white/70 hover:bg-white text-gray-800 hover:text-[#C8102E] transition-all rounded-full backdrop-blur-sm border border-white/40"
        aria-label="Next"
      >
        <NavArrow direction="right" />
      </button>

      {/* Brand watermark */}
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none select-none">
        <span
          className="text-white/30 font-bold tracking-[0.35em] uppercase"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(12rem, 21vw, 14rem)",
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

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                background: i === current ? "#C8102E" : "rgba(255,255,255,0.6)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
