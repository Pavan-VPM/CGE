"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { SITE } from "@/content/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TradesSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<SVGPathElement>(null);
  const tradeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !seamRef.current) return;

    const ctx = gsap.context(() => {
      // Draw the SVG seam
      const seamLength = seamRef.current!.getTotalLength();
      gsap.set(seamRef.current, {
        strokeDasharray: seamLength,
        strokeDashoffset: seamLength,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1,
        },
      });

      tl.to(seamRef.current, { strokeDashoffset: 0, duration: 1, ease: "none" });

      // Fade in each trade as seam passes its node
      tradeRefs.current.forEach((trade, i) => {
        tl.fromTo(
          trade,
          { opacity: 0.2 },
          { opacity: 1, duration: 0.3 },
          i * 0.25
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const { scrollYProgress: sectionProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const titleY = useTransform(sectionProgress, [0, 1], [80, -80]);

  return (
    <section
      id="trades"
      ref={sectionRef}
      className="section-pad relative"
      style={{ backgroundColor: "transparent" }}
      aria-label="Three trades"
    >
      <div className="content-width">
        {/* Header */}
        <p className="eyebrow" style={{ marginBottom: "1rem", color: "var(--mill)", opacity: 0.8 }}>
          Trades
        </p>
        <motion.h2
          className="display-2"
          style={{ color: "var(--mill)", marginBottom: "4rem", maxWidth: "20ch", y: titleY }}
        >
          Three products out of one forest
        </motion.h2>

        {/* The seam SVG + trades */}
        <div style={{ position: "relative" }}>
          {/* Seam SVG */}
          <div
            style={{
              position: "relative",
              paddingBlock: "4rem",
            }}
          >
            <svg
              viewBox="0 0 1200 220"
              preserveAspectRatio="none"
              style={{
                width: "100%",
                height: "220px",
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "visible",
              }}
              aria-hidden="true"
            >
              {/* The seam line */}
              <path
                ref={seamRef}
                d="M 0 110 L 1200 110"
                stroke="var(--rosewood)"
                strokeWidth="1"
                fill="none"
              />
              {/* Nodes */}
              {[200, 600, 1000].map((x, i) => (
                <rect
                  key={i}
                  x={x - 4}
                  y={110 - 4}
                  width="8"
                  height="8"
                  fill="var(--brass)"
                />
              ))}
            </svg>

            {/* Trade items — alternating above/below */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "2rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              {SITE.trades.map((trade, i) => {
                const isAbove = i !== 1;
                return (
                  <div
                    key={trade.id}
                    ref={(el) => { tradeRefs.current[i] = el; }}
                    style={{
                      paddingTop: isAbove ? 0 : "120px",
                      paddingBottom: isAbove ? "120px" : 0,
                      opacity: prefersReduced ? 1 : 0.2,
                    }}
                    className="group cursor-default"
                  >
                    {/* Two-part heading */}
                    <h3 className="display-4" style={{ marginBottom: "0.5rem" }}>
                      <span style={{ color: "var(--rosewood)" }}>
                        {trade.heading[0]}
                      </span>{" "}
                      <span style={{ color: "var(--ink)" }}>
                        {trade.heading[1]}
                      </span>
                    </h3>

                    <p
                      className="body-text"
                      style={{ color: "var(--ink)", opacity: 0.8, marginBottom: "1rem" }}
                    >
                      {trade.description}
                    </p>

                    {/* Spec heading */}
                    {trade.spec ? (
                      <p
                        className="spec"
                        style={{ color: "var(--rosewood)", fontSize: "0.875rem" }}
                      >
                        {trade.spec}
                      </p>
                    ) : (
                      <span className="spec-chip spec-chip-pending">
                        spec pending
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile fallback: vertical stack */}
        <style>{`
          @media (max-width: 768px) {
            #trades .trades-grid {
              grid-template-columns: 1fr !important;
            }
            #trades .trade-item {
              padding-top: 2rem !important;
              padding-bottom: 0 !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
