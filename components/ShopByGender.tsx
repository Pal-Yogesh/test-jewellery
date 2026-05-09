"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const CATEGORIES = [
  {
    label: "Women",
    href: "/collections/women",
    image: "https://i.pinimg.com/1200x/97/20/44/972044bcd12b64b342d532f6a11b6666.jpg",
    count: "120+ Pieces",
  },
  {
    label: "Men",
    href: "/collections/men",
    image: "https://i.pinimg.com/736x/e9/d6/b0/e9d6b0103854e095997bd8a7b6d776fa.jpg",
    count: "85+ Pieces",
  },
  {
    label: "Brands",
    href: "/collections/brands",
    image: "https://i.pinimg.com/736x/dc/41/6f/dc416f68be573e0c41e6ba2411c13280.jpg",
    count: "40+ Designers",
  },
];

function CategoryCard({ cat, index }: { cat: typeof CATEGORIES[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      ref={ref}
      href={cat.href}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.2, delay: index * 0.2, ease }}
      className="group relative block overflow-hidden rounded-2xl"
      style={{ height: "clamp(400px, 55vh, 580px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image with zoom */}
      <motion.img
        src={cat.image}
        alt={cat.label}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 1.2, ease }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-[#2D1215]/80 via-[#2D1215]/25 to-transparent group-hover:from-[#2D1215]/90 transition-all duration-700" />

      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-3 rounded-xl border border-white/0 group-hover:border-white/15 transition-all duration-700 pointer-events-none"
      />

      {/* Center label — large */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.span
          className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-medium mb-3"
          animate={{ opacity: hovered ? 1 : 0.5, y: hovered ? -4 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {cat.count}
        </motion.span>

        <motion.h3
          className="text-white font-bold text-center"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.01em" }}
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {cat.label}
        </motion.h3>

        {/* Expanding line under text */}
        <motion.div
          className="h-[2px] bg-[#D4A843] mt-3 rounded-full"
          animate={{ width: hovered ? 80 : 32, opacity: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.6, ease }}
        />

        {/* CTA that appears on hover */}
        <motion.span
          className="mt-5 text-[10px] tracking-[0.22em] uppercase font-bold text-white/70 flex items-center gap-2"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.4, delay: hovered ? 0.1 : 0 }}
        >
          Explore
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.span>
      </div>
    </motion.a>
  );
}

export default function ShopByGender() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-16">
      {/* Section header */}
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className="text-center mb-10"
      >
        <span className="text-[10px] tracking-[0.28em] uppercase text-[#8B8B3E] font-semibold flex items-center justify-center gap-3 mb-3">
          <span className="w-6 h-px bg-[#8B8B3E]" />
          Shop by Category
          <span className="w-6 h-px bg-[#8B8B3E]" />
        </span>
        <h2
          className="text-gray-900 font-bold"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
        >
          Find Your <em className="italic text-[#8B8B3E]">Style</em>
        </h2>
      </motion.div>

      {/* 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4  mx-auto">
        {CATEGORIES.map((cat, i) => (
          <CategoryCard key={cat.label} cat={cat} index={i} />
        ))}
      </div>
    </section>
  );
}
