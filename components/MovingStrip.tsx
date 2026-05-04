"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, useScroll } from "framer-motion";

// ─── Animated counter that counts up when in view ──────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

// ─── Floating gem particle ─────────────────────────────────────────────────
function FloatingGem({ delay, x, size }: { delay: number; x: string; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, bottom: "-20px" }}
      animate={{
        y: [0, -600],
        opacity: [0, 0.6, 0.6, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 9L12 22L2 9L12 2Z" fill="#D4A843" opacity="0.15" />
      </svg>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function MovingStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax values
  const imgY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const textX = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const STATS = [
    { value: 40, suffix: "+", label: "Artisan Designers" },
    { value: 2000, suffix: "+", label: "Unique Pieces" },
    { value: 15, suffix: "K+", label: "Happy Customers" },
    { value: 925, suffix: "", label: "Sterling Silver" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#2D1215] py-20 sm:py-28"
    >
      {/* Floating gem particles */}
      {[
        { delay: 0, x: "10%", size: 16 },
        { delay: 2, x: "25%", size: 12 },
        { delay: 4, x: "45%", size: 20 },
        { delay: 1, x: "65%", size: 14 },
        { delay: 3, x: "80%", size: 18 },
        { delay: 5, x: "90%", size: 10 },
      ].map((gem, i) => (
        <FloatingGem key={i} {...gem} />
      ))}

      {/* Large scrolling background text */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none z-0"
        style={{ x: textX }}
      >
        <span
          className="text-white/3 font-bold"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(8rem, 18vw, 16rem)",
            letterSpacing: "-0.02em",
          }}
        >
          HANDCRAFTED ✦ HERITAGE ✦ ARTISAN ✦ SILVER
        </span>
      </motion.div>

      {/* Content grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left — Parallax images stack */}
          <div className="lg:col-span-4 relative h-[360px] sm:h-[420px]">
            <motion.div
              style={{ y: imgY1 }}
              className="absolute top-0 left-0 w-[65%] aspect-3/4 rounded-xl overflow-hidden z-10"
            >
              <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                src="https://i.pinimg.com/736x/e9/d6/b0/e9d6b0103854e095997bd8a7b6d776fa.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
              {/* Gold border accent */}
              <div className="absolute inset-0 rounded-xl border border-[#D4A843]/20" />
            </motion.div>

            <motion.div
              style={{ y: imgY2 }}
              className="absolute bottom-0 right-0 w-[55%] aspect-square rounded-xl overflow-hidden z-20"
            >
              <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                src="https://i.pinimg.com/736x/dc/41/6f/dc416f68be573e0c41e6ba2411c13280.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-xl border border-[#D4A843]/20" />
            </motion.div>

            {/* Decorative ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={inView ? { opacity: 0.15, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute top-[30%] left-[40%] w-28 h-28 rounded-full border-2 border-[#D4A843] pointer-events-none"
            />
          </div>

          {/* Center — Text content */}
          <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px bg-[#8B8B3E]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8B8B3E] font-semibold">
                Our Craft
              </span>
              <span className="w-8 h-px bg-[#8B8B3E]" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="text-white font-bold leading-[1.08] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Where Heritage{" "}
              <em className="italic text-[#D4A843]">Meets</em>{" "}
              the Hand
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="text-white/40 leading-relaxed mb-8 max-w-sm"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}
            >
              Each piece passes through the hands of master artisans who have inherited centuries of craft — no machines, no shortcuts, just soul.
            </motion.p>

            <motion.a
              href="/about"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="group inline-flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase font-bold text-[#D4A843] hover:text-white transition-colors"
            >
              <span className="w-10 h-px bg-[#D4A843] group-hover:w-14 transition-all duration-300" />
              Discover Our Story
            </motion.a>
          </div>

          {/* Right — Animated stats */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                  className="relative bg-white/4 backdrop-blur-sm rounded-xl p-5 border border-white/6 group hover:border-[#D4A843]/20 transition-colors duration-500"
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-xl bg-[#D4A843]/0 group-hover:bg-[#D4A843]/3 transition-colors duration-500" />

                  <span
                    className="relative block text-white font-bold leading-none mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="relative text-[9px] tracking-[0.22em] uppercase text-white/30 font-medium">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
