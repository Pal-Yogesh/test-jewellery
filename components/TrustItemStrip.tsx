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
