"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ── Design Tokens ────────────────────────────────────────────────────────────
const AMBER = "#C9A05C";
const TEXT_HI = "#F2F4F7";
const TEXT_MID = "rgba(242, 244, 247, 0.65)";
const TEXT_MUTED = "rgba(242, 244, 247, 0.35)";
const MONO = "var(--font-ibm-plex-mono, monospace)";
const SERIF = "var(--font-newsreader, Georgia, serif)";
const SANS = "var(--font-archivo, system-ui, sans-serif)";

const INTERVAL_MS = 4000;

const STAGES = [
  {
    step: "01",
    label: "THE LOG",
    headline: "One log.",
    narrative: "Harvested at equilibrium maturity in the Kodagu reserve. A single intact cylinder of heartwood and acoustic sapwood.",
    image: "/images/yield/log.jpg",
    alt: "Cross section of raw Indian rosewood log showing natural growth rings and bark",
    spec: "840 mm Diameter · 84.6% Heartwood",
  },
  {
    step: "02",
    label: "QUARTERSAWN",
    headline: "Quartersawn four ways.",
    narrative: "Radial saw lines cut strictly perpendicular to the annual growth rings. This releases internal tension so the grain never cups or warps in transit.",
    image: "/images/yield/billets.jpg",
    alt: "Log cut into four clean quartersawn radial billets",
    spec: "90° Radial Cut · 0.0° Grain Runout",
  },
  {
    step: "03",
    label: "THE YIELD",
    headline: "Nothing left over.",
    narrative: "Offcuts from furniture slabs become acoustic guitar fretboards. Narrow trims become bridge blanks. The recovery is calculated across both trades before the blade touches bark.",
    image: "/images/yield/goods.jpg",
    alt: "Finished rosewood guitar fretboards, acoustic bridge plate, and thin veneer sheets",
    spec: "94.2% Recovery · Zero Core Waste",
  },
];

export function YieldSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll through stages every 4 seconds unless paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STAGES.length);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPaused, activeStage]);

  const cur = STAGES[activeStage];

  return (
    <section
      id="yield"
      aria-label="Yield and log recovery"
      className="relative overflow-hidden w-full flex flex-col items-center justify-center text-center"
      style={{
        backgroundColor: "#060910",
        paddingTop: "clamp(5rem, 9vw, 8rem)",
        paddingBottom: "clamp(5rem, 9vw, 8rem)",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Minimal Editorial Masthead */}
        <div className="mb-10">
          <p
            style={{
              fontFamily: MONO,
              fontSize: "0.65rem",
              letterSpacing: "0.24em",
              color: AMBER,
              textTransform: "uppercase",
              marginBottom: "0.85rem",
            }}
          >
            03 // LOG CONVERSION
          </p>

          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              fontWeight: 500,
              lineHeight: 1.15,
              color: TEXT_HI,
              letterSpacing: "-0.015em",
            }}
          >
            From tree to specification.
          </h2>
        </div>

        {/* ── Centerpiece Specimen Viewer (4:3 Aspect Ratio) ─────────── */}
        <div
          className="relative w-full max-w-lg aspect-[4/3] my-2 rounded overflow-hidden shadow-2xl"
          style={{
            border: "1px solid rgba(201, 160, 92, 0.22)",
            backgroundColor: "#03060A",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.step}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={cur.image}
                alt={cur.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover"
              />

              {/* Specimen Badge Overlay */}
              <div
                className="absolute bottom-3 right-3 px-2.5 py-1 rounded select-none"
                style={{
                  fontFamily: MONO,
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  color: AMBER,
                  background: "rgba(6, 9, 16, 0.85)",
                  border: "1px solid rgba(201, 160, 92, 0.3)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {cur.spec}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Segmented Auto-Scroll Progress Stepper ─────────────────── */}
        <div className="w-full max-w-lg mt-8 mb-8 select-none">
          <div className="grid grid-cols-3 gap-3">
            {STAGES.map((s, idx) => {
              const isCurrent = activeStage === idx;
              const isPast = activeStage > idx;

              return (
                <button
                  key={s.step}
                  onClick={() => {
                    setActiveStage(idx);
                    setIsPaused(true);
                  }}
                  className="cursor-pointer text-left outline-none group"
                >
                  {/* Step Label */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: "0.62rem",
                        letterSpacing: "0.12em",
                        color: isCurrent ? AMBER : TEXT_MUTED,
                        fontWeight: isCurrent ? 600 : 400,
                        transition: "color 0.2s",
                      }}
                    >
                      {s.step} {s.label}
                    </span>
                  </div>

                  {/* Progress Bar Line */}
                  <div
                    className="w-full h-[2px] rounded-full overflow-hidden relative"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
                  >
                    {isCurrent && (
                      <motion.div
                        key={`prog-${idx}-${isPaused}`}
                        className="h-full"
                        style={{ backgroundColor: AMBER }}
                        initial={{ width: "0%" }}
                        animate={{ width: isPaused ? "100%" : "100%" }}
                        transition={{
                          duration: isPaused ? 0.2 : INTERVAL_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                    {isPast && (
                      <div className="h-full w-full" style={{ backgroundColor: AMBER }} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Headline & Narrative (Synced with Active Stage) ────────── */}
        <div className="max-w-lg min-h-[6.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(1.75rem, 2.8vw, 2.3rem)",
                  fontWeight: 500,
                  color: TEXT_HI,
                  marginBottom: "0.6rem",
                }}
              >
                {cur.headline}
              </h3>

              <p
                style={{
                  fontFamily: SANS,
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: TEXT_MID,
                }}
              >
                {cur.narrative}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Centered Footnote */}
        <div
          className="w-full max-w-lg mt-8 pt-5 border-t flex items-center justify-between text-[0.62rem]"
          style={{
            borderColor: "rgba(255, 255, 255, 0.08)",
            fontFamily: MONO,
            color: TEXT_MUTED,
          }}
        >
          <span>KODAGU MILL RECOVERY</span>
          <span style={{ color: AMBER }}>
            {isPaused ? "PAUSED (HOVERING)" : "AUTO-CONVERTING"}
          </span>
        </div>

      </div>
    </section>
  );
}
