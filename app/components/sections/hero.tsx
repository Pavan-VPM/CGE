"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/content/site";

interface HeroProps {
  onQuoteOpen: () => void;
}

const SCROLL_TEXT = "Scroll to see how a log becomes an instrument";

export function Hero({ onQuoteOpen }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const repeatedScrollText = Array(8).fill(`${SCROLL_TEXT} · `).join("");

  return (
    <section
      id="hero"
      className="relative flex flex-col"
      style={{
        minHeight: "100svh",
        backgroundColor: "var(--ink)",
        overflow: "hidden",
      }}
      aria-label="Hero"
    >
      {/* ── Layer 1: Video Background ──────────────────────── */}
      {!prefersReduced && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "saturate(0.4) brightness(0.5) hue-rotate(200deg)",
            zIndex: 0,
          }}
          autoPlay
          muted
          loop
          playsInline
          poster="/video/workshop-poster.jpg"
          preload="metadata"
        >
          <source src="/video/workshop.webm" type="video/webm" />
          <source src="/video/workshop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Fallback poster for reduced-motion */}
      {prefersReduced && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/video/workshop-poster.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(0.3) brightness(0.5)",
            zIndex: 0,
          }}
        />
      )}

      {/* ── Layer 2: Gradient Scrim ────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,36,80,0.92) 0%, rgba(10,36,80,0.7) 55%, rgba(10,36,80,0.3) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Layer 3: Instrument Cutout ────────────────────── */}
      <motion.div
        className="absolute right-0 top-0 h-full pointer-events-none"
        style={{
          width: "clamp(280px, 42vw, 680px)",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        initial={prefersReduced ? false : { x: 40, opacity: 0 }}
        animate={loaded ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0, 0, 1] }}
      >
        {/* Inline fretboard SVG cutout — stylised, no drop shadow */}
        <svg
          viewBox="0 0 220 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "90vh",
            opacity: 0.92,
          }}
          aria-hidden="true"
        >
          {/* Neck body */}
          <rect x="72" y="20" width="76" height="560" rx="8" fill="#6b3a2a" />
          {/* Headstock */}
          <rect x="58" y="4" width="104" height="80" rx="10" fill="#5a2f22" />
          {/* Tuning pegs */}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${58 - 18}, ${20 + i * 24})`}>
              <circle cx="0" cy="0" r="7" fill="#c9a227" />
              <circle cx="0" cy="0" r="4" fill="#0a2450" />
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${162 + 18}, ${20 + i * 24})`}>
              <circle cx="0" cy="0" r="7" fill="#c9a227" />
              <circle cx="0" cy="0" r="4" fill="#0a2450" />
            </g>
          ))}
          {/* Nut */}
          <rect x="68" y="82" width="84" height="8" rx="2" fill="#c9a227" />
          {/* Frets */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((i) => (
            <rect
              key={i}
              x="70"
              y={100 + i * 26}
              width="80"
              height="3"
              rx="1"
              fill="#c9a22790"
            />
          ))}
          {/* Strings */}
          {[86, 96, 106, 114, 124, 134].map((x) => (
            <line
              key={x}
              x1={x}
              y1="88"
              x2={x}
              y2="580"
              stroke="#e8f0fb"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />
          ))}
          {/* Fret markers */}
          {[5, 7, 9, 12].map((fret) => (
            <circle
              key={fret}
              cx="110"
              cy={88 + fret * 26 + 13}
              r="4"
              fill="#c9a22770"
            />
          ))}
          {/* Bridge */}
          <rect x="68" y="576" width="84" height="20" rx="4" fill="#c9a227" />
          {/* Body silhouette */}
          <ellipse cx="110" cy="630" rx="68" ry="54" fill="#5a2f22" opacity="0.9" />
          <ellipse cx="110" cy="630" rx="54" ry="44" fill="#6b3a2a" opacity="0.6" />
          {/* Rosette */}
          <circle cx="110" cy="630" r="18" fill="none" stroke="#c9a227" strokeWidth="1.5" />
          <circle cx="110" cy="630" r="10" fill="#0a2450" opacity="0.5" />
        </svg>
      </motion.div>

      {/* ── Main Content ──────────────────────────────────── */}
      <div
        className="relative content-width flex flex-col justify-center flex-1"
        style={{ zIndex: 3, paddingBlock: "clamp(6rem, 12vw, 10rem)" }}
      >
        <div style={{ maxWidth: "min(640px, 55vw)", minWidth: 280 }}>
          {/* Headline */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              className="display-1"
              style={{ color: "var(--mill)" }}
              initial={prefersReduced ? false : { y: "100%" }}
              animate={loaded ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0, 0, 1] }}
            >
              Grain that carries a note across nine time zones.
            </motion.h1>
          </div>

          {/* Lede */}
          <motion.p
            className="lede"
            style={{ color: "var(--blueprint)", marginTop: "1.5rem" }}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0, 0, 1] }}
          >
            Guitar parts, hardwood furniture and plywood — manufactured in
            Kodagu, Karnataka, shipped to specification worldwide.
          </motion.p>

          {/* Actions */}
          <motion.div
            className="flex flex-wrap gap-4"
            style={{ marginTop: "2rem" }}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0, 0, 1] }}
          >
            <button
              className="btn btn-primary"
              onClick={onQuoteOpen}
              id="hero-quote-btn"
            >
              Request a quote
            </button>
            <a href="#trades" className="btn btn-ghost" id="hero-explore-btn">
              See what we ship
            </a>
          </motion.div>

          {/* Proof strip — destination ports */}
          {SITE.originPorts.length > 0 && (
            <motion.p
              className="spec"
              style={{
                color: "var(--blueprint)",
                opacity: 0.7,
                marginTop: "2rem",
                fontSize: "0.75rem",
              }}
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={loaded ? { opacity: 0.7 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              Shipping from Kodagu via{" "}
              {SITE.originPorts.join(" · ")}
              {SITE.destinationPorts.length > 0 && (
                <>
                  {" "}
                  to{" "}
                  {SITE.destinationPorts.map((p) => p.name).join(" · ")}
                </>
              )}
            </motion.p>
          )}
        </div>
      </div>

      {/* ── Scroll Marquee ────────────────────────────────── */}
      <div
        className="absolute bottom-8 inset-x-0 overflow-hidden"
        style={{ zIndex: 3 }}
        aria-hidden="true"
      >
        {prefersReduced ? (
          <p
            className="spec text-center"
            style={{ color: "var(--blueprint)", fontSize: "0.75rem" }}
          >
            {SCROLL_TEXT}
          </p>
        ) : (
          <div style={{ display: "flex" }}>
            <div
              className="marquee-track"
              style={{ animationDuration: "32s" }}
            >
              <span
                className="spec"
                style={{
                  color: "var(--blueprint)",
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                  paddingRight: "2rem",
                }}
              >
                {repeatedScrollText}
              </span>
              <span
                className="spec"
                style={{
                  color: "var(--blueprint)",
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                  paddingRight: "2rem",
                }}
              >
                {repeatedScrollText}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
