"use client";

import { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

// ── Design Tokens ────────────────────────────────────────────────────────────
const AMBER = "#C9A05C";
const TEXT_HI = "#F2F4F7";
const TEXT_MID = "rgba(242, 244, 247, 0.62)";
const TEXT_MUTED = "rgba(242, 244, 247, 0.35)";
const LINE = "rgba(242, 244, 247, 0.08)";
const LINE_ACTIVE = "rgba(201, 160, 92, 0.45)";
const MONO = "var(--font-ibm-plex-mono, monospace)";
const SERIF = "var(--font-newsreader, Georgia, serif)";
const SANS = "var(--font-archivo, system-ui, sans-serif)";

// ── The Three Trades ─────────────────────────────────────────────────────────
const TRADES = [
  {
    num: "01",
    tag: "LUTHIER",
    name: "Guitar Components",
    products: "Fretboard & Bridge Blanks",
    tolerance: "± 0.1 mm",
    species: "Indian Rosewood · Ebony",
    summary:
      "Quartersawn radius-cut blanks with zero grain runout. Tuned to sustain acoustic string tension across decades without warping.",
    parts: ["Fretboard blanks", "Bridge plates", "Neck blanks", "Bracing strips"],
  },
  {
    num: "02",
    tag: "STRUCTURAL",
    name: "Hardwood Furniture",
    products: "Carcass & Frame Timber",
    tolerance: "≤ 12 % EMC",
    species: "Teak · Silver Oak · Jackwood",
    summary:
      "Kiln-seasoned structural heartwood prepared for master joinery. S4S dimensioned or prime flitch timber with full harvest provenance.",
    parts: ["Structural beams", "Panel stock", "Turned legs", "Tabletop slabs"],
  },
  {
    num: "03",
    tag: "COMPOSITE",
    name: "Plywood & Veneer",
    products: "Gurjan-Faced Marine Panels",
    tolerance: "0 - Void Core",
    species: "100% Gurjan · Micro-Veneer",
    summary:
      "Cross-laminated multi-ply with boiling-water-proof phenolic bonding. Hand-selected decorative face veneers over calibrated hardwood cores.",
    parts: ["Gurjan marine ply", "Micro-veneer rolls", "Acoustic core ply", "Cabinet backers"],
  },
];

export function TradesSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse coordinates relative to the section
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeCol, setActiveCol] = useState<number | null>(null);

  // Smooth mouse move listener
  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setActiveCol(null);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="trades"
      aria-label="Three products from one forest"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#070A10",
        paddingTop: "clamp(5rem, 9vw, 8rem)",
        paddingBottom: "clamp(5rem, 9vw, 8rem)",
        paddingLeft: "clamp(3.5rem, 7vw, 7rem)", // Ample clearance for the left spine label
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Ambient Interactive Mouse Glow (Fluid workshop lighting) ── */}
      {!reducedMotion && isHovered && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 160, 92, 0.07), transparent 75%)`,
          }}
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Editorial Masthead ──────────────────────────────────────── */}
        <div className="mb-14 md:mb-20">
          <p
            style={{
              fontFamily: MONO,
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              color: AMBER,
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            02 // PRODUCTION MANIFEST
          </p>

          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2rem, 4.2vw, 3.8rem)",
              fontWeight: 500,
              lineHeight: 1.15,
              color: TEXT_HI,
              letterSpacing: "-0.015em",
            }}
          >
            Three products out of one forest.
          </h2>

          <p
            style={{
              fontFamily: SANS,
              fontSize: "clamp(0.88rem, 1vw, 1rem)",
              lineHeight: 1.7,
              color: TEXT_MID,
              marginTop: "1.25rem",
              maxWidth: "48ch",
            }}
          >
            A single log yields resonant tone wood, structural carcass mass, and micro-thin veneer.
            The forestry is shared. The tolerances diverge.
          </p>
        </div>

        {/* ── Stable 3-Column Architectural Triptych (Zero Layout Shift) ─ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {TRADES.map((trade, i) => {
            const isColActive = activeCol === i;
            const isColDimmed = activeCol !== null && !isColActive;

            return (
              <div
                key={trade.num}
                onMouseEnter={() => setActiveCol(i)}
                className="group relative flex flex-col justify-between pt-6 border-t transition-all duration-300"
                style={{
                  borderColor: isColActive ? LINE_ACTIVE : LINE,
                  opacity: isColDimmed ? 0.4 : 1,
                }}
              >
                {/* Header row: Number & Discipline Tag */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: "0.72rem",
                        letterSpacing: "0.15em",
                        color: isColActive ? AMBER : TEXT_MUTED,
                        transition: "color 0.2s",
                      }}
                    >
                      {trade.num} // {trade.tag}
                    </span>

                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: "0.7rem",
                        color: isColActive ? AMBER : TEXT_HI,
                        letterSpacing: "0.08em",
                        transition: "color 0.2s",
                      }}
                    >
                      {trade.tolerance}
                    </span>
                  </div>

                  {/* Product Headline */}
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontSize: "clamp(1.5rem, 2.2vw, 1.85rem)",
                      fontWeight: 600,
                      color: TEXT_HI,
                      lineHeight: 1.2,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {trade.products}
                  </h3>

                  {/* Species Subtitle */}
                  <p
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: "0.85rem",
                      color: isColActive ? AMBER : TEXT_MID,
                      marginBottom: "1.25rem",
                      transition: "color 0.2s",
                    }}
                  >
                    {trade.species}
                  </p>

                  {/* Body summary */}
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: "0.82rem",
                      lineHeight: 1.7,
                      color: TEXT_MID,
                      marginBottom: "2rem",
                    }}
                  >
                    {trade.summary}
                  </p>
                </div>

                {/* Footer specs: List of parts */}
                <div
                  className="pt-4 border-t"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: "0.58rem",
                      letterSpacing: "0.18em",
                      color: TEXT_MUTED,
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    STANDARD SHIPPED FORMS
                  </p>
                  
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {trade.parts.map((part, pIdx) => (
                      <span
                        key={pIdx}
                        style={{
                          fontFamily: MONO,
                          fontSize: "0.68rem",
                          color: isColActive ? TEXT_HI : TEXT_MID,
                          transition: "color 0.2s",
                        }}
                      >
                        · {part}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Quiet Technical Footnote ────────────────────────────────── */}
        <div
          className="mt-16 pt-6 border-t flex flex-col sm:flex-row items-baseline justify-between gap-4"
          style={{ borderColor: LINE }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: "0.62rem",
              letterSpacing: "0.16em",
              color: TEXT_MUTED,
            }}
          >
            KODAGU MILL MANIFEST // VERIFIED PROVENANCE
          </p>

          <p
            style={{
              fontFamily: MONO,
              fontSize: "0.62rem",
              letterSpacing: "0.16em",
              color: AMBER,
            }}
          >
            SELECT COLUMN TO FOCUS SPECIFICATION
          </p>
        </div>
      </div>
    </section>
  );
}
