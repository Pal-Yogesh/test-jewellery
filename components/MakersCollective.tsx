"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, useInView } from "framer-motion";

const MAKERS = [
  { name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
  { name: "Anita Desai", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
  { name: "Meera Patel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" },
  { name: "Kavya Nair", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80" },
  { name: "Ritu Singh", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" },
  { name: "Sana Khan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { name: "Deepa Joshi", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80" },
  { name: "Lakshmi Rao", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80" },
];

// ─── Auto-scrolling strip with scroll-speed boost ──────────────────────────
function ScrollStrip({
  direction,
  variant,
}: {
  direction: "left" | "right";
  variant: "primary" | "secondary";
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const speedRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastScrollY = useRef(0);

  const isPrimary = variant === "primary";
  const baseSpeed = direction === "left" ? -0.5 : 0.5;
  const repeated = [...MAKERS, ...MAKERS, ...MAKERS, ...MAKERS];

  // Track scroll velocity
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastScrollY.current;
    lastScrollY.current = latest;
    // Add scroll velocity to speed (same direction as base)
    speedRef.current = delta * (direction === "left" ? -0.3 : 0.3);
  });

  // Animation loop: auto-move + scroll boost
  useEffect(() => {
    if (typeof window === "undefined") return;

    const animate = () => {
      // Decay the scroll boost
      speedRef.current *= 0.92;

      // Move position
      posRef.current += baseSpeed + speedRef.current;

      if (innerRef.current) {
        const halfWidth = innerRef.current.scrollWidth / 2;
        // Loop seamlessly
        if (direction === "left" && posRef.current <= -halfWidth) {
          posRef.current += halfWidth;
        } else if (direction === "right" && posRef.current >= 0) {
          posRef.current -= halfWidth;
        }
        innerRef.current.style.transform = `translateX(${posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Start position for right-moving strip
    if (direction === "right" && innerRef.current) {
      posRef.current = -(innerRef.current.scrollWidth / 2);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [baseSpeed, direction]);

  return (
    <div
      ref={stripRef}
      className="overflow-visible"
      style={{ transform: `rotate(${direction === "left" ? -3 : 3}deg)` }}
    >
      <div
        className={`py-3 sm:py-4 ${isPrimary ? "bg-[#C8102E]" : "bg-gray-200"}`}
      >
        <div
          ref={innerRef}
          className="flex items-center whitespace-nowrap will-change-transform"
        >
          {repeated.map((maker, i) => (
            <div
              key={i}
              className="flex items-center gap-3 sm:gap-4 shrink-0 px-4 sm:px-6"
            >
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 shrink-0 ${
                  isPrimary ? "border-white/30" : "border-gray-300"
                }`}
              >
                <img
                  src={maker.avatar}
                  alt={maker.name}
                  className={`w-full h-full object-cover ${
                    isPrimary ? "" : "grayscale opacity-60"
                  }`}
                />
              </div>
              <span
                className={`font-bold tracking-[.15em] uppercase shrink-0 ${
                  isPrimary ? "text-white" : "text-gray-400"
                }`}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(0.85rem, 1.4vw, 1.15rem)",
                }}
              >
                MAKERS COLLECTIVE
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────
export default function MakersCollective() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 overflow-hidden bg-[#F0F0EC]"
    >
      {/* Blurred background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=1200&q=40"
          alt=""
          className="w-full h-full object-cover opacity-[0.06] blur-sm scale-110"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[.25em] uppercase text-[#C8102E] font-semibold mb-4 flex items-center justify-center gap-2"
        >
          <span className="w-6 h-px bg-[#C8102E] inline-block" />
          Meet the Artisans
          <span className="w-6 h-px bg-[#C8102E] inline-block" />
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="text-gray-900 font-bold leading-[1.08]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          }}
        >
          Our{" "}
          <em className="text-[#C8102E]" style={{ fontStyle: "italic" }}>
            Makers
          </em>{" "}
          Collective
        </motion.h2>
      </div>

      {/* Strips */}
      <div className="relative z-10 space-y-2 sm:space-y-3">
        <ScrollStrip direction="left" variant="primary" />
        <ScrollStrip direction="right" variant="secondary" />
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 text-center mt-12 sm:mt-16 px-6"
      >
        <a
          href="/designers"
          className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#a00d24] text-white text-[11px] tracking-[.2em] uppercase font-bold px-8 py-3.5 rounded-sm transition-colors"
        >
          Meet All Designers
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}