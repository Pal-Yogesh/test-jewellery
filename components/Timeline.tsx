"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ──────────────────────────────────────────────────────────────────
const EVENTS = [
  {
    year: "1924",
    title: "Founded in Dubai",
    description:
      "Istana Jewellers begins its journey in the heart of the UAE — a small family atelier in the bustling souks of old Dubai.",
    location: "Dubai, UAE",
    image:
      "https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?w=500&auto=format&fit=crop&q=60",
    milestone: "Foundation",
    details:
      "Our founder opened the first Istana boutique with a vision to bring the finest jewellery to the Middle East.",
  },
  {
    year: "1965",
    title: "London Expansion",
    description:
      "Opening our first international boutique in Mayfair, bringing Middle Eastern craftsmanship to European luxury markets.",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60",
    milestone: "International Growth",
    details:
      "The London boutique became a bridge between Eastern and Western jewellery traditions, attracting royalty and celebrities.",
  },
  {
    year: "1987",
    title: "Hong Kong Presence",
    description:
      "Establishing our Asian headquarters in Central Hong Kong, connecting Eastern and Western jewellery traditions.",
    location: "Hong Kong",
    image:
      "https://plus.unsplash.com/premium_photo-1681276170281-cf50a487a1b7?w=500&auto=format&fit=crop&q=60",
    milestone: "Asian Expansion",
    details:
      "Our Hong Kong boutique became the gateway to Asia, serving discerning clients across the continent.",
  },
  {
    year: "2024",
    title: "Centennial Legacy",
    description:
      "Celebrating 100 years of excellence, innovation, and serving discerning clients across three continents.",
    location: "Worldwide",
    image:
      "https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?w=500&auto=format&fit=crop&q=60",
    milestone: "Century of Excellence",
    details:
      "With boutiques in major cities worldwide, we remain committed to our founding principles of quality and craftsmanship.",
  },
];

// ─── Section Header (matching site pattern) ────────────────────────────────
const SectionHeader = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="flex flex-col items-center text-center mb-16 lg:mb-24 px-6">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-[11px] tracking-[.25em] uppercase text-[#C8102E] font-semibold mb-4 flex items-center gap-2"
      >
        <span className="w-6 h-px bg-[#C8102E] inline-block" />
        Our Heritage
        <span className="w-6 h-px bg-[#C8102E] inline-block" />
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.08 }}
        className="text-gray-900 font-bold leading-[1.08] mb-5"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
        }}
      >
        A Century of{" "}
        <em className="text-[#C8102E]" style={{ fontStyle: "italic" }}>
          Excellence
        </em>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.16 }}
        className="text-gray-400 max-w-xl leading-relaxed"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
      >
        From Dubai to the world — our journey through time, marked by milestones
        of craftsmanship, innovation, and unwavering commitment.
      </motion.p>
    </div>
  );
};

