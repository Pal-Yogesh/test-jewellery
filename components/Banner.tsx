"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { gsap } from "gsap";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Slide {
  id: number;
  eyebrow: string;
  headline: string[];
  sub: string;
  cta: string;
  ctaHref: string;
  secondaryCta?: string;
  accent: string;          // CSS color
  bgGradient: string;      // tailwind gradient classes
  imageUrl: string;        // placeholder — swap with real images
  imageAlt: string;
  align: "left" | "right" | "center";
  tag?: string;
}

// ─── Slide Data ───────────────────────────────────────────────────────────────
const SLIDES: Slide[] = [
  {
    id: 1,
    eyebrow: "New Arrivals · Summer 2025",
    headline: ["Adorned in", "Tradition"],
    sub: "Handcrafted silver jewellery by India's finest artisan collectives — each piece a living story.",
    cta: "Explore Collection",
    ctaHref: "/collections/new-arrivals",
    secondaryCta: "Our Story",
    accent: "#C8102E",
    bgGradient: "from-[#1a0a0a] via-[#2d1010] to-[#0f0505]",
    imageUrl: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=900&q=80",
    imageAlt: "Traditional Indian jewellery",
    align: "left",
    tag: "Exclusive",
  },
  {
    id: 2,
    eyebrow: "Bridal Edit 2025",
    headline: ["For the", "Bride Who", "Shines"],
    sub: "From meenakari to jadau — curated bridal sets that make every moment unforgettable.",
    cta: "Shop Bridal",
    ctaHref: "/collections/bridal",
    secondaryCta: "View Lookbook",
    accent: "#C8102E",
    bgGradient: "from-[#0d0d0d] via-[#1c1010] to-[#0a0505]",
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80",
    imageAlt: "Bridal jewellery set",
    align: "right",
    tag: "Bridal",
  },
  {
    id: 3,
    eyebrow: "Makers Collective",
    headline: ["Silver", "Stories"],
    sub: "Meet the artisans behind every clasp, every curve — jewellery made by hand, felt by heart.",
    cta: "Meet Designers",
    ctaHref: "/designers",
    accent: "#C8102E",
    bgGradient: "from-[#080808] via-[#161010] to-[#080808]",
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80",
    imageAlt: "Artisan jewellery craft",
    align: "center",
    tag: "Artisans",
  },
  {
    id: 4,
    eyebrow: "Limited Edition",
    headline: ["Festive", "Splendour"],
    sub: "Celebrate every occasion with jewellery that carries the weight of generations — light as joy.",
    cta: "Shop Festive",
    ctaHref: "/collections/festive",
    secondaryCta: "Gift Cards",
    accent: "#C8102E",
    bgGradient: "from-[#150808] via-[#2a0f0f] to-[#0d0808]",
    imageUrl: "https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=900&q=80",
    imageAlt: "Festive jewellery",
    align: "left",
    tag: "Festival",
  },
];

const DURATION = 5000; // ms per slide

// ─── Progress Ring ────────────────────────────────────────────────────────────
const ProgressRing = ({ active, duration }: { active: boolean; duration: number }) => {
  const r = 10;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className="absolute inset-0">
      <circle cx="14" cy="14" r={r} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="2" />
      {active && (
        <motion.circle
          cx="14" cy="14" r={r}
          fill="none"
          stroke="#C8102E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          style={{ rotate: "-90deg", transformOrigin: "14px 14px" }}
        />
      )}
    </svg>
  );
};

