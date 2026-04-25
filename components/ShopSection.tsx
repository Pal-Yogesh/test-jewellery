"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SponsoredProduct from "./SponsoredProduct";

// ─── Types ─────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  brand: string;
  name: string;
  price: string;
  images: [string, string]; // [primary, hover]
}

interface Section {
  id: string;
  heading: string;
  subheading: string;
  filters: string[];
  products: Product[];
}

// ─── Data ──────────────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
  {
    id: "new-arrivals",
    heading: "New Arrivals",
    subheading: "Fresh from our artisan studios",
    filters: ["Under ₹3K", "Under ₹5K", "Under ₹10K"],
    products: [
      {
        id: 1,
        brand: "BRAND",
        name: "Paprika Summer Choker",
        price: "₹ 3,000",
        images: [
          "https://i.pinimg.com/736x/22/fc/78/22fc78750310a51d4ae02a485449f39a.jpg",
          "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80",
        ],
      },
      {
        id: 2,
        brand: "BRAND",
        name: "Basra Link Hairband",
        price: "₹ 3,000",
        images: [
          "https://i.pinimg.com/736x/49/1c/6f/491c6fef18ffb1e117baa2216bfdc293.jpg",
          "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80",
        ],
      },
      {
        id: 3,
        brand: "BRAND",
        name: "Darpan Meen Hairpins",
        price: "₹ 2,500",
        images: [
          "https://i.pinimg.com/1200x/c8/93/51/c89351439a0a251b70a95c6f04087fd8.jpg",
          "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80",
        ],
      },
      {
        id: 4,
        brand: "BRAND",
        name: "Solomon Pendant",
        price: "₹ 3,000",
        images: [
          "https://i.pinimg.com/1200x/57/93/22/57932288f2c24e6aaa9400fc99b3a120.jpg",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
        ],
      },
      {
        id: 5,
        brand: "BRAND",
        name: "Lotus Stud Earrings",
        price: "₹ 1,800",
        images: [
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
          "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80",
        ],
      },
    ],
  },
  // {
  //   id: "bridal-edit",
  //   heading: "Bridal Edit",
  //   subheading: "Timeless sets for your forever moment",
  //   filters: ["Under ₹5K", "Under ₹10K", "Under ₹20K"],
  //   products: [
  //     {
  //       id: 6,
  //       brand: "BRAND",
  //       name: "Jadau Bridal Necklace",
  //       price: "₹ 8,500",
  //       images: [
  //         "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
  //         "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80",
  //       ],
  //     },
  //     {
  //       id: 7,
  //       brand: "BRAND",
  //       name: "Kundan Maang Tikka",
  //       price: "₹ 4,200",
  //       images: [
  //         "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80",
  //         "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80",
  //       ],
  //     },
  //     {
  //       id: 8,
  //       brand: "BRAND",
  //       name: "Polki Chandbali Set",
  //       price: "₹ 12,000",
  //       images: [
  //         "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80",
  //         "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  //       ],
  //     },
  //     {
  //       id: 9,
  //       brand: "BRAND",
  //       name: "Temple Bangles Pair",
  //       price: "₹ 6,800",
  //       images: [
  //         "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80",
  //         "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  //       ],
  //     },
  //     {
  //       id: 10,
  //       brand: "BRAND",
  //       name: "Meenakari Haath Phool",
  //       price: "₹ 5,500",
  //       images: [
  //         "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
  //         "https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=600&q=80",
  //       ],
  //     },
  //   ],
  // },
  {
    id: "festive",
    heading: "Our Brand",
    subheading: "Bold, joyful, unapologetically magnificent",
    filters: ["Under ₹3K", "Under ₹5K", "Under ₹10K"],
    products: [
      {
        id: 11,
        brand: "BRAND",
        name: "Oxidised Jhumka",
        price: "₹ 1,600",
        images: [
          "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80",
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
        ],
      },
      {
        id: 12,
        brand: "BRAND",
        name: "Filigree Cuff Bracelet",
        price: "₹ 2,800",
        images: [
          "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80",
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
        ],
      },
      {
        id: 13,
        brand: "BRAND",
        name: "Tribal Silver Anklet",
        price: "₹ 2,200",
        images: [
          "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80",
          "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80",
        ],
      },
      {
        id: 14,
        brand: "BRAND",
        name: "Enamel Floral Ring",
        price: "₹ 1,400",
        images: [
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
          "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80",
        ],
      },
      {
        id: 15,
        brand: "BRAND",
        name: "Layered Coin Necklace",
        price: "₹ 3,400",
        images: [
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
          "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80",
        ],
      },
    ],
  },
];

