"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PANELS = [
  {
    image: "https://i.pinimg.com/1200x/ce/c1/18/cec1181228673550dfaf56077bea2f85.jpg",
    title: "Bridal Edit",
    sub: "Timeless sets for your forever moment",
  },
  {
    image: "https://i.pinimg.com/736x/f8/df/89/f8df8921172b3c05ce8538bf71ef40ce.jpg",
    title: "Festive Picks",
    sub: "Bold, joyful, unapologetically magnificent",
  },
  {
    image: "https://i.pinimg.com/736x/49/1c/6f/491c6fef18ffb1e117baa2216bfdc293.jpg",
    title: "Everyday Luxe",
    sub: "Subtle pieces that move with you",
  },
  {
    image: "https://i.pinimg.com/1200x/57/93/22/57932288f2c24e6aaa9400fc99b3a120.jpg",
    title: "Gift Sets",
    sub: "Curated boxes for every occasion",
  },
  {
    image: "https://i.pinimg.com/736x/f9/a2/09/f9a209fec3047b168d62ca151292fd8f.jpg",
    title: "Heritage Craft",
    sub: "Centuries of artisan tradition",
  },
];

export default function GiftsBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F5F0EB] min-h-screen">
      {/* Horizontal scroll track */}
      <div ref={trackRef} className="flex h-screen items-stretch will-change-transform">

        {/* First panel — large image with overlaid text (not empty) */}
        <div className="shrink-0 w-screen h-full relative">
          <img
            src="https://i.pinimg.com/1200x/97/20/44/972044bcd12b64b342d532f6a11b6666.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2D1215]/50" />
          <div className="absolute inset-0 flex items-center px-10 sm:px-20">
            <div className="max-w-lg">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4A843] font-semibold mb-4 block">
                ✦ Curated Collections
              </span>
              <h2
                className="text-white font-bold leading-[1.05] mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
              >
                Explore Our World
              </h2>
              <p
                className="text-white/50 leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
              >
                Each collection is a chapter in our story of craft and beauty — keep scrolling to discover.
              </p>
              <div className="flex items-center gap-3 mt-8 text-[#D4A843]/60">
                <div className="w-12 h-px bg-[#D4A843]/40" />
                <svg width="20" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 20 12">
                  <line x1="0" y1="6" x2="16" y2="6" />
                  <polyline points="12,2 16,6 12,10" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Image panels */}
        {PANELS.map((panel, i) => (
          <div
            key={panel.title}
            className="shrink-0 w-[80vw] sm:w-[55vw] lg:w-[40vw] h-full flex items-center px-3"
          >
            <div className="relative w-full h-[78%] rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src={panel.image}
                alt={panel.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1200"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#2D1215]/75 via-[#2D1215]/10 to-transparent" />

              {/* Inner border on hover */}
              <div className="absolute inset-3 rounded-xl border border-white/0 group-hover:border-[#D4A843]/20 transition-all duration-700 pointer-events-none" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="text-[#D4A843] text-[10px] tracking-[0.25em] uppercase font-semibold mb-2 block">
                  0{i + 1}
                </span>
                <h3
                  className="text-white font-bold leading-tight mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}
                >
                  {panel.title}
                </h3>
                <p className="text-white/40 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {panel.sub}
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </div>
        ))}

        {/* End CTA panel */}
        <div className="shrink-0 w-[40vw] h-full flex items-center justify-center">
          <a href="/collections" className="flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 rounded-full border-2 border-[#8B8B3E]/30 group-hover:border-[#8B8B3E] flex items-center justify-center text-[#8B8B3E]/50 group-hover:text-[#8B8B3E] transition-all duration-500">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <span className="text-[11px] tracking-[0.22em] uppercase font-bold text-gray-400 group-hover:text-[#8B8B3E] transition-colors duration-500">
              View All
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
