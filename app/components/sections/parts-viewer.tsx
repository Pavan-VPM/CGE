"use client";

import { useState } from "react";
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

interface ComponentSpec {
  id: string;
  number: string;
  name: string;
  species: string;
  botanical: string;
  tolerance: string;
  moisture: string;
  dimensions: string;
  description: string;
  pin: { x: number; y: number }; // percentage coordinates on studio flatlay
}

const COMPONENTS: ComponentSpec[] = [
  {
    id: "fretboard",
    number: "01",
    name: "Slotted Fretboard Blank",
    species: "East Indian Rosewood",
    botanical: "Dalbergia latifolia",
    tolerance: "±0.05 mm CNC kerf",
    moisture: "7.8% EMC kiln-cured",
    dimensions: "500 × 70 × 9 mm",
    description:
      "Strict quartersawn radial cut ensuring zero lateral twist. CNC pre-slotted for 24 frets with 0.58 mm kerf and optional radiused compound face.",
    pin: { x: 26, y: 50 },
  },
  {
    id: "bridge",
    number: "02",
    name: "Carved Acoustic Bridge",
    species: "African Ebony / Rosewood",
    botanical: "Diospyros crassiflora",
    tolerance: "±0.08 mm saddle slot",
    moisture: "7.5% EMC seasoned",
    dimensions: "155 × 38 × 9.5 mm",
    description:
      "Precision belly profile with 6 pin holes reamed at 5° taper and compensated bone saddle routing. Finished with hand-buffed carnauba wax.",
    pin: { x: 43, y: 52 },
  },
  {
    id: "neck",
    number: "03",
    name: "Quartersawn Neck Blank",
    species: "Seasoned Hardwood / Mahogany",
    botanical: "Swietenia / Cedrela",
    tolerance: "< 2.0° grain runout",
    moisture: "8.0% EMC stabilized",
    dimensions: "650 × 100 × 25 mm",
    description:
      "Vertical end-grain alignment for maximum rigidity and resonant sustain. Bilaterally routed for modern dual-action steel truss rods.",
    pin: { x: 62, y: 48 },
  },
  {
    id: "headstock",
    number: "04",
    name: "Bookmatched Headstock Veneer",
    species: "Selected Figure Rosewood",
    botanical: "Dalbergia latifolia",
    tolerance: "±0.04 mm calibrated",
    moisture: "7.5% EMC equilibrium",
    dimensions: "200 × 95 × 2.0 mm",
    description:
      "Consecutive sequence-sliced sheets exhibiting perfect bilateral flame and ribbon grain. Pre-sanded to 240 grit for clean luthier inlay work.",
    pin: { x: 76, y: 22 },
  },
];

interface PartsViewerSectionProps {
  onQuoteOpen: () => void;
}

