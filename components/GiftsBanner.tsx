"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

const IMAGES = [
  "https://i.pinimg.com/1200x/ce/c1/18/cec1181228673550dfaf56077bea2f85.jpg",
  "https://i.pinimg.com/736x/f8/df/89/f8df8921172b3c05ce8538bf71ef40ce.jpg",
  "https://i.pinimg.com/736x/49/1c/6f/491c6fef18ffb1e117baa2216bfdc293.jpg",
  "https://i.pinimg.com/1200x/57/93/22/57932288f2c24e6aaa9400fc99b3a120.jpg",
  "https://i.pinimg.com/736x/f9/a2/09/f9a209fec3047b168d62ca151292fd8f.jpg",
  "https://i.pinimg.com/736x/70/1a/9a/701a9abbb87a021731bee406c574099a.jpg",
];

export default function GiftsBanner() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="relative w-full py-10 px-4 sm:px-6 lg:px-16">
      {/* Prev button */}
      <button
        ref={prevRef}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-[#C8102E] hover:text-[#C8102E] flex items-center justify-center text-gray-600 transition-all shadow-sm"
        aria-label="Previous"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Next button */}
      <button
        ref={nextRef}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-[#C8102E] hover:text-[#C8102E] flex items-center justify-center text-gray-600 transition-all shadow-sm"
        aria-label="Next"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div>
        <p
          className="text-gray-900 font-bold leading-tight pb-10"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
          }}
        >
          Sposored Jewels
        </p>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1.2}
        spaceBetween={12}
        centeredSlides={false}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper: SwiperType) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        className="w-full"
      >
        {IMAGES.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative overflow-hidden rounded-xl aspect-4/5 bg-[#f5f3f0]">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
