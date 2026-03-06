"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Options ───────────────────────────────────────────────────────────────
const METALS = [
  { id: "gold", label: "Gold", color: "#D4A853", ring: "#C9A04F", shine: "#F5E6B8" },
  { id: "rose", label: "Rose Gold", color: "#B76E79", ring: "#C07C85", shine: "#E8B4BC" },
  { id: "silver", label: "Silver", color: "#C0C0C0", ring: "#A8A8A8", shine: "#E8E8E8" },
  { id: "platinum", label: "Platinum", color: "#E5E4E2", ring: "#D0CFD0", shine: "#F5F5F5" },
];

const GEMS = [
  { id: "diamond", label: "Diamond", color: "#E8F4FD", sparkle: "#FFFFFF", accent: "#B8D4E8" },
  { id: "ruby", label: "Ruby", color: "#C8102E", sparkle: "#FF6B7A", accent: "#8B0000" },
  { id: "emerald", label: "Emerald", color: "#2E8B57", sparkle: "#7DCEA0", accent: "#1B5E3B" },
  { id: "sapphire", label: "Sapphire", color: "#2850A8", sparkle: "#6B8FD4", accent: "#1A3370" },
  { id: "amethyst", label: "Amethyst", color: "#9B59B6", sparkle: "#C39BD3", accent: "#6C3483" },
];

const STYLES = [
  { id: "solitaire", label: "Solitaire", desc: "Timeless single stone" },
  { id: "halo", label: "Halo", desc: "Encircled brilliance" },
  { id: "three-stone", label: "Three Stone", desc: "Past, present, future" },
];

// ─── Ring SVG Illustration ─────────────────────────────────────────────────
function RingIllustration({
  metal,
  gem,
  style,
}: {
  metal: (typeof METALS)[0];
  gem: (typeof GEMS)[0];
  style: (typeof STYLES)[0];
}) {
  return (
    <motion.svg
      key={`${metal.id}-${gem.id}-${style.id}`}
      viewBox="0 0 300 300"
      className="w-full h-full"
      initial={{ scale: 0.9, opacity: 0, rotateY: -20 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={metal.shine} />
          <stop offset="40%" stopColor={metal.ring} />
          <stop offset="70%" stopColor={metal.color} />
          <stop offset="100%" stopColor={metal.ring} />
        </linearGradient>
        <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gem.sparkle} />
          <stop offset="50%" stopColor={gem.color} />
          <stop offset="100%" stopColor={gem.accent} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="gemGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="150" cy="255" rx="60" ry="8" fill="black" opacity="0.08" />

      {/* Ring band */}
      <ellipse
        cx="150" cy="195" rx="55" ry="50"
        fill="none" stroke="url(#ringGrad)" strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Inner shine line */}
      <ellipse
        cx="150" cy="195" rx="55" ry="50"
        fill="none" stroke={metal.shine} strokeWidth="2" opacity="0.4"
        strokeDasharray="8 12"
      />

      {/* Prong base */}
      <motion.g
        initial={{ y: 5 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <path
          d={`M138 148 L142 165 L158 165 L162 148 Z`}
          fill="url(#ringGrad)" stroke={metal.ring} strokeWidth="1"
        />
        {/* Prongs */}
        <line x1="139" y1="148" x2="142" y2="130" stroke="url(#ringGrad)" strokeWidth="3" strokeLinecap="round" />
        <line x1="161" y1="148" x2="158" y2="130" stroke="url(#ringGrad)" strokeWidth="3" strokeLinecap="round" />
        <line x1="145" y1="146" x2="145" y2="128" stroke="url(#ringGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="155" y1="146" x2="155" y2="128" stroke="url(#ringGrad)" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>

      {/* Main gemstone */}
      <motion.g filter="url(#gemGlow)">
        <motion.polygon
          points="150,100 170,125 162,148 138,148 130,125"
          fill="url(#gemGrad)"
          stroke={gem.sparkle}
          strokeWidth="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, type: "spring", bounce: 0.3 }}
          style={{ transformOrigin: "150px 125px" }}
        />
        {/* Facet lines */}
        <line x1="150" y1="100" x2="150" y2="148" stroke={gem.sparkle} strokeWidth="0.5" opacity="0.3" />
        <line x1="130" y1="125" x2="170" y2="125" stroke={gem.sparkle} strokeWidth="0.5" opacity="0.3" />
        <line x1="150" y1="100" x2="138" y2="148" stroke={gem.sparkle} strokeWidth="0.3" opacity="0.2" />
        <line x1="150" y1="100" x2="162" y2="148" stroke={gem.sparkle} strokeWidth="0.3" opacity="0.2" />
      </motion.g>

      {/* Halo stones */}
      {style.id === "halo" && (
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ transformOrigin: "150px 125px" }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const cx = 150 + Math.cos(angle) * 32;
            const cy = 124 + Math.sin(angle) * 28;
            return (
              <motion.circle
                key={i}
                cx={cx} cy={cy} r="3"
                fill={gem.sparkle}
                opacity="0.7"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35 + i * 0.03 }}
              />
            );
          })}
        </motion.g>
      )}

      {/* Side stones for three-stone */}
      {style.id === "three-stone" && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {/* Left stone */}
          <polygon
            points="118,120 128,135 124,148 112,148 108,135"
            fill="url(#gemGrad)" opacity="0.75"
          />
          {/* Right stone */}
          <polygon
            points="182,120 192,135 188,148 176,148 172,135"
            fill="url(#gemGrad)" opacity="0.75"
          />
          {/* Extra prongs */}
          <line x1="110" y1="148" x2="113" y2="158" stroke="url(#ringGrad)" strokeWidth="2" strokeLinecap="round" />
          <line x1="126" y1="148" x2="123" y2="158" stroke="url(#ringGrad)" strokeWidth="2" strokeLinecap="round" />
          <line x1="174" y1="148" x2="177" y2="158" stroke="url(#ringGrad)" strokeWidth="2" strokeLinecap="round" />
          <line x1="190" y1="148" x2="187" y2="158" stroke="url(#ringGrad)" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      )}

      {/* Sparkle particles */}
      {[
        { x: 135, y: 105, d: 0.4 },
        { x: 168, y: 112, d: 0.6 },
        { x: 150, y: 95, d: 0.2 },
        { x: 125, y: 130, d: 0.8 },
        { x: 175, y: 130, d: 0.5 },
      ].map((s, i) => (
        <motion.circle
          key={i}
          cx={s.x} cy={s.y} r="1.5"
          fill="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            delay: s.d,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        />
      ))}
    </motion.svg>
  );
}