export function PartsViewerSection({ onQuoteOpen }: PartsViewerSectionProps) {
  const [activeId, setActiveId] = useState<string>("fretboard");
  const [viewMode, setViewMode] = useState<"flatlay" | "macro">("flatlay");
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const activeComp = COMPONENTS.find((c) => c.id === activeId) || COMPONENTS[0];

  const handleAddToBrief = (name: string) => {
    try {
      const current = JSON.parse(sessionStorage.getItem("cge-quote-draft") || "{}");
      sessionStorage.setItem(
        "cge-quote-draft",
        JSON.stringify({
          ...current,
          product: name,
        })
      );
    } catch {
      // ignore SSR/storage restrictions
    }
    setAddedNotice(name);
    setTimeout(() => setAddedNotice(null), 2500);
    onQuoteOpen();
  };

  return (
    <section
      id="parts"
      aria-label="Precision guitar components viewer"
      className="relative w-full overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        backgroundColor: "#060910",
        paddingTop: "clamp(5rem, 8vw, 7.5rem)",
        paddingBottom: "clamp(5rem, 8vw, 7.5rem)",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Minimal Editorial Header */}
        <div className="mb-8">
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
            04 // COMPONENT ANATOMY
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
            Precision-milled tonewood.
          </h2>

          <p
            style={{
              fontFamily: SANS,
              fontSize: "0.95rem",
              color: TEXT_MID,
              maxWidth: "540px",
              margin: "1rem auto 0",
              lineHeight: 1.6,
            }}
          >
            Every part is quartersawn from equilibrium-cured Kodagu heartwood, CNC-slotted to ±0.05 mm, and container-stabilized before departure.
          </p>
        </div>

        {/* View Mode Switcher (Minimal Tabs) */}
        <div className="inline-flex items-center gap-1 p-1 rounded-full mb-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]">
          <button
            onClick={() => setViewMode("flatlay")}
            className="px-4 py-1.5 rounded-full text-xs transition-all"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.08em",
              backgroundColor: viewMode === "flatlay" ? "rgba(201, 160, 92, 0.16)" : "transparent",
              color: viewMode === "flatlay" ? AMBER : TEXT_MID,
              border: viewMode === "flatlay" ? "1px solid rgba(201, 160, 92, 0.35)" : "1px solid transparent",
            }}
          >
            STUDIO FLATLAY
          </button>
          <button
            onClick={() => setViewMode("macro")}
            className="px-4 py-1.5 rounded-full text-xs transition-all"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.08em",
              backgroundColor: viewMode === "macro" ? "rgba(201, 160, 92, 0.16)" : "transparent",
              color: viewMode === "macro" ? AMBER : TEXT_MID,
              border: viewMode === "macro" ? "1px solid rgba(201, 160, 92, 0.35)" : "1px solid transparent",
            }}
          >
            GRAIN MACRO 8K
          </button>
        </div>

        {/* ── Centerpiece Photorealistic Viewer ──────────────────────── */}
        <div
          className="relative w-full max-w-2xl aspect-[4/3] rounded overflow-hidden shadow-2xl group"
          style={{
            border: "1px solid rgba(201, 160, 92, 0.22)",
            backgroundColor: "#03060A",
          }}
        >
          <AnimatePresence mode="wait">
            {viewMode === "flatlay" ? (
              <motion.div
                key="flatlay"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/components/guitar_components.jpg"
                  alt="Precision acoustic guitar components on natural black slate"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 680px"
                  className="object-cover select-none"
                />

                {/* Hotspot Target Markers */}
                {COMPONENTS.map((comp) => {
                  const isActive = activeId === comp.id;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => setActiveId(comp.id)}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 focus:outline-none group/pin cursor-pointer"
                      style={{
                        left: `${comp.pin.x}%`,
                        top: `${comp.pin.y}%`,
                      }}
                      aria-label={`Select ${comp.name}`}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Subtle ping ring if active */}
                        {isActive && (
                          <span
                            className="absolute w-8 h-8 rounded-full animate-ping pointer-events-none opacity-40"
                            style={{ backgroundColor: AMBER }}
                          />
                        )}
                        {/* Target badge */}
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 text-[10px] font-mono font-bold"
                          style={{
                            backgroundColor: isActive ? AMBER : "rgba(6, 9, 16, 0.85)",
                            color: isActive ? "#060910" : TEXT_HI,
                            border: `1px solid ${isActive ? AMBER : "rgba(201, 160, 92, 0.4)"}`,
                            boxShadow: isActive ? `0 0 12px ${AMBER}` : "0 2px 8px rgba(0,0,0,0.6)",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          {comp.number}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Subtle Slate Specimen Watermark */}
                <div
                  className="absolute bottom-3 left-3 px-2 py-0.5 rounded select-none pointer-events-none"
                  style={{
                    fontFamily: MONO,
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    color: TEXT_MUTED,
                    background: "rgba(6, 9, 16, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  SLATE STAGE // 4 LUTHIER PROFILES
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="macro"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/components/fretboard_macro.jpg"
                  alt="Extreme macro close-up of quartersawn rosewood fretboard grain and fret slots"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 680px"
                  className="object-cover select-none"
                />

                {/* Macro Technical Watermark */}
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
                  8K MACRO // 0.58mm KERF · 0.0° RUNOUT
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Component Selection Tabs (Minimal 4-Way Strip) ─────────── */}
        <div className="w-full max-w-2xl mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COMPONENTS.map((comp) => {
            const isActive = activeId === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => {
                  setActiveId(comp.id);
                  if (viewMode === "macro") setViewMode("flatlay");
                }}
                className="py-2.5 px-3 rounded text-left transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isActive ? "rgba(201, 160, 92, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  border: isActive ? "1px solid rgba(201, 160, 92, 0.4)" : "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: "0.62rem",
                    color: isActive ? AMBER : TEXT_MUTED,
                    letterSpacing: "0.1em",
                    marginBottom: "0.2rem",
                  }}
                >
                  {comp.number} // PART
                </div>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: isActive ? TEXT_HI : TEXT_MID,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {comp.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Active Component Spec Sheet & Action Card ─────────────── */}
        <div
          className="w-full max-w-2xl mt-4 p-5 rounded text-left transition-all duration-300"
          style={{
            backgroundColor: "rgba(10, 16, 28, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.07)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 mb-4 border-b border-[rgba(255,255,255,0.06)]">
            <div>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: AMBER,
                  textTransform: "uppercase",
                }}
              >
                {activeComp.species}
              </span>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: "1.35rem",
                  fontWeight: 500,
                  color: TEXT_HI,
                  marginTop: "0.15rem",
                }}
              >
                {activeComp.name}
              </h3>
              <p style={{ fontFamily: MONO, fontSize: "0.72rem", color: TEXT_MUTED, fontStyle: "italic" }}>
                {activeComp.botanical}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleAddToBrief(activeComp.name)}
                className="px-4 py-2 rounded text-xs transition-all duration-200 cursor-pointer font-medium"
                style={{
                  fontFamily: MONO,
                  letterSpacing: "0.08em",
                  backgroundColor: AMBER,
                  color: "#060910",
                  boxShadow: "0 2px 10px rgba(201, 160, 92, 0.2)",
                }}
              >
                ADD TO BRIEF +
              </button>
            </div>
          </div>

          {/* Technical Spec Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs mb-3">
            <div>
              <p style={{ fontFamily: MONO, fontSize: "0.6rem", color: TEXT_MUTED, letterSpacing: "0.08em" }}>
                MILLING TOLERANCE
              </p>
              <p style={{ fontFamily: MONO, fontSize: "0.78rem", color: TEXT_HI, marginTop: "0.15rem" }}>
                {activeComp.tolerance}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: MONO, fontSize: "0.6rem", color: TEXT_MUTED, letterSpacing: "0.08em" }}>
                EQUILIBRIUM MOISTURE
              </p>
              <p style={{ fontFamily: MONO, fontSize: "0.78rem", color: TEXT_HI, marginTop: "0.15rem" }}>
                {activeComp.moisture}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: MONO, fontSize: "0.6rem", color: TEXT_MUTED, letterSpacing: "0.08em" }}>
                SPEC DIMENSIONS
              </p>
              <p style={{ fontFamily: MONO, fontSize: "0.78rem", color: TEXT_HI, marginTop: "0.15rem" }}>
                {activeComp.dimensions}
              </p>
            </div>
          </div>

          <p
            style={{
              fontFamily: SANS,
              fontSize: "0.82rem",
              color: TEXT_MID,
              lineHeight: 1.55,
              marginTop: "0.5rem",
            }}
          >
            {activeComp.description}
          </p>

          {/* Notification toast if added */}
          {addedNotice && (
            <div
              className="mt-3 py-1.5 px-3 rounded text-center"
              style={{
                fontFamily: MONO,
                fontSize: "0.68rem",
                color: AMBER,
                backgroundColor: "rgba(201, 160, 92, 0.12)",
                border: "1px solid rgba(201, 160, 92, 0.25)",
              }}
            >
              ✓ {addedNotice} added to export specification brief
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
