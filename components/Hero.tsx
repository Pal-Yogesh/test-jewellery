"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.76, 0, 0.24, 1] as const;

export default function Hero() {
  const lineRef = useRef<HTMLSpanElement>(null);

  // Animate the red underline on mount
  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.style.transform = "scaleX(1)";
    }
  }, []);

  return (
    <section className="w-full bg-[#faf9f7] overflow-hidden">
      <div className=" px-5 sm:px-8 lg:px-18 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[88vh] lg:min-h-[82vh]">
          {/* ── Left: Text ── */}
          <div className="flex flex-col justify-center py-16 lg:py-0 pr-0 lg:pr-16 order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="text-[10px] tracking-[0.28em] px-3 uppercase text-[#C8102E] font-semibold">
                New Collection · 2026
              </span>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.18 }}
                className="text-gray-900 font-bold leading-[1.05]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(3rem, 6vw, 5.2rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                Crafted for
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.26 }}
                className="font-bold leading-[1.05] relative inline-block"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(3rem, 6vw, 5.2rem)",
                  letterSpacing: "-0.01em",
                  color: "#C8102E",
                  fontStyle: "italic",
                }}
              >
                Every Story
                <span
                  ref={lineRef}
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "#C8102E",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition:
                      "transform 0.9s cubic-bezier(0.76,0,0.24,1) 0.7s",
                  }}
                />
              </motion.h1>
            </div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.38 }}
              className="text-gray-500 leading-relaxed max-w-sm mb-10"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Handcrafted silver jewellery by India&apos;s finest artisan
              collectives. Each piece carries a century of tradition — worn by
              those who value the art of adornment.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.48 }}
              className="flex items-center gap-5 flex-wrap"
            >
              <a
                href="/collections"
                className="group relative overflow-hidden bg-[#C8102E] text-white text-[11px] tracking-[0.22em] uppercase font-bold px-8 py-3.5 rounded-sm inline-flex items-center gap-2 transition-all hover:bg-[#a00d24]"
              >
                Shop Now
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="/about"
                className="text-[11px] tracking-[0.22em] uppercase font-semibold text-gray-500 hover:text-gray-900 transition-colors border-b border-gray-300 hover:border-gray-900 pb-0.5"
              >
                Our Story
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease, delay: 0.62 }}
              className="flex items-center gap-8 mt-14 pt-8 border-t border-gray-200"
            >
              {[
                { num: "40+", label: "Artisan Designers" },
                { num: "2K+", label: "Unique Pieces" },
                { num: "15K+", label: "Happy Customers" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-gray-900 font-bold leading-none mb-1"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.8rem",
                    }}
                  >
                    {s.num}
                  </p>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400 font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Image ── */}
          <div className="relative order-1 lg:order-2 h-[55vw] sm:h-[50vw] lg:h-auto">
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease, delay: 0.1 }}
              className="absolute inset-0 lg:inset-y-8"
            >
              <img
                src="https://images.unsplash.com/photo-1630019852942-f89202989a59?w=900&q=85"
                alt="Handcrafted jewellery"
                className="w-full h-full object-cover rounded-sm"
              />
              {/* Subtle warm overlay */}
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 60%, rgba(250,249,247,0.35) 100%)",
                }}
              />
            </motion.div>

            {/* Floating badge — top left */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.7 }}
              className="absolute top-6 -left-4 lg:-left-8 bg-white shadow-lg rounded-sm px-4 py-3 z-10"
            >
              <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-0.5">
                New In
              </p>
              <p
                className="text-sm font-bold text-gray-900"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Bridal Edit 2026
              </p>
            </motion.div>

            {/* Floating badge — bottom right */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.82 }}
              className="absolute bottom-10 -right-4 lg:-right-6 bg-[#C8102E] text-white rounded-sm px-4 py-3 z-10 max-w-[160px]"
            >
              <p className="text-[9px] tracking-[0.2em] uppercase text-white/70 mb-0.5">
                Handcrafted
              </p>
              <p
                className="text-sm font-bold leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Pure Silver · Artisan Made
              </p>
            </motion.div>

            {/* Decorative dot grid */}
            <div
              className="absolute -bottom-4 -left-4 w-24 h-24 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #C8102E 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom marquee strip */}
      <div className="border-t border-gray-200 overflow-hidden py-3 mt-2">
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].flatMap((_, copy) =>
            [
              "Handcrafted Silver",
              "Jadau",
              "Meenakari",
              "Kundan",
              "Filigree",
              "Temple Jewellery",
              "Bridal Sets",
              "Oxidised Silver",
            ].map((t, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center gap-4 shrink-0"
              >
                <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 font-medium">
                  {t}
                </span>
                <span className="text-[#C8102E] text-xs">✦</span>
              </span>
            )),
          )}
        </motion.div>
      </div>

      {/* Boxes of products */}

      <div className="px-5 sm:px-8 lg:px-18  py-14">
        <div className="flex justify-center items-center gap-5">
          <div>
            <Image
              src="https://shopnimai.in/cdn/shop/files/Frame_21.png?v=1765890566&width=900"
              alt="img"
              width={1000}
              height={1000}
              className="w-100% h-100%"
            />
            <div className="uppercase text-center pt-3">earrings</div>
          </div>
          <div>
            <Image
              src="https://shopnimai.in/cdn/shop/files/Frame_22.png?v=1765890565&width=900"
              alt="img"
              width={1000}
              height={1000}
              className="w-100% h-100%"
            />
            <div className="uppercase text-center pt-3">rings</div>
          </div>
          <div>
            <Image
              src="https://shopnimai.in/cdn/shop/files/Frame_20.png?v=1765890268&width=900"
              alt="img"
              width={1000}
              height={1000}
              className="w-100% h-100%"
            />
            <div className="uppercase text-center pt-3">neckpieces</div>
          </div>
          <div>
            <Image
              src="https://shopnimai.in/cdn/shop/files/Frame_23.png?v=1765890559&width=900"
              alt="img"
              width={1000}
              height={1000}
              className="w-100% h-100%"
            />
            <div className="uppercase text-center pt-3">bangles</div>
          </div>
        </div>
      </div>
    </section>
  );
}
