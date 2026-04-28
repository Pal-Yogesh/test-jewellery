"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function GiftsBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-4 sm:px-6 lg:px-10 py-6">
      <div className="relative overflow-hidden rounded-2xl bg-[#1a1210] min-h-[420px] sm:min-h-[480px]">

        {/* Background image — right side on desktop, full on mobile */}
        <div className="absolute inset-0">
          <img
            src="https://i.pinimg.com/1200x/ce/c1/18/cec1181228673550dfaf56077bea2f85.jpg"
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          {/* Gradient to make text readable */}
          <div className="absolute inset-0 bg-linear-to-r from-[#1a1210] via-[#1a1210]/85 to-transparent" />
        </div>

        {/* Sponsored tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="absolute top-5 left-6 sm:left-10 z-10"
        >
          <span className="text-[8px] tracking-[0.3em] uppercase text-white/30 font-medium border border-white/15 px-3 py-1 rounded-full">
            Ad · Sponsored
          </span>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full min-h-[420px] sm:min-h-[480px] p-8 sm:p-12 lg:p-16 max-w-xl">

          {/* Brand */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="text-[10px] tracking-[0.28em] uppercase text-[#C8102E] font-semibold mb-3"
          >
            Amer Jewels
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
            className="text-white font-bold leading-[1.05] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Jewellery That Tells{" "}
            <em className="italic text-[#C8102E]">Your Story</em>
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="text-white/45 leading-relaxed mb-8 max-w-md"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
          >
            Drawing from the romanticism of the Georgian and Victorian eras — gemstones transformed into jewels with a soft pastel palette.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.38 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <a
              href="/collections/amer-jewels"
              className="bg-[#C8102E] hover:bg-[#a00d24] text-white text-[10px] tracking-[0.2em] uppercase font-bold px-7 py-3 rounded-full transition-colors inline-flex items-center gap-2"
            >
              Shop Now
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="/collections/amer-jewels"
              className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white/50 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-0.5"
            >
              View Collection
            </a>
          </motion.div>
        </div>

        {/* Floating product cards — bottom right on desktop */}
        <div className="hidden lg:flex absolute bottom-8 right-8 z-10 gap-3">
          {[
            { img: "https://i.pinimg.com/736x/f8/df/89/f8df8921172b3c05ce8538bf71ef40ce.jpg", name: "Taarini Hasli", price: "₹ 12,500" },
            { img: "https://i.pinimg.com/736x/49/1c/6f/491c6fef18ffb1e117baa2216bfdc293.jpg", name: "Padmini Ring", price: "₹ 4,200" },
          ].map((p, i) => (
            <motion.a
              key={p.name}
              href="/product"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.45 + i * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 w-[130px] group hover:bg-white/15 transition-colors"
            >
              <div className="overflow-hidden rounded-lg aspect-square mb-2">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="text-[10px] text-white font-medium truncate">{p.name}</p>
              <p className="text-[9px] text-white/40">{p.price}</p>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
