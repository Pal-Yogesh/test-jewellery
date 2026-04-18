// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// import { gsap } from "gsap";

// // ─── Types ───────────────────────────────────────────────────────────────────
// interface SubItem {
//   label: string;
//   href: string;
// }

// interface NavItem {
//   label: string;
//   href?: string;
//   sub?: SubItem[];
// }

// // ─── Nav Data ─────────────────────────────────────────────────────────────────
// const NAV_ITEMS: NavItem[] = [
//   {
//     label: "Collections",
//     sub: [
//       { label: "New Arrivals", href: "/collections/new-arrivals" },
//       { label: "Best Sellers", href: "/collections/best-sellers" },
//       { label: "Bridal Edit", href: "/collections/bridal" },
//       { label: "Festive Picks", href: "/collections/festive" },
//     ],
//   },
//   {
//     label: "Jewellery",
//     sub: [
//       { label: "Neckpieces", href: "/collections/neckpieces" },
//       { label: "Earrings", href: "/collections/earrings" },
//       { label: "Rings", href: "/collections/rings" },
//       { label: "Bangles & Bracelets", href: "/collections/bangles" },
//       { label: "Anklets", href: "/collections/anklets" },
//     ],
//   },
//   {
//     label: "By Occasion",
//     sub: [
//       { label: "Wedding & Bridal", href: "/occasions/wedding" },
//       { label: "Cocktail & Party", href: "/occasions/cocktail" },
//       { label: "Everyday Wear", href: "/occasions/everyday" },
//       { label: "Gifts", href: "/occasions/gifts" },
//     ],
//   },
//   {
//     label: "Designers",
//     href: "/designers",
//   },
//   {
//     label: "About",
//     href: "/about",
//   },
// ];

// // ─── Icons ────────────────────────────────────────────────────────────────────
// const SearchIcon = () => (
//   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
//     <circle cx="11" cy="11" r="8" />
//     <line x1="21" y1="21" x2="16.65" y2="16.65" />
//   </svg>
// );

// const HeartIcon = () => (
//   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//   </svg>
// );

// const CartIcon = () => (
//   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
//     <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
//     <line x1="3" y1="6" x2="21" y2="6" />
//     <path d="M16 10a4 4 0 0 1-8 0" />
//   </svg>
// );

// const UserIcon = () => (
//   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//     <circle cx="12" cy="7" r="4" />
//   </svg>
// );

// const MenuIcon = () => (
//   <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
//     <line x1="3" y1="6" x2="21" y2="6" />
//     <line x1="3" y1="12" x2="21" y2="12" />
//     <line x1="3" y1="18" x2="21" y2="18" />
//   </svg>
// );

// const CloseIcon = () => (
//   <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
//     <line x1="18" y1="6" x2="6" y2="18" />
//     <line x1="6" y1="6" x2="18" y2="18" />
//   </svg>
// );

// const ChevronDown = () => (
//   <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//     <polyline points="6 9 12 15 18 9" />
//   </svg>
// );

// // ─── Announcement Bar ─────────────────────────────────────────────────────────
// const ANNOUNCEMENTS = [
//   "✦  Free shipping on orders above ₹2,000",
//   "✦  Use code NIMAI10 for 10% off your first order",
//   "✦  New Festive Collection — Shop Now",
// ];

// const AnnouncementBar = () => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length), 3500);
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <div className="bg-[#C8102E] text-white text-[11px] tracking-[0.18em] font-medium h-9 flex items-center justify-center overflow-hidden relative">
//       <AnimatePresence mode="wait">
//         <motion.span
//           key={index}
//           initial={{ y: 16, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: -16, opacity: 0 }}
//           transition={{ duration: 0.4, ease: "easeInOut" }}
//           className="absolute uppercase"
//         >
//           {ANNOUNCEMENTS[index]}
//         </motion.span>
//       </AnimatePresence>
//     </div>
//   );
// };

// // ─── Search Overlay ───────────────────────────────────────────────────────────
// const SearchOverlay = ({ onClose }: { onClose: () => void }) => {
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     setTimeout(() => inputRef.current?.focus(), 200);
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.25 }}
//       className="fixed inset-0 bg-white/95 backdrop-blur-md z-[200] flex items-start justify-center pt-32"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: -20, opacity: 0 }}
//         transition={{ duration: 0.3, delay: 0.05 }}
//         className="w-full max-w-2xl px-6"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="relative border-b-2 border-[#C8102E] pb-3">
//           <input
//             ref={inputRef}
//             type="text"
//             placeholder="Search for jewellery, designers…"
//             className="w-full text-2xl font-light text-gray-800 outline-none bg-transparent placeholder-gray-300 pr-10 tracking-wide"
//             style={{ fontFamily: "'Cormorant Garamond', serif" }}
//           />
//           <button onClick={onClose} className="absolute right-0 top-1 text-gray-400 hover:text-[#C8102E] transition-colors">
//             <CloseIcon />
//           </button>
//         </div>
//         <p className="text-xs text-gray-400 mt-4 tracking-widest uppercase">Popular: Earrings · Bridal · Silver · Jadau</p>
//       </motion.div>
//     </motion.div>
//   );
// };

