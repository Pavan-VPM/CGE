"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SITE } from "@/content/site";

interface HeroProps {
  onQuoteOpen: () => void;
}

const SCROLL_TEXT = "Scroll to see how a log becomes an instrument";

export function Hero({ onQuoteOpen }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const repeatedScrollText = Array(8).fill(`${SCROLL_TEXT} · `).join("");

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        minHeight: "100svh",
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
      aria-label="Hero"
    >
      {/* ── Main Content ──────────────────────────────────── */}
      <motion.div
        className="relative content-width flex flex-col items-center justify-center flex-1 w-full"
        style={{ zIndex: 3, paddingBlock: "clamp(6rem, 12vw, 10rem)", y: prefersReduced ? 0 : y, opacity: prefersReduced ? 1 : opacity }}
      >
        <div style={{ maxWidth: "1000px" }}>
          {/* Headline */}
          <div style={{ overflow: "hidden", padding: "1rem" }}>
            <motion.h1
              className="display-1"
              style={{ color: "var(--mill)", textShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
              initial={prefersReduced ? false : { y: "100%", opacity: 0, scale: 0.95 }}
              animate={loaded ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Grain that carries a note across nine time zones.
            </motion.h1>
          </div>

          {/* Lede */}
          <motion.p
            className="lede mx-auto"
            style={{ color: "var(--blueprint)", marginTop: "2.5rem", maxWidth: "60ch", textShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0, 0, 1] }}
          >
            Guitar parts, hardwood furniture and plywood — manufactured in
            Kodagu, Karnataka, shipped to specification worldwide.
          </motion.p>

          {/* Actions */}
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            style={{ marginTop: "3.5rem" }}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0, 0, 1] }}
          >
            <button
              className="btn glass-panel"
              style={{ color: "var(--mill)", padding: "1rem 2.5rem", borderRadius: "30px", border: "1px solid rgba(255,255,255,0.2)" }}
              onClick={onQuoteOpen}
              id="hero-quote-btn"
            >
              Request a quote
            </button>
            <a 
              href="#trades" 
              className="btn" 
              style={{ color: "var(--mill)", padding: "1rem 2.5rem", textDecoration: "underline", textUnderlineOffset: "4px" }}
              id="hero-explore-btn"
            >
              See what we ship
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Prompt ────────────────────────────────── */}
      <motion.div
        className="absolute bottom-12 inset-x-0 flex justify-center"
        style={{ zIndex: 3 }}
        aria-hidden="true"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <p className="spec" style={{ color: "var(--mill)", opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Scroll to explore
        </p>
      </motion.div>
    </section>
  );
}
