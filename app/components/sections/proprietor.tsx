"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SITE } from "@/content/site";

interface ProprietorSectionProps {
  onQuoteOpen: () => void;
}

export function ProprietorSection({ onQuoteOpen }: ProprietorSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [100, -30]);
  const taglineY = useTransform(scrollYProgress, [0, 1], [30, -80]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-pad relative"
      style={{ backgroundColor: "transparent" }}
      aria-label="About the proprietor"
    >
      <div className="content-width relative z-10">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(3rem, 8vw, 8rem)",
            alignItems: "center",
          }}
        >
          {/* Portrait / Initials — parallax slower */}
          <motion.div style={{ y: prefersReduced ? 0 : portraitY }}>
            <div
              className="glass-panel"
              style={{
                width: "100%",
                paddingBottom: "120%",
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {/* No portrait available — initials */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(145deg, rgba(10,36,80,0.6), rgba(107,58,42,0.4))",
                }}
              >
                <span
                  className="display-1"
                  style={{
                    color: "var(--mill)",
                    opacity: 0.3,
                    fontSize: "clamp(5rem, 14vw, 14rem)",
                  }}
                  aria-hidden="true"
                >
                  SC
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text — parallax faster */}
          <motion.div style={{ y: prefersReduced ? 0 : textY }}>
            <h2
              className="display-2"
              style={{ color: "var(--mill)", marginBottom: "0.25rem", textShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
            >
              {SITE.proprietor}
            </h2>
            <p
              className="body-text"
              style={{ color: "var(--brass)", marginBottom: "2.5rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              Proprietor
            </p>

            <p
              className="lede"
              style={{ color: "var(--mill)", opacity: 0.9, marginBottom: "2.5rem", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
            >
              I have been working with the timbers of the Western Ghats for
              over two decades. Every order that leaves Kodagu carries my
              signature on the grading report. If the moisture is wrong, you
              call me directly. If the grade is not what you ordered, we fix
              it. That is the only way a proprietorship works.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="body-text no-underline"
                style={{ color: "var(--brass)", letterSpacing: "0.03em" }}
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="body-text no-underline"
                style={{ color: "var(--brass)", letterSpacing: "0.03em" }}
              >
                {SITE.email}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Tagline with separate parallax */}
        <motion.p
          className="display-3"
          style={{
            color: "var(--mill)",
            marginTop: "5rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "2.5rem",
            y: prefersReduced ? 0 : taglineY,
          }}
        >
          People, products, partnerships, worldwide.
        </motion.p>
      </div>
    </section>
  );
}
