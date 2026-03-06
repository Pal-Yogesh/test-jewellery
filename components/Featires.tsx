"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const FILTERS = ["All", "Earrings", "Necklaces", "Rings", "Bangles", "Under ₹3K"];

const PRODUCTS = [
  { id:1, name:"Motiya Jhumka Earrings", designer:"Deepa Sethi", price:14500, oldPrice:null, badge:"New", rating:5, reviews:42, image:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80", imageB:"https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80", swatches:["#c8922a","#c0c0c0","#1a1a1a"] },
  { id:2, name:"Quartz Jadau Necklace", designer:"Raga Studio", price:11600, oldPrice:14500, badge:"Sale", rating:4, reviews:18, image:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80", imageB:"https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80", swatches:["#c8922a","#e8e8e8"] },
  { id:3, name:"Meenakari Bangle Set", designer:"Aradhana Arts", price:8200, oldPrice:null, badge:null, rating:5, reviews:67, image:"https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=600&q=80", imageB:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80", swatches:["#1e6b3a","#c8102e","#1a4080"] },
  { id:4, name:"Kundan Cocktail Ring", designer:"Kavya Silver", price:4800, oldPrice:null, badge:"New", rating:4, reviews:9, image:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80", imageB:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80", swatches:["#c8922a","#c0c0c0"] },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <span key={i} className={`text-[11px] ${i <= rating ? "text-amber-400" : "text-gray-200"}`}>★</span>
    ))}
  </div>
);

const ProductCard = ({ product, index }: { product: typeof PRODUCTS[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const [wished, setWished] = useState(false);
  const [activeSwatch, setActiveSwatch] = useState(0);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.08 }} className="flex flex-col" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative overflow-hidden rounded-sm bg-gray-100 mb-3" style={{ aspectRatio: "3/4" }}>
        <motion.img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" animate={{ scale: hovered ? 1.06 : 1 }} transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }} />
        <motion.img src={product.imageB} alt="" className="absolute inset-0 w-full h-full object-cover" animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.04 : 1 }} transition={{ duration: 0.5 }} />
        {product.badge && <span className={`absolute top-3 left-3 text-[9px] tracking-[.18em] uppercase font-bold px-2.5 py-1 rounded-sm text-white ${product.badge === "Sale" ? "bg-[#C8102E]" : "bg-gray-900"}`}>{product.badge}</span>}
        <motion.button onClick={() => setWished(!wished)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center" animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }} transition={{ duration: 0.25 }}>
          <svg width="14" height="14" fill={wished ? "#C8102E" : "none"} stroke={wished ? "#C8102E" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </motion.button>
        <motion.button className="absolute bottom-0 left-0 right-0 bg-gray-900 text-white text-[10px] tracking-[.2em] uppercase font-bold py-3 hover:bg-[#C8102E] transition-colors" animate={{ y: hovered ? 0 : "100%" }} transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}>Quick Add</motion.button>
      </div>
      <StarRating rating={product.rating} />
      <p className="text-[10px] tracking-[.15em] uppercase text-[#C8102E] mt-1 mb-0.5">{product.designer}</p>
      <h3 className="font-semibold text-gray-900 mb-1.5 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>{product.name}</h3>
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>₹{product.price.toLocaleString()}</span>
        {product.oldPrice && <><span className="text-gray-400 line-through text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>₹{product.oldPrice.toLocaleString()}</span><span className="text-[10px] text-[#C8102E] font-bold">−{Math.round((1-product.price/product.oldPrice)*100)}%</span></>}
      </div>
      <div className="flex gap-1.5 mt-2">{product.swatches.map((c, i) => <button key={i} onClick={() => setActiveSwatch(i)} className="w-3.5 h-3.5 rounded-full border-[1.5px] transition-transform" style={{ background: c, borderColor: activeSwatch === i ? "#9ca3af" : "#e5e7eb", transform: activeSwatch === i ? "scale(1.2)" : "scale(1)" }} />)}</div>
    </motion.div>
  );
};

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <motion.p initial={{ opacity:0, y:10 }} animate={inView ? {opacity:1,y:0} : {}} transition={{duration:.5}} className="text-[11px] tracking-[.25em] uppercase text-[#C8102E] font-semibold flex items-center gap-2 mb-3"><span className="w-6 h-[1.5px] bg-[#C8102E]"/>Handpicked for You<span className="w-6 h-[1.5px] bg-[#C8102E]"/></motion.p>
            <motion.h2 initial={{ opacity:0, y:20 }} animate={inView ? {opacity:1,y:0} : {}} transition={{duration:.65,delay:.08}} className="font-bold text-gray-900" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,4vw,3rem)"}}>New <em className="italic text-[#C8102E]">Arrivals</em></motion.h2>
          </div>
          <a href="/collections/all" className="text-[11px] tracking-[.2em] uppercase font-bold text-gray-400 hover:text-[#C8102E] transition-colors flex items-center gap-2">View All <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
        </div>
        <div className="flex gap-2 flex-wrap mb-10">
          {FILTERS.map(f => <button key={f} onClick={() => setActiveFilter(f)} className="text-[11px] tracking-[.15em] uppercase font-semibold px-4 py-2 rounded-sm border transition-all" style={{ background: activeFilter===f ? "#C8102E" : "#fff", borderColor: activeFilter===f ? "#C8102E" : "#e5e7eb", color: activeFilter===f ? "#fff" : "#6b7280" }}>{f}</button>)}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
          {PRODUCTS.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div className="text-center mt-12">
          <button className="border-[1.5px] border-gray-200 hover:border-[#C8102E] hover:text-[#C8102E] text-gray-600 text-[11px] tracking-[.2em] uppercase font-bold px-10 py-3.5 rounded-sm transition-all">Load More Products</button>
        </div>
      </div>
    </section>
  );
}