// ─── Product Card ──────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="shrink-0 w-[220px] sm:w-[300px] cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded-[20px] bg-[#f5f3f0] aspect-3/4 mb-3">
        {/* Primary image */}
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          animate={{ x: hovered ? "-8%" : "0%", scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* Hover image — peeks in from the right */}
        <motion.img
          src={product.images[1]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          initial={{ x: "100%" }}
          animate={{ x: hovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* Quick add pill */}
        <motion.div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white text-gray-900 text-[10px] tracking-[0.18em] uppercase font-bold px-5 py-2 rounded-full shadow-md whitespace-nowrap"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.25 }}
        >
          Quick Add
        </motion.div>
      </div>

      {/* Info */}
      <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">
        {product.brand}
      </p>
      <p className="text-sm font-semibold text-gray-900 leading-snug mb-1 group-hover:text-[#C8102E] transition-colors duration-200">
        {product.name}
      </p>
      <p className="text-sm text-gray-600">{product.price}</p>
    </div>
  );
}

// ─── Section Card ──────────────────────────────────────────────────────────
function SectionCard({ section }: { section: Section }) {
  const [activeFilter, setActiveFilter] = useState(section.filters[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "right" ? 280 : -280,
      behavior: "smooth",
    });
  };

  return (
    <div className=" overflow-hidden px-4 sm:px-6 lg:px-18">
      {/* Card header */}
      <div className="px-3 pt-8 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#C8102E] font-semibold flex items-center gap-2 mb-2">
            {section.subheading}
          </span>
          <h2
            className="text-gray-900 font-bold leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            }}
          >
            {section.heading}
          </h2>
        </div>

        {/* Filters + nav */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Filter pills */}
          <div className="flex items-center gap-2">
            {section.filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="text-[11px] tracking-[0.12em] uppercase font-semibold px-5 py-4 rounded-full border transition-all duration-200"
                style={{
                  background: activeFilter === f ? "#C8102E" : "transparent",
                  color: activeFilter === f ? "#fff" : "#6b7280",
                  borderColor: activeFilter === f ? "#C8102E" : "#e5e7eb",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Arrow nav */}
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#C8102E] hover:text-[#C8102E] transition-all"
              aria-label="Scroll left"
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#C8102E] hover:text-[#C8102E] transition-all"
              aria-label="Scroll right"
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable product row */}
      <div
        ref={scrollRef}
        className="flex gap-4 px-3 py-7 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {section.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {/* View all card */}
        <div className="shrink-0 w-[220px] sm:w-[240px] flex items-center justify-center">
          <a
            href={`/collections/${section.id}`}
            className="flex flex-col items-center gap-3 text-center group"
          >
            <div className="w-14 h-14 rounded-full border-2 border-gray-200 group-hover:border-[#C8102E] flex items-center justify-center text-gray-400 group-hover:text-[#C8102E] transition-all duration-300">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-gray-400 group-hover:text-[#C8102E] transition-colors">
              View All
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────
export default function ShopSection() {
  const newArrivals = SECTIONS.find((s) => s.id === "new-arrivals");
  const ourBrand = SECTIONS.find((s) => s.id === "festive");

  return (
    <section className="bg-[#fafafa] py-10 ">
      <div className="flex flex-col gap-6">
        {newArrivals && <SectionCard section={newArrivals} />}
        <SponsoredProduct />
        {ourBrand && <SectionCard section={ourBrand} />}
      </div>
    </section>
  );
}