// ─── Timeline Event Card ───────────────────────────────────────────────────
const EventCard = ({
  event,
  index,
  isLeft,
}: {
  event: (typeof EVENTS)[0];
  index: number;
  isLeft: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, x: isLeft ? -30 : 30 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`w-full sm:w-5/12 ${
        isLeft ? "sm:pr-8 lg:pr-12" : "sm:pl-8 lg:pl-12"
      } mb-8 sm:mb-0`}
    >
      <div className="group relative bg-white rounded-sm overflow-hidden border border-gray-100 hover:border-[#C8102E]/20 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(200,16,46,0.08)]">
        {/* Image */}
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

          {/* Year badge */}
          <div className="absolute bottom-4 left-5">
            <span
              className="text-white font-bold"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.2rem",
                lineHeight: 1,
              }}
            >
              {event.year}
            </span>
          </div>

          {/* Milestone tag */}
          <div className="absolute top-4 right-4">
            <span className="bg-[#C8102E] text-white text-[9px] tracking-[.2em] uppercase font-bold px-2.5 py-1 rounded-sm">
              {event.milestone}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Location */}
          <div className="flex items-center gap-2 mb-3">
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="#C8102E"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-[10px] tracking-[.2em] uppercase text-gray-400 font-medium">
              {event.location}
            </span>
          </div>

          <h3
            className="text-gray-900 font-bold mb-2 leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem",
            }}
          >
            {event.title}
          </h3>

          <p
            className="text-gray-500 leading-relaxed mb-3 text-sm"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {event.description}
          </p>

          <p className="text-gray-400 text-xs leading-relaxed italic">
            {event.details}
          </p>

          {/* Bottom red accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C8102E] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </motion.div>
  );
};

// ─── Timeline Node (center dot) ────────────────────────────────────────────
const TimelineNode = ({ index }: { index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="w-full sm:w-2/12 flex justify-center relative z-20 mb-8 sm:mb-0"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[3px] border-[#C8102E] bg-white flex items-center justify-center shadow-[0_0_0_4px_rgba(200,16,46,0.1)]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
      </motion.div>
    </div>
  );
};

// ─── CTA Section ───────────────────────────────────────────────────────────
const CtaSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="text-center mt-20 lg:mt-28"
    >
      <div className="relative overflow-hidden bg-red-950 rounded-sm py-16 px-6 max-w-4xl mx-auto">
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />
        {/* Decorative lines */}
        <div className="absolute left-[6%] top-6 w-px h-16 bg-linear-to-b from-transparent via-white/15 to-transparent" />
        <div className="absolute right-[6%] bottom-6 w-px h-16 bg-linear-to-b from-transparent via-[#C8102E]/40 to-transparent" />

        <div className="relative z-10">
          <span className="text-[11px] tracking-[.25em] uppercase text-[#C8102E] font-semibold flex items-center justify-center gap-2 mb-5">
            <span className="w-6 h-px bg-[#C8102E]" />
            Visit Us
            <span className="w-6 h-px bg-[#C8102E]" />
          </span>

          <h3
            className="text-white font-bold leading-[1.1] mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
            }}
          >
            Be Part of Our{" "}
            <em className="text-[#C8102E]" style={{ fontStyle: "italic" }}>
              Story
            </em>
          </h3>

          <p
            className="text-white/50 leading-relaxed mb-8 max-w-lg mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.05rem",
            }}
          >
            Visit our boutiques in Dubai, London, or Hong Kong to experience a
            century of craftsmanship and create your own legacy piece.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/boutiques"
              className="bg-[#C8102E] hover:bg-[#a00d24] text-white text-[11px] tracking-[.2em] uppercase font-bold px-8 py-3.5 rounded-sm transition-colors"
            >
              Find a Boutique
            </a>
            <a
              href="/appointment"
              className="border border-white/20 hover:border-[#C8102E] text-white/70 hover:text-white text-[11px] tracking-[.2em] uppercase font-bold px-8 py-3.5 rounded-sm transition-all"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────
export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  // GSAP parallax on the background
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const bg = containerRef.current.querySelector(".timeline-bg");
    if (bg) {
      gsap.to(bg, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#F0F0EC] py-20 lg:py-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="timeline-bg absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* Header */}
      <SectionHeader />

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Center line */}
        <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 w-px h-[85%] bg-gray-200">
          <motion.div
            className="w-full bg-[#C8102E] origin-top"
            style={{ scaleY: lineProgress, height: "100%" }}
          />
        </div>

        {/* Events */}
        <div className="space-y-12 lg:space-y-20">
          {EVENTS.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={event.year}
                className={`flex items-center ${
                  isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                } flex-col sm:flex-row`}
              >
                <EventCard event={event} index={i} isLeft={isLeft} />
                <TimelineNode index={i} />
                <div className="hidden sm:block sm:w-5/12" />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <CtaSection />
      </div>
    </section>
  );
}