// // ─── Mobile Drawer ────────────────────────────────────────────────────────────
// const MobileDrawer = ({ onClose }: { onClose: () => void }) => {
//   const [openIdx, setOpenIdx] = useState<number | null>(null);

//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: 0 }}
//       exit={{ x: "100%" }}
//       transition={{ type: "spring", damping: 28, stiffness: 260 }}
//       className="fixed top-0 right-0 h-full w-80 bg-white z-[150] shadow-2xl flex flex-col"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
//         <span className="text-[#C8102E] font-bold tracking-[0.2em] text-sm uppercase" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
//           NIMAI
//         </span>
//         <button onClick={onClose} className="text-gray-500 hover:text-[#C8102E] transition-colors">
//           <CloseIcon />
//         </button>
//       </div>

//       {/* Nav Items */}
//       <nav className="flex-1 overflow-y-auto py-4">
//         {NAV_ITEMS.map((item, idx) => (
//           <div key={item.label}>
//             <button
//               onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
//               className="w-full flex items-center justify-between px-6 py-3.5 text-gray-800 hover:text-[#C8102E] transition-colors"
//             >
//               <span className="text-sm tracking-[0.12em] uppercase font-medium">{item.label}</span>
//               {item.sub && (
//                 <motion.span animate={{ rotate: openIdx === idx ? 180 : 0 }} transition={{ duration: 0.2 }}>
//                   <ChevronDown />
//                 </motion.span>
//               )}
//             </button>
//             <AnimatePresence>
//               {item.sub && openIdx === idx && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.25 }}
//                   className="overflow-hidden bg-gray-50"
//                 >
//                   {item.sub.map((s) => (
//                     <a
//                       key={s.label}
//                       href={s.href}
//                       className="block px-10 py-2.5 text-xs tracking-widest uppercase text-gray-500 hover:text-[#C8102E] transition-colors"
//                     >
//                       {s.label}
//                     </a>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="border-t border-gray-100 px-6 py-5 flex gap-5">
//         <button className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-500 hover:text-[#C8102E] transition-colors">
//           <UserIcon /> Account
//         </button>
//         <button className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-500 hover:text-[#C8102E] transition-colors">
//           <HeartIcon /> Wishlist
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// // ─── Dropdown Menu ────────────────────────────────────────────────────────────
// const DropdownMenu = ({ items }: { items: SubItem[] }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 10 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: 6 }}
//     transition={{ duration: 0.2, ease: "easeOut" }}
//     className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white shadow-xl border border-gray-100 rounded-sm py-3 min-w-[200px] z-50"
//   >
//     {/* Red accent line */}
//     <span className="absolute top-0 left-6 right-6 h-[2px] bg-[#C8102E] rounded-full" />
//     {items.map((item) => (
//       <a
//         key={item.label}
//         href={item.href}
//         className="block px-6 py-2 text-[11px] tracking-[0.18em] uppercase text-gray-600 hover:text-[#C8102E] hover:bg-red-50/60 transition-all"
//       >
//         {item.label}
//       </a>
//     ))}
//   </motion.div>
// );

// // ─── Main Navbar ──────────────────────────────────────────────────────────────
// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [cartCount] = useState(2);
//   const logoRef = useRef<HTMLAnchorElement>(null);
//   const navRef = useRef<HTMLDivElement>(null);

//   const { scrollY } = useScroll();
//   const navShadow = useTransform(scrollY, [0, 60], [0, 0.12]);

//   // Scroll detection
//   useEffect(() => {
//     const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
//     return unsub;
//   }, [scrollY]);

//   // GSAP logo reveal on mount
//   useEffect(() => {
//     if (!logoRef.current) return;
//     gsap.fromTo(
//       logoRef.current,
//       { opacity: 0, y: -10 },
//       { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
//     );
//   }, []);

