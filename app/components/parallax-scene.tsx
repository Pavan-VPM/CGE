"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Floating SVG particle — purely decorative */
function Particle({
  x, y, size, delay, speed,
}: { x: string; y: string; size: number; delay: number; speed: number }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(201, 162, 39, 0.15)", // --brass at 15%
        pointerEvents: "none",
        zIndex: 0,
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: speed,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const PARTICLES = [
  { x: "8%", y: "15%", size: 6, delay: 0, speed: 8 },
  { x: "22%", y: "72%", size: 4, delay: 1.5, speed: 11 },
  { x: "55%", y: "10%", size: 8, delay: 0.8, speed: 7 },
  { x: "75%", y: "60%", size: 5, delay: 2.2, speed: 9 },
  { x: "88%", y: "25%", size: 7, delay: 0.3, speed: 12 },
  { x: "35%", y: "88%", size: 3, delay: 3, speed: 6 },
  { x: "65%", y: "82%", size: 9, delay: 1, speed: 10 },
  { x: "12%", y: "45%", size: 4, delay: 2, speed: 8 },
];

/** Paralax layers for the woodgrain SVG rings that drift at different speeds */
function ParallaxRing({ scrollYProgress, speed, style }: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  speed: number;
  style?: React.CSSProperties;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        borderRadius: "50%",
        border: "1px solid rgba(201, 162, 39, 0.07)",
        pointerEvents: "none",
        ...style,
        y,
      }}
    />
  );
}

export function ParallaxScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Multi-speed parallax ring layers */}
      <ParallaxRing scrollYProgress={scrollYProgress} speed={-120} style={{ width: "60vw", height: "60vw", top: "-10vw", left: "-10vw", maxWidth: 900, maxHeight: 900 }} />
      <ParallaxRing scrollYProgress={scrollYProgress} speed={-60} style={{ width: "80vw", height: "80vw", top: "-15vw", left: "-15vw", maxWidth: 1200, maxHeight: 1200 }} />
      <ParallaxRing scrollYProgress={scrollYProgress} speed={200} style={{ width: "50vw", height: "50vw", bottom: "-5vw", right: "-5vw", maxWidth: 800, maxHeight: 800 }} />
      <ParallaxRing scrollYProgress={scrollYProgress} speed={100} style={{ width: "90vw", height: "90vw", bottom: "5vw", right: "-20vw", maxWidth: 1400, maxHeight: 1400 }} />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </div>
  );
}
