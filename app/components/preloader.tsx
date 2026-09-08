"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"loading" | "splitting" | "done">("loading");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    // Skip if already visited this session
    if (sessionStorage.getItem("cge-preloaded")) {
      onComplete();
      return;
    }

    // Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      sessionStorage.setItem("cge-preloaded", "1");
      onComplete();
      return;
    }

    const HARD_CEILING = 2500;

    // Tick the counter
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const progress = Math.min((elapsed / HARD_CEILING) * 100, 100);
      setCount(Math.floor(progress));

      if (progress >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCount(100);
        setPhase("splitting");
        setTimeout(() => {
          setPhase("done");
          sessionStorage.setItem("cge-preloaded", "1");
          setTimeout(onComplete, 100);
        }, 500);
      }
    }, 30);

    // Hard ceiling
    const ceiling = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCount(100);
      setPhase("splitting");
      setTimeout(() => {
        setPhase("done");
        sessionStorage.setItem("cge-preloaded", "1");
        setTimeout(onComplete, 100);
      }, 500);
    }, HARD_CEILING);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(ceiling);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--ink)" }}
        aria-label="Loading"
        role="status"
      >
        {/* Top panel */}
        <motion.div
          className="absolute inset-x-0 top-0 origin-top"
          style={{ backgroundColor: "var(--ink)", height: "50%" }}
          animate={phase === "splitting" ? { scaleY: 0 } : { scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Bottom panel */}
        <motion.div
          className="absolute inset-x-0 bottom-0 origin-bottom"
          style={{ backgroundColor: "var(--ink)", height: "50%" }}
          animate={phase === "splitting" ? { scaleY: 0 } : { scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-8"
          animate={phase === "splitting" ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Globe mark SVG */}
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            aria-hidden="true"
          >
            <motion.circle
              cx="36"
              cy="36"
              r="32"
              stroke="#e8f0fb"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="201"
              strokeDashoffset="201"
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            {/* Latitude lines */}
            <motion.ellipse
              cx="36"
              cy="36"
              rx="20"
              ry="32"
              stroke="#e8f0fb"
              strokeWidth="1"
              fill="none"
              strokeDasharray="160"
              strokeDashoffset="160"
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            />
            <motion.ellipse
              cx="36"
              cy="36"
              rx="32"
              ry="14"
              stroke="#e8f0fb"
              strokeWidth="1"
              fill="none"
              strokeDasharray="160"
              strokeDashoffset="160"
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            />
            {/* Meridian */}
            <motion.line
              x1="36"
              y1="4"
              x2="36"
              y2="68"
              stroke="#e8f0fb"
              strokeWidth="1"
              strokeDasharray="64"
              strokeDashoffset="64"
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
            />
            <motion.line
              x1="4"
              y1="36"
              x2="68"
              y2="36"
              stroke="#e8f0fb"
              strokeWidth="1"
              strokeDasharray="64"
              strokeDashoffset="64"
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            />
          </svg>

          {/* Counter */}
          <div
            className="spec tabular-nums text-5xl"
            style={{
              color: "var(--blueprint)",
              fontFamily: "var(--font-family-archivo)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.04em",
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            {String(count).padStart(2, "0")}
            <span style={{ opacity: 0.5, fontSize: "0.55em" }}>%</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