// ─── Slide Text Content ───────────────────────────────────────────────────────
const SlideContent = ({ slide, isActive }: { slide: Slide; isActive: boolean }) => {
  const alignClass =
    slide.align === "right"
      ? "items-end text-right"
      : slide.align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
    exit: { transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.35, ease: "easeIn" as const } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      exit="exit"
      className={`flex flex-col ${alignClass} max-w-xl`}
    >
      {/* Eyebrow */}
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
        {slide.tag && (
          <span className="bg-[#C8102E] text-white text-[9px] tracking-[.2em] uppercase font-bold px-2.5 py-1 rounded-sm">
            {slide.tag}
          </span>
        )}
        <span className="text-[11px] tracking-[.22em] uppercase text-white/50 font-medium">
          {slide.eyebrow}
        </span>
      </motion.div>

      {/* Headline */}
      <div className="overflow-hidden mb-6">
        {slide.headline.map((line, i) => (
          <motion.h1
            key={i}
            variants={itemVariants}
            className="block text-white leading-[1.05] font-bold"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              letterSpacing: "-0.01em",
            }}
          >
            {i === slide.headline.length - 1 ? (
              <>
                {line}{" "}
                <span
                  className="italic"
                  style={{ color: "#C8102E", WebkitTextStroke: "0px" }}
                >
                  ✦
                </span>
              </>
            ) : (
              line
            )}
          </motion.h1>
        ))}
      </div>

      {/* Sub */}
      <motion.p
        variants={itemVariants}
        className="text-white/60 text-sm leading-relaxed tracking-wide max-w-md mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}
      >
        {slide.sub}
      </motion.p>

      {/* CTAs */}
      <motion.div variants={itemVariants} className="flex items-center gap-4 flex-wrap">
        <motion.a
          href={slide.ctaHref}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative group overflow-hidden bg-[#C8102E] text-white text-[11px] tracking-[.2em] uppercase font-bold px-8 py-3.5 rounded-sm"
        >
          <span className="relative z-10">{slide.cta}</span>
          <motion.span
            className="absolute inset-0 bg-[#a00d24]"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </motion.a>

        {slide.secondaryCta && (
          <motion.a
            href="#"
            whileHover={{ x: 4 }}
            className="text-white/70 hover:text-white text-[11px] tracking-[.2em] uppercase font-medium flex items-center gap-2 transition-colors"
          >
            {slide.secondaryCta}
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── Main Banner ──────────────────────────────────────────────────────────────
export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  const total = SLIDES.length;

  const goTo = useCallback(
    (idx: number, dir: 1 | -1 = 1) => {
      setPrev(current);
      setDirection(dir);
      setCurrent(idx);
    },
    [current]
  );

  const next = useCallback(() => goTo((current + 1) % total, 1), [current, goTo, total]);
  const prev_ = useCallback(() => goTo((current - 1 + total) % total, -1), [current, goTo, total]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(next, DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, isPaused, next]);

  // GSAP decorative line reveal
  useEffect(() => {
    if (!decorRef.current) return;
    gsap.fromTo(
      decorRef.current.querySelectorAll(".decor-line"),
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  // Drag / swipe
  const dragX = useMotionValue(0);
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    setIsDragging(false);
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev_();
    dragX.set(0);
  };

  const slide = SLIDES[current];

  const imageVariants = {
    enter: (dir: number) => ({ x: dir * 80, opacity: 0, scale: 1.08 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
    exit: (dir: number) => ({ x: dir * -60, opacity: 0, scale: 0.96, transition: { duration: 0.6, ease: "easeIn" as const } }),
  };

  const overlayVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{ height: "min(92vh, 820px)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Background Slides ── */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={`bg-${current}`}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 will-change-transform"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
        >
          {/* Photo */}
          <img
            src={slide.imageUrl}
            alt={slide.imageAlt}
            className="absolute inset-0 w-full h-full object-cover object-center"
            draggable={false}
          />

          {/* Dark gradient overlay — softened so images show through */}
          <motion.div
            key={`overlay-${current}`}
            variants={overlayVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            style={{
              background:
                slide.align === "right"
                  ? "linear-gradient(to left, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.15) 100%)"
                  : slide.align === "center"
                  ? "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)"
                  : "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.15) 100%)",
            }}
          />

          {/* Vignette — lighter */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.35) 100%)" }} />

          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Decorative Lines ── */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="decor-line absolute left-0 top-1/3 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top"
          style={{ left: "8%" }}
        />
        <div
          className="decor-line absolute right-0 bottom-1/3 w-[1px] h-48 bg-gradient-to-b from-transparent via-[#C8102E]/40 to-transparent origin-bottom"
          style={{ right: "8%" }}
        />
        <div
          className="decor-line absolute top-0 left-[40%] h-[1px] w-24 bg-gradient-to-r from-transparent via-white/15 to-transparent origin-left"
          style={{ top: "12%" }}
        />
      </div>

      {/* ── Slide Number ── */}
      <div className="absolute top-8 right-8 lg:right-14 flex items-center gap-3 z-20">
        <span className="text-white font-bold tabular-nums" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem" }}>
          0{current + 1}
        </span>
        <span className="w-8 h-[1px] bg-white/30" />
        <span className="text-white/30" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>
          0{total}
        </span>
      </div>

      {/* ── Main Content ── */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={`content-${current}`} className="w-full">
              <div
                className={`flex ${
                  slide.align === "right"
                    ? "justify-end"
                    : slide.align === "center"
                    ? "justify-center"
                    : "justify-start"
                }`}
              >
                <SlideContent slide={slide} isActive={true} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom Bar — Dots + Progress + Arrows ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
      

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-3">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative w-7 h-7 flex items-center justify-center"
              >
                <ProgressRing active={i === current} duration={DURATION} />
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{ background: i === current ? "#C8102E" : "rgba(255,255,255,0.35)" }}
                />
              </button>
            ))}
          </div>

          {/* Slide caption */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`cap-${current}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="hidden md:block text-[10px] tracking-[.22em] uppercase text-white/35 font-medium"
            >
              {slide.eyebrow}
            </motion.p>
          </AnimatePresence>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={prev_}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-[#C8102E] hover:bg-[#C8102E]/10 transition-all"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </motion.button>
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-[#C8102E] hover:bg-[#C8102E]/10 transition-all"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      
    </section>
  );
}