// ─── Option Selector ───────────────────────────────────────────────────────
function OptionGroup<T extends { id: string; label: string }>({
  title,
  options,
  selected,
  onSelect,
  renderSwatch,
}: {
  title: string;
  options: T[];
  selected: string;
  onSelect: (id: string) => void;
  renderSwatch?: (opt: T) => React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <p
        className="text-[10px] tracking-[.2em] uppercase text-gray-400 font-semibold mb-3"
      >
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = selected === opt.id;
          return (
            <motion.button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-sm text-[11px] tracking-[.12em] uppercase font-semibold transition-all duration-200 border ${
                isActive
                  ? "border-[#C8102E] text-[#C8102E] bg-red-50/60"
                  : "border-gray-200 text-gray-500 hover:border-gray-300 bg-white"
              }`}
            >
              {renderSwatch && renderSwatch(opt)}
              {opt.label}
              {isActive && (
                <motion.span
                  layoutId={`sel-${title}`}
                  className="absolute inset-0 border-2 border-[#C8102E] rounded-sm pointer-events-none"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────
export default function RingCustomizer() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [metalId, setMetalId] = useState("gold");
  const [gemId, setGemId] = useState("diamond");
  const [styleId, setStyleId] = useState("solitaire");

  const metal = METALS.find((m) => m.id === metalId)!;
  const gem = GEMS.find((g) => g.id === gemId)!;
  const style = STYLES.find((s) => s.id === styleId)!;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F0F0EC] border-t border-gray-100 py-20 lg:py-28 overflow-hidden"
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[.25em] uppercase text-[#C8102E] font-semibold mb-4 flex items-center justify-center gap-2"
          >
            <span className="w-6 h-px bg-[#C8102E] inline-block" />
            Interactive
            <span className="w-6 h-px bg-[#C8102E] inline-block" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-gray-900 font-bold leading-[1.08] mb-3"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            }}
          >
            Design Your{" "}
            <em className="text-[#C8102E]" style={{ fontStyle: "italic" }}>
              Dream Ring
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-400 max-w-md mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}
          >
            Choose your metal, gemstone, and setting — watch it come alive.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Ring preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px]">
              {/* Ambient glow behind ring */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl opacity-20"
                animate={{ backgroundColor: gem.color }}
                transition={{ duration: 0.5 }}
              />

              {/* Rotating subtle ring around preview */}
              <motion.div
                className="absolute inset-[-10px] rounded-full border border-dashed"
                animate={{ borderColor: `${metal.color}40`, rotate: 360 }}
                transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, borderColor: { duration: 0.5 } }}
              />

              {/* Ring SVG */}
              <AnimatePresence mode="wait">
                <RingIllustration
                  key={`${metalId}-${gemId}-${styleId}`}
                  metal={metal}
                  gem={gem}
                  style={style}
                />
              </AnimatePresence>
            </div>

            {/* Live label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${metalId}-${gemId}-${styleId}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center"
              >
                <p
                  className="text-gray-800 font-bold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}
                >
                  {metal.label} {style.label}
                </p>
                <p className="text-[10px] tracking-[.2em] uppercase text-gray-400 mt-0.5">
                  with {gem.label}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right — Controls */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-sm border border-gray-100 p-6 sm:p-8 shadow-sm"
          >
            {/* Style */}
            <OptionGroup
              title="Setting Style"
              options={STYLES}
              selected={styleId}
              onSelect={setStyleId}
            />

            {/* Metal */}
            <OptionGroup
              title="Metal"
              options={METALS}
              selected={metalId}
              onSelect={setMetalId}
              renderSwatch={(opt) => (
                <span
                  className="w-3.5 h-3.5 rounded-full border border-gray-200 shrink-0"
                  style={{ backgroundColor: opt.color }}
                />
              )}
            />

            {/* Gem */}
            <OptionGroup
              title="Gemstone"
              options={GEMS}
              selected={gemId}
              onSelect={setGemId}
              renderSwatch={(opt) => (
                <span
                  className="w-3.5 h-3.5 rounded-full border border-gray-200 shrink-0"
                  style={{ backgroundColor: opt.color }}
                />
              )}
            />

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <motion.a
                href="/custom-ring"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 text-center bg-[#C8102E] hover:bg-[#a00d24] text-white text-[11px] tracking-[.2em] uppercase font-bold px-6 py-3.5 rounded-sm transition-colors"
              >
                Start Custom Order
              </motion.a>
              <motion.a
                href="/appointment"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 text-center border border-gray-200 hover:border-[#C8102E] text-gray-600 hover:text-[#C8102E] text-[11px] tracking-[.2em] uppercase font-bold px-6 py-3.5 rounded-sm transition-all"
              >
                Book Consultation
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}