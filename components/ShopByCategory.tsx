"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ─────────────────────────────────────────────────────────────────
interface Category {
  id: number;
  label: string;
  sub: string;
  href: string;
  image: string;
  span?: "wide" | "tall" | "normal";
}

interface Collection {
  id: number;
  label: string;
  tag: string;
  desc: string;
  href: string;
  image: string;
  cta: string;
  dark?: boolean;
}

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    id: 1, label: "Neckpieces", sub: "68 styles", href: "/collections/neckpieces",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80", span: "wide",
  },
  {
    id: 2, label: "Earrings", sub: "124 styles", href: "/collections/earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80", span: "normal",
  },
  {
    id: 3, label: "Rings", sub: "92 styles", href: "/collections/rings",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80", span: "normal",
  },
  // {
  //   id: 4, label: "Bangles", sub: "47 styles", href: "/collections/bangles",
  //   image: "https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=800&q=80", span: "tall",
  // },
  // {
  //   id: 5, label: "Bracelets", sub: "38 styles", href: "/collections/bracelets",
  //   image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80", span: "normal",
  // },
  // {
  //   id: 6, label: "Anklets", sub: "29 styles", href: "/collections/anklets",
  //   image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80", span: "normal",
  // },
];

const COLLECTIONS: Collection[] = [
  {
    id: 1, label: "Bridal Edit", tag: "Exclusive",
    desc: "Timeless sets crafted for the bride who deserves nothing less than extraordinary.",
    href: "/collections/bridal",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80",
    cta: "Explore Bridal", dark: true,
  },
  {
    id: 2, label: "Everyday Luxe", tag: "New Season",
    desc: "Subtle, wearable pieces that move with you — from morning chai to midnight celebrations.",
    href: "/collections/everyday",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80",
    cta: "Shop the Edit", dark: false,
  },
  {
    id: 3, label: "Festive Splendour", tag: "Limited",
    desc: "Bold, joyful, unapologetically magnificent. Made to turn every room into a stage.",
    href: "/collections/festive",
    image: "https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=900&q=80",
    cta: "View Collection", dark: true,
  },
];

// ─── SVG Icons ─────────────────────────────────────────────────────────────
const icons: TrustItem[] = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "100% Authentic", desc: "Every piece certified by master artisans",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    title: "Free Shipping", desc: "On all orders above ₹200000",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Easy Returns", desc: "Hassle-free 15-day return policy",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: "Secure Payment", desc: "UPI, cards, EMI & more",
  },
];

// ─── Section Header ────────────────────────────────────────────────────────
const SectionHeader = ({
  eyebrow, title, titleItalic, center = false,
}: {
  eyebrow: string; title: string; titleItalic?: string; center?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`flex flex-col ${center ? "items-center text-center" : "items-start"} mb-10`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-[11px] tracking-[.25em] uppercase text-[#C8102E] font-semibold mb-3 flex items-center gap-2"
      >
        <span className="w-6 h-px bg-[#C8102E] inline-block" />
        {eyebrow}
        <span className="w-6 h-px bg-[#C8102E] inline-block" />
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.08 }}
        className="text-gray-900 font-bold leading-[1.08]"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        {title}{" "}
        {titleItalic && <em className="text-[#C8102E]" style={{ fontStyle: "italic" }}>{titleItalic}</em>}
      </motion.h2>
    </div>
  );
};

// ─── Trust Strip ───────────────────────────────────────────────────────────
const TrustStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="bg-[#fafafa] border-y border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {icons.map((item, i) => (
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
                <p className="text-sm font-semibold text-gray-800 tracking-wide mb-0.5">{item.title}</p>
                <p className="text-[11px] text-gray-400 tracking-wide">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Category Card ─────────────────────────────────────────────────────────
