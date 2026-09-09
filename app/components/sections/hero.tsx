"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ParallaxScene } from "../parallax-scene";

interface HeroProps { onQuoteOpen: () => void; }

export function Hero({ onQuoteOpen }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Act 1: 0 - 0.33
  const firstOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.33], [0, 1, 1, 0]);
  const firstScale = useTransform(scrollYProgress, [0, 0.33], [0.95, 1.05]);
  const firstPointerEvents = useTransform(firstOpacity, v => v > 0 ? "auto" : "none");

  // Act 2: 0.33 - 0.66
  const secondOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.66], [0, 1, 1, 0]);
  const secondScale = useTransform(scrollYProgress, [0.33, 0.66], [0.95, 1.05]);
  const secondPointerEvents = useTransform(secondOpacity, v => v > 0 ? "auto" : "none");

  // Act 3: 0.66 - 1.0
  const thirdOpacity = useTransform(scrollYProgress, [0.68, 0.8, 0.9, 1], [0, 1, 1, 0]);
  const thirdScale = useTransform(scrollYProgress, [0.66, 1], [0.95, 1]);
  const thirdPointerEvents = useTransform(thirdOpacity, v => v > 0 ? "auto" : "none");

  return (
    <section ref={containerRef} id="hero" className="cinematic-hero" aria-label="Our story begins">
      <div className="cinematic-hero__sticky">
        {/* Subtle, slow moving background elements */}
        <ParallaxScene />

        {/* Act I */}
        <motion.div 
          className="cinematic-hero__act" 
          style={{ 
            opacity: reducedMotion ? 1 : firstOpacity,
            scale: reducedMotion ? 1 : firstScale,
            pointerEvents: reducedMotion ? "auto" : firstPointerEvents
          }}
        >
          <p className="cinematic-hero__kicker">Before an object, there is a choice.</p>
          <h1>We begin<br />with <em>attention.</em></h1>
          <p className="cinematic-hero__body">A log is not raw material. It is a record of climate, patience and possibility.</p>
        </motion.div>

        {/* Act II */}
        <motion.div 
          className="cinematic-hero__act" 
          style={{ 
            opacity: reducedMotion ? 0 : secondOpacity,
            scale: reducedMotion ? 1 : secondScale,
            pointerEvents: reducedMotion ? "none" : secondPointerEvents
          }}
        >
          <p className="cinematic-hero__kicker">The middle is where quality lives.</p>
          <h2>Cut. Season.<br /><em>Listen.</em></h2>
          <p className="cinematic-hero__body">Every surface is prepared for the hands, rooms and instruments it will eventually meet.</p>
        </motion.div>

        {/* Act III */}
        <motion.div 
          className="cinematic-hero__act" 
          style={{ 
            opacity: reducedMotion ? 0 : thirdOpacity,
            scale: reducedMotion ? 1 : thirdScale,
            pointerEvents: reducedMotion ? "none" : thirdPointerEvents
          }}
        >
          <p className="cinematic-hero__kicker">Then it leaves us.</p>
          <h2>Made here.<br /><em>Felt everywhere.</em></h2>
          <button className="cinematic-hero__cta" onClick={onQuoteOpen}>Begin a specification</button>
        </motion.div>
      </div>
    </section>
  );
}