//   // GSAP nav-items stagger on mount
//   useEffect(() => {
//     if (!navRef.current) return;
//     const items = navRef.current.querySelectorAll(".nav-link");
//     gsap.fromTo(
//       items,
//       { opacity: 0, y: -8 },
//       { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power2.out", delay: 0.35 }
//     );
//   }, []);

//   return (
//     <>
//       {/* Announcement */}
//       <AnnouncementBar />

//       {/* ── Sticky Wrapper ── */}
//       <motion.header
//         style={{ boxShadow: useTransform(navShadow, (v) => `0 2px 24px rgba(0,0,0,${v})`) }}
//         className={` z-[100] transition-colors duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md" : "bg-white"}`}
//       >
//         {/* ── Brand Strip (top) ── */}
//         <div className="border-b border-gray-100">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">

//             {/* Left — Icons (desktop) */}
//             <div className="hidden lg:flex items-center gap-5 text-gray-500 flex-1">
//               <button
//                 onClick={() => setSearchOpen(true)}
//                 className="hover:text-[#C8102E] transition-colors"
//                 aria-label="Search"
//               >
//                 <SearchIcon />
//               </button>
//               <button className="hover:text-[#C8102E] transition-colors" aria-label="Account">
//                 <UserIcon />
//               </button>
//             </div>

//             {/* Center — Logo */}
//             <a
//               ref={logoRef}
//               href="/"
//               className="flex flex-col items-center select-none group"
//               style={{ opacity: 0 }} // gsap will reveal
//             >
//               {/* Decorative diamond motif */}
//               <span className="text-[#C8102E] text-[8px] tracking-[0.4em] uppercase mb-0.5 font-semibold">
//                 ◆ &nbsp; Makers Collective &nbsp; ◆
//               </span>
//               <span
//                 className="text-gray-900 font-bold tracking-[0.35em] uppercase leading-none group-hover:text-[#C8102E] transition-colors duration-300"
//                 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", letterSpacing: "0.3em" }}
//               >
//                 BRAND
//               </span>
//               {/* Underline grows on hover */}
//               <motion.span
//                 className="block h-[1.5px] bg-[#C8102E] mt-1"
//                 initial={{ width: 0 }}
//                 whileHover={{ width: "100%" }}
//                 transition={{ duration: 0.3 }}
//               />
//             </a>

//             {/* Right — Cart + Wishlist + Mobile Menu */}
//             <div className="flex items-center gap-4 flex-1 justify-end text-gray-500">
//               <button className="hidden lg:block hover:text-[#C8102E] transition-colors" aria-label="Wishlist">
//                 <HeartIcon />
//               </button>

//               {/* Cart with badge */}
//               <button className="relative hover:text-[#C8102E] transition-colors" aria-label="Cart">
//                 <CartIcon />
//                 {cartCount > 0 && (
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className="absolute -top-1.5 -right-1.5 bg-[#C8102E] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none"
//                   >
//                     {cartCount}
//                   </motion.span>
//                 )}
//               </button>

//               {/* Mobile hamburger */}
//               <button
//                 className="lg:hidden hover:text-[#C8102E] transition-colors"
//                 onClick={() => setMobileOpen(true)}
//                 aria-label="Open menu"
//               >
//                 <MenuIcon />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ── Navigation Bar (desktop) ── */}
//         <div className="hidden lg:block border-b border-gray-100">
//           <nav ref={navRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-center gap-10">
//             {NAV_ITEMS.map((item) => (
//               <div
//                 key={item.label}
//                 className="relative nav-link"
//                 onMouseEnter={() => item.sub && setActiveMenu(item.label)}
//                 onMouseLeave={() => setActiveMenu(null)}
//               >
//                 <a
//                   href={item.href ?? "#"}
//                   className={`flex items-center gap-1 text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-200 ${
//                     activeMenu === item.label ? "text-[#C8102E]" : "text-gray-700 hover:text-[#C8102E]"
//                   }`}
//                 >
//                   {item.label}
//                   {item.sub && (
//                     <motion.span animate={{ rotate: activeMenu === item.label ? 180 : 0 }} transition={{ duration: 0.2 }}>
//                       <ChevronDown />
//                     </motion.span>
//                   )}
//                 </a>

//                 {/* Active underline */}
//                 <motion.span
//                   className="absolute bottom-0 left-0 h-[2px] bg-[#C8102E]"
//                   animate={{ width: activeMenu === item.label ? "100%" : "0%" }}
//                   transition={{ duration: 0.2 }}
//                 />

//                 {/* Dropdown */}
//                 <AnimatePresence>
//                   {item.sub && activeMenu === item.label && (
//                     <DropdownMenu items={item.sub} />
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}
//           </nav>
//         </div>
//       </motion.header>