const CategoryCard = ({ cat, index }: { cat: Category; index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const heightClass =
    cat.span === "wide" ? "h-72 sm:h-80" : cat.span === "tall" ? "h-72 sm:h-[420px]" : "h-72 sm:h-72";

  return (
    <motion.a
      ref={ref}
      href={cat.href}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-sm cursor-pointer block group ${heightClass} ${
        cat.span === "wide" ? "sm:col-span-2" : cat.span === "tall" ? "sm:row-span-2" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={cat.image} alt={cat.label}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <motion.div
        className="absolute inset-0 bg-[#C8102E]/10"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8102E]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ originY: 0 }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-[10px] tracking-[.2em] uppercase text-white/50 mb-1">{cat.sub}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-white font-bold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem" }}>
            {cat.label}
          </h3>
          <motion.div
            className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white"
            animate={{ backgroundColor: hovered ? "#C8102E" : "transparent", borderColor: hovered ? "#C8102E" : "rgba(255,255,255,0.3)" }}
            transition={{ duration: 0.25 }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
};

// ─── Featured Collection Card ──────────────────────────────────────────────
const CollectionCard = ({ col, index }: { col: Collection; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-sm group cursor-pointer h-[480px] sm:h-[520px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={col.image} alt={col.label}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        col.dark
          ? "bg-linear-to-t from-black/85 via-black/40 to-black/10"
          : "bg-linear-to-t from-black/80 via-black/30 to-transparent"
      }`} />
      <div className="absolute top-5 left-5">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 + index * 0.12 }}
          className="bg-[#C8102E] text-white text-[9px] tracking-[.2em] uppercase font-bold px-3 py-1.5 rounded-sm"
        >
          {col.tag}
        </motion.span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <motion.p className="text-[10px] tracking-[.22em] uppercase text-white/40 mb-2" animate={{ opacity: hovered ? 1 : 0.4 }}>
          Collection
        </motion.p>
        <h3 className="text-white font-bold mb-3 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
          {col.label}
        </h3>
        <motion.p
          className="text-white/65 text-sm leading-relaxed mb-5 max-w-xs"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.35 }}
        >
          {col.desc}
        </motion.p>
        <motion.a
          href={col.href}
          className="inline-flex items-center gap-2 text-[11px] tracking-[.2em] uppercase font-bold"
          animate={{ color: hovered ? "#C8102E" : "rgba(255,255,255,0.8)" }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          {col.cta}
          <motion.svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.25 }}>
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </motion.svg>
        </motion.a>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C8102E]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
};

// ─── Marquee Strip ─────────────────────────────────────────────────────────
const MarqueeStrip = () => {
  const tags = [
    "Handcrafted Silver", "Jadau Jewellery", "Bridal Sets", "Temple Jewellery",
    "Meenakari", "Kundan", "Filigree", "Oxidised Silver", "Tribal Art", "Festive Wear",
  ];
  const repeated = [...tags, ...tags, ...tags];

  return (
    <div className="overflow-hidden border-y border-gray-100 py-3.5 bg-white">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((tag, i) => (
          <span key={i} className="flex items-center gap-4 shrink-0">
            <span className="text-[11px] tracking-[.2em] uppercase text-gray-400 font-medium">{tag}</span>
            <span className="text-[#C8102E] text-xs">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Occasion Filter Tabs ──────────────────────────────────────────────────
const OCCASIONS = ["All", "Wedding", "Festive", "Everyday", "Party", "Office"];

const OccasionTabs = () => {
  const [active, setActive] = useState("All");
  return (
    <div className="flex items-center gap-2 flex-wrap mt-2">
      {OCCASIONS.map((o) => (
        <button
          key={o}
          onClick={() => setActive(o)}
          className="relative text-[11px] tracking-[.15em] uppercase font-semibold px-4 py-2 rounded-sm transition-colors"
          style={{
            color: active === o ? "#fff" : "#6b7280",
            backgroundColor: active === o ? "#C8102E" : "transparent",
            border: active === o ? "1px solid #C8102E" : "1px solid #e5e7eb",
          }}
        >
          {active === o && (
            <motion.span
              layoutId="tab-pill"
              className="absolute inset-0 bg-[#C8102E] rounded-sm -z-10"
              transition={{ type: "spring", bounce: 0.22, duration: 0.5 }}
            />
          )}
          {o}
        </button>
      ))}
    </div>
  );
};

// ─── Occasion Card (extracted to avoid hooks in map) ───────────────────────
const OccasionCard = ({ occ, index }: { occ: { label: string; count: string; image: string; href: string }; index: number }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-60px" });
  return (
    <motion.a
      ref={cardRef}
      href={occ.href}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={cardInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-sm block h-56 sm:h-64"
    >
      <img src={occ.image} alt={occ.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[9px] tracking-[.2em] uppercase text-white/40 mb-0.5">{occ.count}</p>
        <h4 className="text-white font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}>
          {occ.label}
        </h4>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C8102E] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
    </motion.a>
  );
};

// ─── OCCASION DATA ─────────────────────────────────────────────────────────
const OCCASION_ITEMS = [
  { label: "Wedding & Bridal", count: "120+ pieces", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80", href: "/occasions/wedding" },
  { label: "Festive", count: "84 pieces", image: "https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=600&q=80", href: "/occasions/festive" },
  { label: "Everyday", count: "96 pieces", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80", href: "/occasions/everyday" },
  { label: "Cocktail & Party", count: "58 pieces", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80", href: "/occasions/party" },
];

// ─── STACK CARD WRAPPER ────────────────────────────────────────────────────
const STACK_OFFSET = 20; // px offset between stacked cards

function StackCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const totalCards = cards.length;

    cards.forEach((card, i) => {
      // Each card gets sticky positioning via CSS.
      // As user scrolls past each card, it scales down slightly and moves up
      // to create the "stacking" illusion where the next card overlaps it.

      if (i < totalCards - 1) {
        const scaleTarget = 1 - (totalCards - 1 - i) * 0.04;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: `+=${window.innerHeight * 0.8}`,
          pin: false,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * (1 - scaleTarget);
            const brightness = 1 - progress * 0.15;
            card.style.transform = `scale(${scale})`;
            card.style.filter = `brightness(${brightness})`;
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const cardData = [
    {
      id: "shop-by-category",
      content: (
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <SectionHeader eyebrow="Browse" title="Shop by" titleItalic="Category" />
              {/* <div className="h-[2px] w-24 bg-gray-100 mt-1 overflow-hidden rounded-full">
                <div className="heading-line h-full bg-[#C8102E] w-full origin-left scale-x-0" />
              </div> */}
            </div>
            <a href="/collections/all" className="group flex items-center gap-2 text-[11px] tracking-[.2em] uppercase font-bold text-gray-500 hover:text-[#C8102E] transition-colors shrink-0 mb-2">
              View All
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-auto">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        </section>
      ),
    },
    {
      id: "featured-collections",
      content: (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <SectionHeader eyebrow="Curated for You" title="Featured" titleItalic="Collections" />
              <a href="/collections" className="group flex items-center gap-2 text-[11px] tracking-[.2em] uppercase font-bold text-gray-500 hover:text-[#C8102E] transition-colors shrink-0 mb-2">
                All Collections
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="group-hover:translate-x-1 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {COLLECTIONS.map((col, i) => (
                <CollectionCard key={col.id} col={col} index={i} />
              ))}
            </div>
          </div>
        </section>
      ),
    },
    {
      id: "shop-by-occasion",
      content: (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
              <SectionHeader eyebrow="Dress the Moment" title="Shop by" titleItalic="Occasion" />
            </div>
            <OccasionTabs />
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {OCCASION_ITEMS.map((occ, i) => (
                <OccasionCard key={occ.label} occ={occ} index={i} />
              ))}
            </div>
          </div>
        </section>
      ),
    },
  ];

  const bgColors = ["bg-white", "bg-[#fafafa]", "bg-white"];

  return (
    <div ref={containerRef} className="relative">
      {cardData.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => { cardRefs.current[i] = el; }}
          className={`sticky rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-gray-100/60 overflow-hidden ${bgColors[i]}`}
          style={{
            top: `${20 + i * STACK_OFFSET}px`,
            zIndex: i + 1,
            transformOrigin: "top center",
            marginBottom: i < cardData.length - 1 ? "40px" : "0",
          }}
        >
          {card.content}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────
export default function ShopByCategory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const line = sectionRef.current?.querySelector(".heading-line");
    if (!line) return;
    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: line, start: "top 85%" },
      }
    );
  }, []);

  return (
    <main ref={sectionRef} className="bg-white">
      {/* ── STACKING CARDS: 3 sections ── */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <StackCards />
      </div>

    
    </main>
  );
}