"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCreative } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-creative";

const SLIDES = [
  "https://i.pinimg.com/1200x/97/20/44/972044bcd12b64b342d532f6a11b6666.jpg",
  "https://i.pinimg.com/736x/e9/d6/b0/e9d6b0103854e095997bd8a7b6d776fa.jpg",
  "https://i.pinimg.com/736x/dc/41/6f/dc416f68be573e0c41e6ba2411c13280.jpg",
  "https://i.pinimg.com/1200x/65/25/eb/6525ebd1351659aa94b618162251c257.jpg",
  "https://i.pinimg.com/1200x/c0/33/17/c0331726c851e1f48385441204108e17.jpg",
];

export default function Hero() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, EffectCreative]}
        effect="creative"
        creativeEffect={{
          prev: { translate: ["-100%", 0, 0] },
          next: { translate: ["100%", 0, 0] },
        }}
        speed={800}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper: SwiperType) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="w-full h-full"
      >
        {SLIDES.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* BRAND logo — responsive with Tailwind, clipped inside hero */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-none select-none">
        <span
          className="block text-white font-normal leading-none tracking-tight drop-shadow-[0_2px_40px_rgba(0,0,0,0.18)] text-[5rem] sm:text-[10rem] md:text-[13rem] lg:text-[16rem]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          BRAND
        </span>
      </div>

      {/* Arrow buttons */}
      <button
        ref={prevRef}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#C8102E] hover:bg-[#a00d24] flex items-center justify-center transition-colors duration-200 shadow-lg"
        aria-label="Previous"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        ref={nextRef}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#C8102E] hover:bg-[#a00d24] flex items-center justify-center transition-colors duration-200 shadow-lg"
        aria-label="Next"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className="block rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? 24 : 6,
              height: 4,
              background: i === activeIndex ? "#fff" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
