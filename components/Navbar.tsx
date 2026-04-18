"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavLink {
  label: string;
  badge?: string;
  href?: string;
}

interface NavColumn {
  title: string;
  links: NavLink[];
}

interface NavCategory {
  id: string;
  heading: string;
  columns: NavColumn[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV: NavCategory[] = [
  {
    id: "woman",
    heading: "Woman",
    columns: [
      {
        title: "New In",
        links: [
          { label: "New Arrivals", badge: "NEW" },
          { label: "Best Sellers" },
          { label: "Just Restocked" },
          { label: "Trending Now" },
        ],
      },
      {
        title: "Jewellery",
        links: [
          { label: "Neckpieces" },
          { label: "Earrings" },
          { label: "Rings" },
          { label: "Bangles" },
          { label: "Anklets" },
        ],
      },
      {
        title: "Collections",
        links: [
          { label: "Bridal Edit", badge: "NEW" },
          { label: "Festive Picks" },
          { label: "Everyday Luxe" },
          { label: "Gift Sets" },
        ],
      },
    ],
  },
  {
    id: "man",
    heading: "Man",
    columns: [
      {
        title: "New In",
        links: [
          { label: "New Arrivals", badge: "NEW" },
          { label: "Best Sellers" },
          { label: "Gifting Edit" },
        ],
      },
      {
        title: "Jewellery",
        links: [
          { label: "Rings" },
          { label: "Bracelets" },
          { label: "Chains" },
          { label: "Cufflinks" },
        ],
      },
      {
        title: "Collections",
        links: [
          { label: "Minimalist" },
          { label: "Statement Pieces" },
          { label: "Wedding Edit" },
        ],
      },
    ],
  },
  {
    id: "brand",
    heading: "Brand",
    columns: [
      {
        title: "About",
        links: [
          { label: "Our Story" },
          { label: "Makers Collective" },
          { label: "Sustainability" },
          { label: "Press" },
        ],
      },
      {
        title: "Designers",
        links: [
          { label: "Meet the Artisans" },
          { label: "Collaborations", badge: "NEW" },
          { label: "Apply as Designer" },
        ],
      },
      {
        title: "More",
        links: [
          { label: "Journal" },
          { label: "Gift Cards" },
          { label: "Store Locator" },
          { label: "Contact Us" },
        ],
      },
    ],
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────
const ease = [0.76, 0, 0.24, 1] as const;

const overlayV = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.65, ease },
  },
  exit: { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.5, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const colV = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// ─── Hamburger ────────────────────────────────────────────────────────────────
function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      className="flex flex-col justify-center items-start gap-[7px] w-10 h-10 bg-transparent border-0 cursor-pointer p-0"
    >
      <motion.span
        className="block h-[2px] bg-gray-900 rounded-full origin-center"
        animate={
          open
            ? { width: 28, rotate: 45, y: 4.5 }
            : { width: 36, rotate: 0, y: 0 }
        }
        transition={{ duration: 0.38, ease }}
      />
      <motion.span
        className="block h-[2px] bg-gray-900 rounded-full origin-center"
        animate={
          open
            ? { width: 28, rotate: -45, y: -4.5 }
            : { width: 36, rotate: 0, y: 0 }
        }
        transition={{ duration: 0.38, ease }}
      />
    </button>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ── Fixed Header Bar ── */}
      <header className="z-500 ">
        <div className=" flex items-center justify-between px-4 sm:px-6 fixed top-3 left-0 right-0 z-500 ">
          {/* Left — Hamburger */}
          <Hamburger open={isOpen} onClick={() => setIsOpen((v) => !v)} />
        </div>
        {/* Right — 4 actions */}
        <div className="flex flex-col fixed right-2 top-5  gap-6 z-500">
          <button
            className="flex flex-col items-center gap-0.5 group"
            aria-label="Search"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
              className="text-black group-hover:text-[#C8102E] transition-colors"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="hidden sm:block text-[8px] tracking-[0.18em] uppercase text-black group-hover:text-[#C8102E] transition-colors font-medium">
              Search
            </span>
          </button>

          <button
            className="flex flex-col items-center gap-0.5 group relative"
            aria-label="Shopping bag"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
              className="text-black group-hover:text-[#C8102E] transition-colors"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="hidden sm:block text-[8px] tracking-[0.18em] uppercase text-black group-hover:text-[#C8102E] transition-colors font-medium whitespace-nowrap">
              Shopping <br /> Bag
              {/* <span className="text-[#C8102E]">[0]</span> */}
            </span>
          </button>

          <button
            className="hidden sm:flex flex-col items-center gap-0.5 group"
            aria-label="Log in"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
              className="text-black group-hover:text-[#C8102E] transition-colors"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-[8px] tracking-[0.18em] uppercase text-black group-hover:text-[#C8102E] transition-colors font-medium">
              Log In
            </span>
          </button>

          <button
            className="hidden sm:flex flex-col items-center gap-0.5 group"
            aria-label="Help"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
              className="text-black group-hover:text-[#C8102E] transition-colors"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span className="text-[8px] tracking-[0.18em] uppercase text-black group-hover:text-[#C8102E] transition-colors font-medium">
              Help
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-390 bg-black/20"
              onClick={() => setIsOpen(false)}
            />

            {/* Overlay panel */}
            <motion.nav
              key="nav-overlay"
              variants={overlayV}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-400 bg-white overflow-y-auto"
              style={{ willChange: "clip-path" }}
            >
              <div className="min-h-full flex flex-col px-10 sm:px-16 lg:px-24 pt-20 pb-12">
                {/* ── Logo row ── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="flex items-center justify-between mb-8"
                >
                  <span
                    className="text-gray-900 font-bold tracking-[0.25em] uppercase select-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.5rem",
                    }}
                  >
                    BRAND
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    Close
                  </button>
                </motion.div>

                {/* ── Top divider ── */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.25 }}
                  className="h-px bg-gray-200 mb-12 origin-left"
                />

                {/* ── 3 category columns ── */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-3 gap-0 flex-1"
                >
                  {NAV.map((cat, ci) => (
                    <motion.div
                      key={cat.id}
                      variants={colV}
                      className={`pb-10 sm:pb-0 ${ci < NAV.length - 1 ? "sm:border-r border-gray-100 sm:pr-12" : ""} ${ci > 0 ? "sm:pl-12" : ""}`}
                    >
                      {/* Big category heading */}
                      <h2
                        className="text-gray-900 font-bold leading-none mb-8"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {cat.heading}
                      </h2>

                      {/* Sub-columns */}
                      <div className="grid grid-cols-3 gap-6">
                        {cat.columns.map((col) => (
                          <div key={col.title}>
                            {/* Column title */}
                            <p className="text-[9px] tracking-[0.22em] uppercase font-semibold text-gray-400 mb-3">
                              {col.title}
                            </p>
                            {/* Links */}
                            <ul className="flex flex-col gap-1.5">
                              {col.links.map((link) => (
                                <li
                                  key={link.label}
                                  className="flex items-center gap-1.5"
                                >
                                  <a
                                    href={
                                      link.href ??
                                      `/${cat.id}/${link.label.toLowerCase().replace(/\s+/g, "-")}`
                                    }
                                    className="text-[0.82rem] text-black hover:text-[#C8102E] transition-colors duration-200 leading-snug relative group"
                                  >
                                    {link.label}
                                    <span className="absolute -bottom-px left-0 h-px w-0 bg-[#C8102E] group-hover:w-full transition-[width] duration-300" />
                                  </a>
                                  {link.badge && (
                                    <span className="text-[8px] font-bold tracking-[0.15em] text-[#C8102E] uppercase leading-none">
                                      {link.badge}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Mobile divider */}
                      {ci < NAV.length - 1 && (
                        <div className="sm:hidden mt-10 h-px bg-gray-100" />
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                {/* ── Bottom strip ── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                  className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-6">
                    {["About Us", "Careers", "Press"].map((l) => (
                      <a
                        key={l}
                        href="#"
                        className="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        {l}
                      </a>
                    ))}
                  </div>
                  <div className="flex items-center gap-6">
                    {["Instagram", "Pinterest", "YouTube"].map((s) => (
                      <a
                        key={s}
                        href="#"
                        className="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-[#C8102E] transition-colors"
                      >
                        {s}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
