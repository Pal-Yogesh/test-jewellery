"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const CATEGORIES = [
  { label: "Earrings", href: "/collections/earrings", image: "https://i.pinimg.com/1200x/c8/93/51/c89351439a0a251b70a95c6f04087fd8.jpg" },
  { label: "Rings", href: "/collections/rings", image: "https://i.pinimg.com/736x/05/1d/d0/051dd0ab42f44a5da5abbc911bb515d9.jpg" },
  { label: "Neckpieces", href: "/collections/neckpieces", image: "https://i.pinimg.com/736x/15/e9/63/15e9635bff1e851fda828a708fbe48d4.jpg" },
  { label: "Bangles", href: "/collections/bangles", image: "https://i.pinimg.com/736x/4d/78/bb/4d78bb72586dcb807876292fc5c31d3e.jpg" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function CategoryCard({ cat, index }: { cat: typeof CATEGORIES[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      ref={ref}
      href={cat.href}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.2, ease }}
      className="group relative block overflow-hidden rounded-2xl h-[420px] sm:h-[460px]"
    >
      {/* Image */}
      <Image
        src={cat.image}
        alt={cat.label}
        width={600}
        height={800}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-[#2D1215]/80 via-[#2D1215]/20 to-transparent group-hover:from-[#2D1215]/90 transition-all duration-[800ms]" />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        {/* Label with background */}
        <div className="flex items-center justify-between">
          <motion.span
            className="text-white font-bold tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
          >
            {cat.label}
          </motion.span>

          {/* Arrow circle */}
          <span className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-[#8B8B3E] group-hover:border-[#8B8B3E] transition-all duration-[600ms]">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>

        {/* Subtle line that expands on hover */}
        <motion.div
          className="mt-3 h-[2px] bg-[#8B8B3E] origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 + index * 0.2, ease }}
        />
      </div>

      {/* Top badge */}
      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1">
        <span className="text-[9px] tracking-[0.2em] uppercase text-white/70 font-medium">
          Shop Now
        </span>
      </div>
    </motion.a>
  );
}

export default function Category() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="px-5 sm:px-8 lg:px-16 py-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {CATEGORIES.map((cat, i) => (
          <CategoryCard key={cat.label} cat={cat} index={i} />
        ))}
      </div>
    </div>
  );
}
