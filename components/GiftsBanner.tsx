"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const IMAGES = [
  "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
  "https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=400&q=80",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80",
];

// Build 3 rows of images, each row scrolls at different speed/direction
function ImageRow({
  images,
  direction,
  duration,
  rowIndex,
}: {
  images: string[];
  direction: "left" | "right";
  duration: number;
  rowIndex: number;
}) {
  // Triple the images for seamless loop
  const tripled = [...images, ...images, ...images];

  return (
    <div className="flex gap-3 overflow-visible">
      <motion.div
        className="flex gap-3 shrink-0"
        animate={{
          x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {tripled.map((src, i) => (
          <div
            key={`${rowIndex}-${i}`}
            className="relative w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] rounded-xl overflow-hidden shrink-0"
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
            {/* Red tint */}
            <div className="absolute inset-0 bg-[#C8102E]/45 mix-blend-multiply" />
            {/* Subtle inner shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.15)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function GiftsBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-40px" });

  // Shuffle images differently per row
  const row1 = [...IMAGES];
  const row2 = [...IMAGES].reverse();
  const row3 = [
    IMAGES[2],
    IMAGES[0],
    IMAGES[4],
    IMAGES[1],
    IMAGES[5],
    IMAGES[3],
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-red-950"
      style={{
        height: "clamp(320px, 40vw, 450px)",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(3rem, 6vw, 5.2rem)",
        letterSpacing: "-0.03em",
      }}
    >
      {/* Diagonal scrolling image grid */}
      <div
        className="absolute inset-0 flex flex-col gap-3 justify-center"
        style={{
          transform: "rotate(-12deg) scale(1.4)",
          transformOrigin: "center center",
        }}
      >
        <ImageRow images={row1} direction="left" duration={25} rowIndex={0} />
        <ImageRow images={row2} direction="right" duration={30} rowIndex={1} />
        <ImageRow images={row3} direction="left" duration={22} rowIndex={2} />
      </div>

      {/* Red overlay for cohesion */}
      <div className="absolute inset-0 bg-red-950/25" />

      {/* Left fade for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, #C8102E 0%, #C8102E 42%, rgba(200,16,46,0.7) 50%, rgba(200,16,46,0.2) 60%, transparent 80%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(180,10,40,0.5) 0%, transparent 40%)",
        }}
      />

      {/* Text — bottom left */}
      <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-10 lg:left-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >

          <h2 className="text-white font-bold leading-[0.88] mb-2">JEWELS</h2>

          <p
            className="text-white/60 tracking-[.35em] uppercase font-medium"
            style={{
              fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)",
            }}
          >
            For Every Occasion
          </p>
        </motion.div>

        {/* CTA */}
        <motion.a
          href="/gifts"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="inline-flex items-center gap-2 mt-5 text-[10px] tracking-[.2em] uppercase font-bold text-white/80 hover:text-white transition-colors group"
        >
          Shop Gifts
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
        </motion.a>
      </div>

      {/* Top-right decorative diamond */}
      <motion.div
        initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
        animate={inView ? { opacity: 0.15, rotate: 45, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-8 right-8 sm:right-14 w-16 h-16 border border-white/30 pointer-events-none"
      />
    </section>
  );
}