//       {/* ── Search Overlay ── */}
//       <AnimatePresence>
//         {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
//       </AnimatePresence>

//       {/* ── Mobile Backdrop ── */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.4 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black z-[140]"
//               onClick={() => setMobileOpen(false)}
//             />
//             <MobileDrawer onClose={() => setMobileOpen(false)} />
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "WOMAN" | "MAN" | "BRAND";

interface NavItem {
  label: string;
  badge?: string;
}

interface NavSection {
  number: string;
  title: string;
  items: NavItem[];
}

// ─── Content Data ─────────────────────────────────────────────────────────────

const NAV_DATA: Record<Category, NavSection[]> = {
  WOMAN: [
    {
      number: "01",
      title: "NEW IN",
      items: [
        { label: "The New" },
        { label: "The Item" },
        { label: "Dylan's T-Shirt Club", badge: "NEW" },
      ],
    },
    {
      number: "02",
      title: "TRENDS",
      items: [
        { label: "Spring Looks" },
        { label: "All Whites" },
        { label: "Linen", badge: "NEW" },
      ],
    },
    {
      number: "03",
      title: "COLLECTION",
      items: [
        { label: "Best Sellers" },
        { label: "Dresses" },
        { label: "Tops" },
        { label: "Shirts" },
      ],
    },
  ],
  MAN: [
    {
      number: "01",
      title: "NEW IN",
      items: [
        { label: "The New" },
        { label: "The Item" },
        { label: "Essentials Edit", badge: "NEW" },
      ],
    },
    {
      number: "02",
      title: "TRENDS",
      items: [
        { label: "Summer Looks" },
        { label: "All Neutrals" },
        { label: "Linen", badge: "NEW" },
      ],
    },
    {
      number: "03",
      title: "COLLECTION",
      items: [
        { label: "Best Sellers" },
        { label: "Suits" },
        { label: "Shirts" },
        { label: "Trousers" },
      ],
    },
  ],
  BRAND: [
    {
      number: "01",
      title: "NEW IN",
      items: [
        { label: "Latest Arrivals" },
        { label: "Collaborations", badge: "NEW" },
        { label: "Limited Editions" },
      ],
    },
    {
      number: "02",
      title: "STORIES",
      items: [
        { label: "Campaigns" },
        { label: "Sustainability" },
        { label: "Zara Origins" },
      ],
    },
    {
      number: "03",
      title: "WORLD",
      items: [
        { label: "Zara Home" },
        { label: "SRPLS" },
        { label: "Origins" },
        { label: "Zara Beauty" },
      ],
    },
  ],
};

const CATEGORIES: Category[] = ["WOMAN", "MAN", "BRAND"];

const ease = [0.76, 0, 0.24, 1] as const;

const overlayVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.7, ease },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.55, ease },
  },
};

const logoVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: 0.2 },
  },
};

const dividerVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease, delay: 0.25 },
  },
};

const catListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.28 } },
};

const catItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.0 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2, ease } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease, delay: 0.12 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.3, ease },
  },
};

// ─── Hamburger ────────────────────────────────────────────────────────────────

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="fixed top-6 left-6 z-[400] flex flex-col justify-center items-start gap-[7px] w-8 h-8 bg-transparent border-0 cursor-pointer p-0"
    >
      <motion.span
        className="block h-px bg-black rounded-full"
        animate={open ? { width: 44, rotate: 45, y: 3.5 } : { width: 44, rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease }}
      />
      <motion.span
        className="block h-px bg-black rounded-full"
        animate={open ? { width: 44, rotate: -45, y: -3.5 } : { width: 44, rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease }}
      />
    </button>
  );
}

// ─── Category List ────────────────────────────────────────────────────────────

function CategoryList({
  active,
  onSelect,
}: {
  active: Category;
  onSelect: (c: Category) => void;
}) {
  return (
    <motion.ul
      variants={catListVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-56 shrink-0 mt-1"
    >
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <motion.li key={cat} variants={catItemVariants}>
            <button
              onClick={() => onSelect(cat)}
              className="flex items-center gap-2.5 text-left w-full py-0.5 bg-transparent border-0 cursor-pointer"
            >
              {/* Active dot */}
              <motion.span
                className="text-black font-serif text-2xl leading-none"
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                transition={{ duration: 0.25, ease }}
              >
                ·
              </motion.span>
              <span
                className={[
                  "font-serif text-[2rem] font-bold leading-tight tracking-tight",
                  "transition-colors duration-300",
                  isActive ? "text-black" : "text-black/25 hover:text-black/50",
                ].join(" ")}
              >
                {cat}
              </span>
            </button>
          </motion.li>
        );
      })}

    </motion.ul>
  );
}

