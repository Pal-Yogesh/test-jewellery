"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  Controller,
  Navigation,
  Autoplay,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "./sponsored.css";

// ─── Slide data ────────────────────────────────────────────────────────────
const SLIDES = [
  {
    title: "Kundan",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80",
  },
  {
    title: "Jadau",
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&q=80",
  },
  {
    title: "Meenakari",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&q=80",
  },
  {
    title: "Filigree",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
  },
  {
    title: "Temple",
    image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&q=80",
  },
  {
    title: "Polki",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&q=80",
  },
];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

const ArrowSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 29.541 22.323">
    <g transform="translate(0 1.014)">
      <path
        d="M115.445,20.633l9.311-10.148L115.445.338"
        transform="translate(-97.25 -0.338)"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={3}
      />
      <line
        x1="27.506"
        transform="translate(0 10.148)"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={3}
      />
    </g>
  </svg>
);

export default function SponsoredProduct() {
  const [bgSwiper, setBgSwiper] = useState<SwiperType | null>(null);
  const [titlesSwiper, setTitlesSwiper] = useState<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Sync all three swipers via Controller once they're all mounted
  useEffect(() => {
    if (!bgSwiper || !titlesSwiper || !thumbsSwiper) return;
    // titles drives bg + thumbs
    titlesSwiper.controller.control = [bgSwiper, thumbsSwiper];
    // bg and thumbs don't drive anything back (one-way sync)
  }, [bgSwiper, titlesSwiper, thumbsSwiper]);

  return (
    <section className="sponsored-slider">
      {/* Heading */}
      <div className="sponsored-heading">
        <span className="sponsored-heading__eyebrow">
          <span className="sponsored-heading__line" />
          Sponsored
          <span className="sponsored-heading__line" />
        </span>
        <h2 className="sponsored-heading__title">
          Curated <em>Collections</em>
        </h2>
        <p className="sponsored-heading__sub">
          Handpicked jewellery styles from India&apos;s finest artisan houses
        </p>
      </div>

      {/* ── Background Slider ── */}
      <div className="sponsored-bg">
        <Swiper
          modules={[EffectFade, Controller]}
          effect="fade"
          slidesPerView={1}
          speed={600}
          allowTouchMove={false}
          onSwiper={setBgSwiper}
        >
          {SLIDES.map((s, i) => (
            <SwiperSlide key={`bg-${i}`}>
              <img src={s.image} alt={s.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Titles Slider (main driver) ── */}
      <div className="sponsored-titles">
        <Swiper
          modules={[Controller, Navigation, Autoplay]}
          slidesPerView="auto"
          speed={600}
          slideToClickedSlide
          centeredSlides
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          onSwiper={setTitlesSwiper}
          onSlideChange={(s) => setCurrentSlide(s.realIndex + 1)}
        >
          {SLIDES.map((s, i) => (
            <SwiperSlide key={`title-${i}`}>
              <p className="slider-title">{s.title}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="sponsored-bottom">
        <div className="sponsored-nav">
          <button ref={prevRef} className="sponsored-btn is-prev" aria-label="Previous slide">
            <ArrowSvg />
          </button>
          <button ref={nextRef} className="sponsored-btn" aria-label="Next slide">
            <ArrowSvg />
          </button>
        </div>

        <p className="sponsored-counter">
          <span className="current">{pad(currentSlide)}</span> — {pad(SLIDES.length)}
        </p>

        <div className="sponsored-thumbs-wrap">
          <div className="sponsored-thumbs-overflow">
            <div>
              <div className="sponsored-thumbs-inner">
                <Swiper
                  modules={[Controller]}
                  slidesPerView={1}
                  speed={600}
                  slideToClickedSlide
                  onSwiper={setThumbsSwiper}
                >
                  {SLIDES.map((s, i) => (
                    <SwiperSlide key={`thumb-${i}`}>
                      <div className="sponsored-thumb">
                        <img src={s.thumb} alt={s.title} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
