"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LINES = [
  "Jewellery is not",
  "just an ornament —",
  "it is a reflection",
  "of the soul",
  "that wears it",
];

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80",
    style: { top: "10%", left: "4%", maxWidth: "26vw" } as const,
    opacity: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    style: { top: "30%", right: "5%", maxWidth: "24vw" } as const,
    opacity: 0.75,
  },
  {
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    style: { top: "55%", left: "10%", maxWidth: "28vw" } as const,
    opacity: 0.75,
  },
  {
    src: "https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=600&q=80",
    style: { top: "70%", right: "8%", maxWidth: "26vw" } as const,
    opacity: 1,
  },
];

export default function TextDrop() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const lines = linesRef.current.filter(Boolean) as HTMLDivElement[];
      const images = imagesRef.current.filter(Boolean) as HTMLDivElement[];

      // Text drop: each line rotates from -120deg to 0
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { rotateX: -120 },
          {
            rotateX: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "bottom bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Images reveal: fade in as corresponding line scrolls
      lines.forEach((line, i) => {
        if (images[i]) {
          const targetOpacity =
            IMAGES[i]?.opacity ?? 1;
          const startOffset =
            window.innerWidth < 1024 ? "-=200" : "-=500";

          gsap.to(images[i], {
            opacity: targetOpacity,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: `bottom bottom${startOffset}`,
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      // Parallax on images
      images.forEach((el) => {
        gsap.to(el, {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "6rem 0 14rem",
        perspective: "2000px",
        background: "#2C1215",
      }}
    >
      {/* Ambient glow — warm red instead of cyan */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "5%",
          zIndex: 0,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,16,46,0.6) 0%, rgba(200,16,46,0.3) 50%, transparent 100%)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "12%",
          zIndex: 0,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,168,83,0.4) 0%, rgba(212,168,83,0.15) 50%, transparent 100%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Images — positioned absolutely behind text */}
      {IMAGES.map((img, i) => (
        <div
          key={i}
          ref={(el) => { imagesRef.current[i] = el; }}
          style={{
            position: "absolute",
            overflow: "hidden",
            opacity: 0.08,
            borderRadius: "0.5rem",
            transition: "opacity 0.5s",
            ...img.style,
          }}
        >
          <img
            src={img.src}
            alt=""
            loading="lazy"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ))}

      {/* Text lines */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {LINES.map((line, i) => (
          <div
            key={i}
            ref={(el) => { linesRef.current[i] = el; }}
            style={{
              display: "block",
              textAlign: "center",
              width: "100%",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 9.5vw, 9rem)",
              lineHeight: 1.3,
              fontWeight: 500,
              whiteSpace: "nowrap",
              color: "white",
              transformOrigin: "50% 0",
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "rotateX(-120deg)",
              mixBlendMode: "difference",
              transformStyle: "preserve-3d",
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Decorative elements matching site style */}
      <div
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 2,
        }}
      >
        <span
          style={{
            width: 24,
            height: 1,
            background: "rgba(200,16,46,0.5)",
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            fontWeight: 600,
          }}
        >
          ✦ Handcrafted Stories ✦
        </span>
        <span
          style={{
            width: 24,
            height: 1,
            background: "rgba(200,16,46,0.5)",
            display: "inline-block",
          }}
        />
      </div>
    </section>
  );
}