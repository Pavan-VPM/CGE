"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StickyRibbonProps {
  onQuoteOpen: () => void;
  show: boolean;
}

const MESSAGE = "Sampling a new supplier? Ask for a sample crate.";

export function StickyRibbon({ onQuoteOpen, show }: StickyRibbonProps) {
  const [dismissed, setDismissed] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("cge-ribbon-dismissed")) {
      setDismissed(true);
    }
    setPrefersReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  function dismiss(e: React.MouseEvent) {
    e.stopPropagation();
    setDismissed(true);
    sessionStorage.setItem("cge-ribbon-dismissed", "1");
  }

  if (dismissed || !show) return null;

  const repeatedText = Array(8).fill(`${MESSAGE} · `).join("");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
        className="fixed bottom-0 inset-x-0 z-40 cursor-pointer"
        style={{
          backgroundColor: "var(--brass)",
          height: "36px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
        onClick={onQuoteOpen}
        role="button"
        tabIndex={0}
        aria-label="Ask for a sample crate — opens quote form"
        onKeyDown={(e) => e.key === "Enter" && onQuoteOpen()}
      >
        {/* Scrolling text */}
        {prefersReduced ? (
          <p
            className="spec"
            style={{
              color: "var(--ink)",
              width: "100%",
              textAlign: "center",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {MESSAGE}
          </p>
        ) : (
          <div style={{ display: "flex", overflow: "hidden", width: "100%" }}>
            <div className="marquee-track" style={{ animationDuration: "28s" }}>
              {/* Duplicate for seamless loop */}
              <span
                className="spec"
                style={{
                  color: "var(--ink)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  paddingRight: "2rem",
                }}
              >
                {repeatedText}
              </span>
              <span
                className="spec"
                style={{
                  color: "var(--ink)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  paddingRight: "2rem",
                }}
              >
                {repeatedText}
              </span>
            </div>
          </div>
        )}

        {/* Dismiss button */}
        <button
          onClick={dismiss}
          aria-label="Dismiss ribbon"
          className="absolute right-3 flex items-center justify-center"
          style={{
            width: 28,
            height: 28,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--ink)",
            opacity: 0.6,
            fontSize: "1rem",
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
