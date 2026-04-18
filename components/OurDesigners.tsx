"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Designer {
  id: number;
  name: string;
  location: string;
  specialty: string;
  pieces: string;
  images: [string, string];
}

const DESIGNERS: Designer[] = [
  {
    id: 1, name: "Priya Mehta", location: "Jaipur", specialty: "Kundan & Jadau",
    pieces: "48 pieces",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80",
    ],
  },
  {
    id: 2, name: "Ananya Rao", location: "Hyderabad", specialty: "Temple Jewellery",
    pieces: "36 pieces",
    images: [
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    ],
  },
  {
    id: 3, name: "Meera Iyer", location: "Chennai", specialty: "Meenakari",
    pieces: "52 pieces",
    images: [
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    ],
  },
  {
    id: 4, name: "Kavita Sharma", location: "Udaipur", specialty: "Filigree Silver",
    pieces: "29 pieces",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=600&q=80",
    ],
  },
  {
    id: 5, name: "Sunita Devi", location: "Bhubaneswar", specialty: "Tribal & Oxidised",
    pieces: "41 pieces",
    images: [
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    ],
  },
  {
    id: 6, name: "Ritu Agarwal", location: "Kolkata", specialty: "Polki & Bridal",
    pieces: "63 pieces",
    images: [
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
    ],
  },
];

function DesignerCard({ designer }: { designer: Designer }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="shrink-0 w-[220px] sm:w-[300px] cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-[20px] bg-[#f5f3f0] aspect-3/4 mb-3">
        <motion.img
          src={designer.images[0]}
          alt={designer.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          animate={{ x: hovered ? "-8%" : "0%", scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.img
          src={designer.images[1]}
          alt={designer.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          initial={{ x: "100%" }}
          animate={{ x: hovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* View profile pill */}
        <motion.div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white text-gray-900 text-[10px] tracking-[0.18em] uppercase font-bold px-5 py-2 rounded-full shadow-md whitespace-nowrap"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.25 }}
        >
          View Profile
        </motion.div>
        {/* Location tag */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[9px] tracking-[0.18em] uppercase font-semibold text-gray-600 px-2.5 py-1 rounded-full">
          {designer.location}
        </div>
      </div>

      {/* Info */}
      <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8102E] font-semibold mb-1">
        {designer.specialty}
      </p>
      <p className="text-sm font-semibold text-gray-900 leading-snug mb-1 group-hover:text-[#C8102E] transition-colors duration-200">
        {designer.name}
      </p>
      <p className="text-[11px] text-gray-400">{designer.pieces}</p>
    </div>
  );
}

export default function OurDesigners() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <section className="bg-[#fafafa] py-10 px-4 sm:px-6 lg:px-18">

       {/* ── BRAND PROMISE BANNER ── */}
      
            <section className="relative overflow-hidden bg-white border-b border-gray-100 py-20">
              <div className="absolute left-[6%] top-8 w-px h-20 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
              <div className="absolute right-[6%] bottom-8 w-px h-20 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
              <div className="max-w-3xl mx-auto px-6 text-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-[11px] tracking-[.28em] uppercase text-[#C8102E] font-semibold flex items-center justify-center gap-3 mb-5"
                >
                  <span className="w-8 h-px bg-[#C8102E]" />
                  Our Promise
                  <span className="w-8 h-px bg-[#C8102E]" />
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-gray-900 font-bold leading-[1.1] mb-6"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  }}
                >
                  Made by Hand,{" "}
                  <em className="italic text-[#C8102E]">Felt by Heart</em>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.2 }}
                  className="text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                  }}
                >
                  India&apos;s first jewellery makers collective — connecting 40+
                  independent designers with those who appreciate the art of
                  adornment.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <a
                    href="/about"
                    className="bg-[#C8102E] hover:bg-[#a00d24] text-white text-[11px] tracking-[.2em] uppercase font-bold px-8 py-3.5 rounded-sm transition-colors"
                  >
                    Our Story
                  </a>
                  <a
                    href="/designers"
                    className="border border-gray-300 hover:border-[#C8102E] text-gray-600 hover:text-[#C8102E] text-[11px] tracking-[.2em] uppercase font-bold px-8 py-3.5 rounded-sm transition-all"
                  >
                    Meet Designers
                  </a>
                </motion.div>
              </div>
            </section>
      
      {/* Header */}
      <div className="px-3 pt-8 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#C8102E] font-semibold flex items-center gap-2 mb-2">
            India&apos;s finest artisan collective
          </span>
          <h2
            className="text-gray-900 font-bold leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
          >
            Our Designers
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/designers"
            className="text-[11px] tracking-[0.2em] uppercase font-bold text-gray-500 hover:text-[#C8102E] transition-colors border-b border-gray-300 hover:border-[#C8102E] pb-0.5 mr-2"
          >
            View All
          </a>
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#C8102E] hover:text-[#C8102E] transition-all"
            aria-label="Scroll left"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#C8102E] hover:text-[#C8102E] transition-all"
            aria-label="Scroll right"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 px-3 py-7 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {DESIGNERS.map((d) => (
          <DesignerCard key={d.id} designer={d} />
        ))}
        {/* View all card */}
        <div className="shrink-0 w-[220px] sm:w-[240px] flex items-center justify-center">
          <a href="/designers" className="flex flex-col items-center gap-3 text-center group">
            <div className="w-14 h-14 rounded-full border-2 border-gray-200 group-hover:border-[#C8102E] flex items-center justify-center text-gray-400 group-hover:text-[#C8102E] transition-all duration-300">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-gray-400 group-hover:text-[#C8102E] transition-colors">
              All Designers
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
