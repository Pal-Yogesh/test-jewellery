"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: (
      <svg
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "100% Authentic",
    desc: "Every piece certified by master artisans",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    title: "Free Shipping",
    desc: "On all orders above ₹2,000",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Easy Returns",
    desc: "Hassle-free 15-day return policy",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: "Secure Payment",
    desc: "UPI, cards, EMI & more",
  },
];

const MARQUEE_TAGS = [
  "Handcrafted Silver",
  "Jadau Jewellery",
  "Bridal Sets",
  "Temple Jewellery",
  "Meenakari",
  "Kundan",
  "Filigree",
  "Oxidised Silver",
];

export default function TrustItemStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div>
     
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
      {/* ── Trust Icons ── */}
      <div ref={ref} className="bg-[#fafafa] border-y border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-[#C8102E] group-hover:text-[#C8102E] transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 tracking-wide mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-gray-400 tracking-wide">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Marquee ── */}
      <div className="overflow-hidden border-b border-gray-100 py-3.5 bg-white">
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, i) => (
            <span key={i} className="flex items-center gap-4 shrink-0">
              <span className="text-[11px] tracking-[.2em] uppercase text-gray-400 font-medium">
                {tag}
              </span>
              <span className="text-[#C8102E] text-xs">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