// ─── Section Content ──────────────────────────────────────────────────────────

function SectionContent({ sections }: { sections: NavSection[] }) {
  // Pre-compute label offsets so labels align with their group of items
  const ROW_H = 23; // px per item row
  const GROUP_GAP = 34; // px between section groups

  let cumOffset = 0;
  const labelOffsets: number[] = sections.map((sec, i) => {
    const offset = i === 0 ? 0 : cumOffset;
    cumOffset += sec.items.length * ROW_H + GROUP_GAP;
    return offset;
  });
  // reset for real calculation
  cumOffset = 0;
  const realOffsets = sections.map((sec, i) => {
    if (i === 0) {
      cumOffset = sec.items.length * ROW_H + GROUP_GAP;
      return 0;
    }
    const off = cumOffset;
    cumOffset += sec.items.length * ROW_H + GROUP_GAP;
    return off;
  });

  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex gap-14 flex-1 min-w-0"
    >
      {/* Numbered labels — absolutely positioned so they align precisely */}
      <div className="relative w-36 shrink-0">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.number}
            variants={rowVariants}
            className="absolute flex items-center gap-2"
            style={{ top: realOffsets[i] + 2 }}
          >
            <span className="text-[10px] text-black/35 tracking-[0.18em] font-light" style={{ fontFamily: "inherit" }}>
              |{sec.number}|
            </span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-black/45 uppercase">
              {sec.title}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Item lists */}
      <div className="flex flex-col">
        {sections.map((sec, si) => (
          <div key={sec.number} className={si > 0 ? "mt-[34px]" : ""}>
            {sec.items.map((item) => (
              <motion.div
                key={item.label}
                variants={rowVariants}
                className="flex items-baseline gap-1.5 py-[1.5px] group"
              >
                <a
                  href="#"
                  className={[
                    "text-[0.95rem] font-medium tracking-[0.05em] text-black",
                    "relative inline-block",
                    "after:absolute after:bottom-[-1px] after:left-0 after:h-px after:w-0 after:bg-black",
                    "after:transition-[width] after:duration-300 after:ease-out",
                    "hover:after:w-full",
                    "transition-opacity duration-200 hover:opacity-60",
                  ].join(" ")}
                >
                  {item.label}
                </a>
                {item.badge && (
                  <span className="text-[0.48rem] font-bold tracking-[0.18em] text-black/40 uppercase">
                    {item.badge}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Image Panel ──────────────────────────────────────────────────────────────

const IMAGE_BG: Record<Category, string> = {
  WOMAN: "#ece8e1",
  MAN: "#dde1e5",
  BRAND: "#e1e5de",
};

function ImagePanel({ category }: { category: Category }) {
  return (
    <div className="shrink-0 w-[260px] h-[210px] relative overflow-hidden ml-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: IMAGE_BG[category] }}
        >
          <span className="text-[9px] tracking-[0.3em] text-black/20 uppercase font-light">
            {category} — SS25
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── ZaraNavbar ───────────────────────────────────────────────────────────────

export default function ZaraNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("WOMAN");

  return (
    <>
      <Hamburger open={isOpen} onClick={() => setIsOpen((v) => !v)} />

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="zara-nav"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[300] bg-white overflow-y-auto"
            style={{ willChange: "clip-path" }}
          >
            {/* ── Logo ── */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              className="pt-[22px] pb-4 pl-[13%] pr-10"
            >
              <span
                className="text-[3.5rem] font-black leading-none tracking-[-0.015em] select-none"
                style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
              >
                ZARA
              </span>
            </motion.div>

            {/* ── Divider ── */}
            <motion.div
              variants={dividerVariants}
              initial="hidden"
              animate="visible"
              className="h-px bg-black/10 mx-[13%] mb-10"
            />

            {/* ── Main grid ── */}
            <div className="flex pl-[13%] pr-10 gap-16 pb-20 min-h-[460px] items-start">
              {/* Col 1 – categories */}
              <CategoryList active={activeCategory} onSelect={setActiveCategory} />

              {/* Col 2+3 – animated content */}
              <div className="flex gap-14 flex-1 min-w-0 min-h-[380px]">
                <AnimatePresence mode="wait">
                  <SectionContent
                    key={activeCategory}
                    sections={NAV_DATA[activeCategory]}
                  />
                </AnimatePresence>
              </div>

              {/* Col 4 – image */}
              <ImagePanel category={activeCategory} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}