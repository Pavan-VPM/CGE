"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

// ── Color Constants ─────────────────────────────────────────────────────────
const BG      = "#0B0E14";
const AMBER   = "#C9A05C";
const HI      = "rgba(242, 244, 247, 0.92)";
const DIM     = "rgba(242, 244, 247, 0.50)";
const MONO    = "var(--font-ibm-plex-mono, monospace)";
const SERIF   = "var(--font-newsreader, Georgia, serif)";
const SANS    = "var(--font-archivo, system-ui, sans-serif)";

// ── Beat boundary helper ─────────────────────────────────────────────────────
// 7 beats × 14% each = 98%
const beat = (n: number) => ({
  s:  n * 0.14,                   // start
  fi: n * 0.14 + 0.04,            // fade-in complete
  fo: (n + 1) * 0.14 - 0.04,      // fade-out start
  e:  (n + 1) * 0.14,             // end
});

// ── Draggable Moisture Gauge ─────────────────────────────────────────────────
function MoistureGauge({ prog }: { prog: MotionValue<number> }) {
  const [norm, setNorm]       = useState(0);
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const update = useCallback((e: MouseEvent) => {
    if (!svgRef.current) return;
    const r   = svgRef.current.getBoundingClientRect();
    const cx  = r.left + r.width  / 2;
    const cy  = r.top  + r.height * 0.74;
    const deg = (Math.atan2(-(e.clientY - cy), e.clientX - cx) * 180) / Math.PI;
    setNorm(Math.max(0, Math.min(1, (Math.max(-180, Math.min(0, deg)) + 180) / 180)));
  }, []);

  useEffect(() => {
    const mv = (e: MouseEvent) => { if (dragging) update(e); };
    const mu = () => setDragging(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", mu);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", mu); };
  }, [dragging, update]);

  const over = norm > 0.44;
  const rad  = ((-180 + norm * 180) * Math.PI) / 180;
  const cx = 50, cy = 68, r = 34;

  return (
    <div className="relative w-full h-full select-none">
      {over && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-8 left-0 right-0 text-center pointer-events-none"
          style={{ color: AMBER, fontSize: "0.6rem", fontFamily: MONO, whiteSpace: "nowrap" }}
        >
          At 16% — face splits. Joint opens.
        </motion.div>
      )}
      <svg ref={svgRef} viewBox="0 0 100 80" fill="none" className="w-full h-full cursor-grab active:cursor-grabbing">
        {/* danger zone highlight */}
        <motion.path d="M 65 42 A 34 34 0 0 1 84 68" stroke={AMBER} strokeWidth="4" strokeOpacity="0.15" style={{ pathLength: prog }} />
        {/* main arc */}
        <motion.path d="M 16 68 A 34 34 0 0 1 84 68" stroke={AMBER} strokeWidth="1.5" style={{ pathLength: prog }} />
        {/* ticks */}
        {Array.from({ length: 7 }).map((_, i) => {
          const a  = ((-180 + i * 30) * Math.PI) / 180;
          const x1 = +(cx + 34 * Math.cos(a)).toFixed(2);
          const y1 = +(cy + 34 * Math.sin(a)).toFixed(2);
          const x2 = +(cx + 27 * Math.cos(a)).toFixed(2);
          const y2 = +(cy + 27 * Math.sin(a)).toFixed(2);
          return <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={AMBER} strokeWidth="0.5" style={{ pathLength: prog }} />;
        })}
        <text x="6"  y="78" fontSize="5" fill={AMBER} fontFamily={MONO}>10%</text>
        <text x="72" y="78" fontSize="5" fill={AMBER} fontFamily={MONO}>16%</text>
        {/* needle */}
        <motion.line
          x1={cx} y1={cy} x2={cx + r * Math.cos(rad)} y2={cy + r * Math.sin(rad)}
          stroke={over ? AMBER : HI} strokeWidth="2" strokeLinecap="round"
          style={{ pathLength: prog }}
          onMouseDown={(e) => { e.preventDefault(); setDragging(true); }}
        />
        <circle cx={cx} cy={cy} r="3" fill={AMBER} />
        <text x="50" y="78" fontSize="4" fill="rgba(242,244,247,0.2)" fontFamily={MONO} textAnchor="middle">drag</text>
      </svg>
    </div>
  );
}

// ── Container Grade Toggle ───────────────────────────────────────────────────
function ContainerGraphic({ prog }: { prog: MotionValue<number> }) {
  const [peeled, setPeeled] = useState(false);
  return (
    <div className="relative w-full h-full select-none cursor-pointer"
      onMouseEnter={() => setPeeled(true)} onMouseLeave={() => setPeeled(false)}>
      <svg viewBox="0 0 100 82" fill="none" className="w-full h-full">
        {/* body */}
        <motion.rect x="8" y="14" width="84" height="58" stroke={AMBER} strokeWidth="1" style={{ pathLength: prog }} />
        {/* corrugation */}
        {[22, 35, 50, 65, 78].map(x => (
          <motion.line key={x} x1={x} y1="14" x2={x} y2="72" stroke={AMBER} strokeWidth="0.25" strokeOpacity="0.2" style={{ pathLength: prog }} />
        ))}
        {/* door seam */}
        <motion.line x1="50" y1="14" x2="50" y2="72" stroke={AMBER} strokeWidth="1" style={{ pathLength: prog }} />
        {/* door peel */}
        {peeled && <motion.path d="M 8 14 L 32 8 L 32 68 L 8 72 Z" fill={BG} stroke={AMBER} strokeWidth="0.8" />}
        {/* labels */}
        {!peeled && <><text x="55" y="45" fontSize="7" fill={AMBER} fontFamily={MONO}>SELECT</text><text x="55" y="55" fontSize="4.5" fill="rgba(201,160,92,0.45)" fontFamily={MONO}>photo grade</text></>}
        {peeled  && <><text x="11" y="45" fontSize="7" fill={HI}    fontFamily={MONO}>UTILITY</text><text x="11" y="55" fontSize="4.5" fill={DIM}    fontFamily={MONO}>actual grade</text></>}
      </svg>
      <p style={{ fontSize: "0.58rem", fontFamily: MONO, color: "rgba(242,244,247,0.2)", textAlign: "center", marginTop: "4px" }}>
        {peeled ? "actual grade inside" : "hover to open"}
      </p>
    </div>
  );
}

// ── Port Route ───────────────────────────────────────────────────────────────
function PortRoute({ prog }: { prog: MotionValue<number> }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
        <motion.path d="M 14 65 C 28 48 58 52 78 28" stroke={AMBER} strokeWidth="1.5" strokeDasharray="3 3" style={{ pathLength: prog }} />
        <motion.circle cx="14" cy="65" r="3.5" fill={AMBER} style={{ pathLength: prog }} />
        <text x="8"  y="76" fontSize="4.5" fill={AMBER}             fontFamily={MONO}>Kodagu</text>
        <text x="68" y="22" fontSize="4"   fill="rgba(242,244,247,0.3)" fontFamily={MONO}>Port</text>
        {/* Rejection X */}
        <motion.line x1="74" y1="24" x2="84" y2="34" stroke={HI} strokeWidth="2.5" style={{ pathLength: prog }} />
        <motion.line x1="84" y1="24" x2="74" y2="34" stroke={HI} strokeWidth="2.5" style={{ pathLength: prog }} />
      </svg>
      {hov && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute top-3 right-2" style={{ color: AMBER, fontSize: "0.6rem", fontFamily: MONO, whiteSpace: "nowrap" }}>
          Held. Fumigated. Destroyed.
        </motion.div>
      )}
      {/* hover target over the X */}
      <div className="absolute cursor-pointer" style={{ top: "22%", right: "12%", width: "32px", height: "32px" }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} />
    </div>
  );
}

// ── Clock ────────────────────────────────────────────────────────────────────
function ClockGraphic({ prog }: { prog: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <motion.circle cx="50" cy="50" r="40" stroke={AMBER} strokeWidth="1" strokeDasharray="4 4" style={{ pathLength: prog }} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180;
        const x1 = +(50 + 33 * Math.cos(a)).toFixed(2);
        const y1 = +(50 + 33 * Math.sin(a)).toFixed(2);
        const x2 = +(50 + 39 * Math.cos(a)).toFixed(2);
        const y2 = +(50 + 39 * Math.sin(a)).toFixed(2);
        return <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={AMBER} strokeWidth={i % 3 === 0 ? "1.5" : "0.5"} style={{ pathLength: prog }} />;
      })}
      <motion.line x1="50" y1="50" x2="50" y2="18" stroke={HI} strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: prog }} />
      <motion.line x1="50" y1="50" x2="72" y2="56" stroke={HI} strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: prog }} />
      <circle cx="50" cy="50" r="2.5" fill={AMBER} />
      <text x="50" y="76" fontSize="5" fill="rgba(242,244,247,0.15)" fontFamily={MONO} textAnchor="middle">no response</text>
    </svg>
  );
}

// ── MOQ Grid ─────────────────────────────────────────────────────────────────
function MOQGrid({ prog }: { prog: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => {
          const lit = row === 0 && col < 2;
          return (
            <motion.rect key={`${row}-${col}`}
              x={2 + col * 9.8} y={2 + row * 9.8} width="8" height="8"
              fill={lit ? AMBER : "transparent"}
              stroke={lit ? AMBER : "rgba(255,255,255,0.09)"}
              strokeWidth="0.5" style={{ pathLength: prog }} />
          );
        })
      )}
      <text x="2" y="98" fontSize="5" fill={AMBER} fontFamily={MONO}>2 / 100 needed</text>
    </svg>
  );
}

// ── Story Beat (reusable beat layout) ────────────────────────────────────────
function StoryBeat({
  opacity, hy, by, bgy, index, eyebrow, headline, body, graphic,
}: {
  opacity: MotionValue<number>;
  hy: MotionValue<number>;
  by: MotionValue<number>;
  bgy: MotionValue<number>;
  index: string;
  eyebrow: string;
  headline: string;
  body: string;
  graphic: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity }}
    >
      {/* Ambient watermark label */}
      <motion.div aria-hidden="true" className="absolute pointer-events-none"
        style={{ y: bgy, left: "3vw", top: "50%", translateY: "-50%",
          writingMode: "vertical-rl", textTransform: "uppercase",
          letterSpacing: "0.5em", fontSize: "clamp(5rem, 13vw, 11rem)",
          color: "rgba(201,160,92,0.035)", fontFamily: MONO, userSelect: "none" }}>
        SOURCING
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* Left: Text */}
        <div>
          <motion.p style={{ y: bgy, color: AMBER, fontFamily: MONO, fontSize: "0.65rem", letterSpacing: "0.22em", marginBottom: "1.25rem" }}>
            {index} — {eyebrow}
          </motion.p>
          <motion.h3 style={{ y: hy, color: HI, fontFamily: SERIF,
            fontSize: "clamp(1.75rem, 2.8vw, 2.75rem)", fontWeight: 700,
            lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "22ch" }}>
            {headline}
          </motion.h3>
          <motion.p style={{ y: by, color: DIM, fontFamily: SANS,
            fontSize: "clamp(0.875rem, 1.05vw, 1rem)", lineHeight: 1.8, maxWidth: "44ch" }}>
            {body}
          </motion.p>
        </div>
        {/* Right: Graphic */}
        <motion.div style={{ y: by }} className="flex items-center justify-center">
          <div className="w-52 h-52 md:w-64 md:h-64">
            {graphic}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export function ProblemSection() {
  const reduced      = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // ── All motion values hoisted unconditionally ─────────────────────────────
  const b0 = beat(0);
  const op0   = useTransform(p, [b0.s, b0.fi, b0.fo, b0.e], [0, 1, 1, 0]);
  const hy0   = useTransform(p, [b0.s, b0.e],  [50, -50]);
  const by0   = useTransform(p, [b0.s, b0.e],  [70, -70]);
  const bgy0  = useTransform(p, [b0.s, b0.e],  [18, -18]);
  const hl0   = useTransform(p, [b0.s, b0.fi], [0, 1]);

  const b1 = beat(1);
  const op1   = useTransform(p, [b1.s, b1.fi, b1.fo, b1.e], [0, 1, 1, 0]);
  const hy1   = useTransform(p, [b1.s, b1.e],  [50, -50]);
  const by1   = useTransform(p, [b1.s, b1.e],  [70, -70]);
  const bgy1  = useTransform(p, [b1.s, b1.e],  [18, -18]);
  const path1 = useTransform(p, [b1.s, b1.fi], [0, 1]);

  const b2 = beat(2);
  const op2   = useTransform(p, [b2.s, b2.fi, b2.fo, b2.e], [0, 1, 1, 0]);
  const hy2   = useTransform(p, [b2.s, b2.e],  [50, -50]);
  const by2   = useTransform(p, [b2.s, b2.e],  [70, -70]);
  const bgy2  = useTransform(p, [b2.s, b2.e],  [18, -18]);
  const path2 = useTransform(p, [b2.s, b2.fi], [0, 1]);

  const b3 = beat(3);
  const op3   = useTransform(p, [b3.s, b3.fi, b3.fo, b3.e], [0, 1, 1, 0]);
  const hy3   = useTransform(p, [b3.s, b3.e],  [50, -50]);
  const by3   = useTransform(p, [b3.s, b3.e],  [70, -70]);
  const bgy3  = useTransform(p, [b3.s, b3.e],  [18, -18]);
  const path3 = useTransform(p, [b3.s, b3.fi], [0, 1]);

  const b4 = beat(4);
  const op4   = useTransform(p, [b4.s, b4.fi, b4.fo, b4.e], [0, 1, 1, 0]);
  const hy4   = useTransform(p, [b4.s, b4.e],  [50, -50]);
  const by4   = useTransform(p, [b4.s, b4.e],  [70, -70]);
  const bgy4  = useTransform(p, [b4.s, b4.e],  [18, -18]);
  const path4 = useTransform(p, [b4.s, b4.fi], [0, 1]);

  const b5 = beat(5);
  const op5   = useTransform(p, [b5.s, b5.fi, b5.fo, b5.e], [0, 1, 1, 0]);
  const hy5   = useTransform(p, [b5.s, b5.e],  [50, -50]);
  const by5   = useTransform(p, [b5.s, b5.e],  [70, -70]);
  const bgy5  = useTransform(p, [b5.s, b5.e],  [18, -18]);
  const path5 = useTransform(p, [b5.s, b5.fi], [0, 1]);

  // Beat 6 stays visible once reached
  const b6 = beat(6);
  const op6    = useTransform(p, [b6.s, b6.fi, 1, 1], [0, 1, 1, 1]);
  const hy6    = useTransform(p, [b6.s, b6.fi], [60, 0]);
  const dockY  = useTransform(p, [b6.fi, 1],    [30, 0]);
  const dockOp = useTransform(p, [b6.fi, 1],    [0, 1]);

  // Reduced-motion fallback
  if (reduced) {
    const scenes = [
      { h: "…the moisture content arrives wrong", b: "Kiln-dried timber reabsorbs moisture in transit. A panel that left Kodagu at 10% can arrive at 16%. The face splits. The joint opens. The batch fails." },
      { h: "…the grade in the photo is not the grade in the container", b: "Select-grade photographs ship with utility-grade timber underneath. By the time the container is opened, the supplier is unreachable and the deposit is gone." },
      { h: "…the crate fails phytosanitary inspection", b: "Untreated or incorrectly documented wood is held, fumigated at the importer's cost, or destroyed. The timeline collapses." },
      { h: "…nobody answers after the deposit clears", b: "Communication that was daily before payment becomes weekly, then nothing. Time is the one thing a production schedule does not have." },
      { h: "…the MOQ assumes you are a factory", b: "A luthier who needs forty fretboard blanks cannot buy a container of four thousand." },
    ];
    return (
      <section id="sourcing" style={{ backgroundColor: BG, padding: "10vh 0" }}>
        <div className="content-width">
          <h2 style={{ color: HI, fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, marginBottom: "4rem" }}>
            Buying wood products from overseas is cheap, until it isn&apos;t.
          </h2>
          {scenes.map((s, i) => (
            <div key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "2.5rem 0" }}>
              <h3 style={{ color: HI, fontFamily: SERIF, fontSize: "clamp(1.4rem, 2.2vw, 2rem)", fontWeight: 700, marginBottom: "1rem" }}>{s.h}</h3>
              <p style={{ color: DIM, fontFamily: SANS, lineHeight: 1.75 }}>{s.b}</p>
            </div>
          ))}
          <h2 style={{ color: HI, fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, marginTop: "4rem" }}>
            Every one of those is a specification problem.{" "}
            <span style={{ color: AMBER }}>So we ship specifications.</span>
          </h2>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ── 800vh Scroll Container ─────────────────────────────────────── */}
      <section
        id="sourcing"
        ref={containerRef}
        style={{ height: "800vh", backgroundColor: BG, position: "relative" }}
        aria-label="The sourcing problem"
      >
        {/* Thin scroll progress line — right edge */}
        <div style={{ position: "absolute", top: 0, right: "20px", width: "1px", height: "100%", background: "rgba(201,160,92,0.06)", zIndex: 20 }}>
          <motion.div style={{ width: "100%", height: "100%", background: AMBER, scaleY: p, transformOrigin: "top" }} />
        </div>

        {/* ── Sticky Viewport ─────────────────────────────────────────── */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Beat 0: Cold Open */}
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center pointer-events-none" style={{ opacity: op0 }}>
            <motion.p style={{ y: bgy0, color: AMBER, fontFamily: MONO, fontSize: "0.65rem", letterSpacing: "0.25em", marginBottom: "2rem" }}>
              SOURCING — FIELD NOTES
            </motion.p>
            <motion.h2 style={{ y: hy0, color: HI, fontFamily: SERIF, fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.1, maxWidth: "24ch" }}>
              Buying wood products from overseas is cheap, until it isn&apos;t.
            </motion.h2>
            {/* Signature hairline draws under headline */}
            <div style={{ width: "min(420px, 75vw)", marginTop: "2.5rem", height: "1px", overflow: "hidden" }}>
              <motion.div style={{ height: "1px", backgroundColor: AMBER, scaleX: hl0, transformOrigin: "left center" }} />
            </div>
            <motion.p style={{ y: by0, marginTop: "1.75rem", color: DIM, fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.2em" }}>
              scroll to continue
            </motion.p>
          </motion.div>

          {/* Beat 1: Moisture */}
          <StoryBeat opacity={op1} hy={hy1} by={by1} bgy={bgy1}
            index="01" eyebrow="MOISTURE CONTENT"
            headline="…the moisture content arrives wrong"
            body="Kiln-dried timber reabsorbs moisture in transit. A panel that left Kodagu at 10% can arrive at 16%. The face splits. The joint opens. The batch fails."
            graphic={<MoistureGauge prog={path1} />} />

          {/* Beat 2: Grade */}
          <StoryBeat opacity={op2} hy={hy2} by={by2} bgy={bgy2}
            index="02" eyebrow="GRADE MISMATCH"
            headline="…the grade in the photo is not the grade in the container"
            body="Select-grade photographs ship with utility-grade timber underneath. By the time the container is opened, the supplier is unreachable and the deposit is gone."
            graphic={<ContainerGraphic prog={path2} />} />

          {/* Beat 3: Port */}
          <StoryBeat opacity={op3} hy={hy3} by={by3} bgy={bgy3}
            index="03" eyebrow="PHYTOSANITARY FAILURE"
            headline="…the crate fails inspection at the destination port"
            body="Untreated or incorrectly documented wood is held, fumigated at the importer's cost, or destroyed. The shipment timeline collapses regardless of what was agreed."
            graphic={<PortRoute prog={path3} />} />

          {/* Beat 4: Silence */}
          <StoryBeat opacity={op4} hy={hy4} by={by4} bgy={bgy4}
            index="04" eyebrow="COMMUNICATION FAILURE"
            headline="…nobody answers after the deposit clears"
            body="Communication that was daily before payment becomes weekly, then monthly, then nothing. Time is the one thing a production schedule does not have."
            graphic={<ClockGraphic prog={path4} />} />

          {/* Beat 5: MOQ */}
          <StoryBeat opacity={op5} hy={hy5} by={by5} bgy={bgy5}
            index="05" eyebrow="MINIMUM ORDER"
            headline="…the MOQ assumes you are a factory, not a workshop"
            body="A luthier who needs forty fretboard blanks cannot buy a container of four thousand. Industrial MOQs exclude the craftspeople who pay the highest price per piece."
            graphic={<MOQGrid prog={path5} />} />

          {/* Beat 6: Resolution */}
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center" style={{ opacity: op6 }}>
            <motion.h2 style={{ y: hy6, color: HI, fontFamily: SERIF, fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, maxWidth: "26ch", marginBottom: "0.5rem" }}>
              Every one of those is a specification problem.
            </motion.h2>
            <motion.h2 style={{ y: hy6, color: AMBER, fontFamily: SERIF, fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, maxWidth: "26ch", marginBottom: "4rem" }}>
              So we ship specifications.
            </motion.h2>

            {/* Filed graphics — dock into a row as evidence */}
            <motion.div style={{ y: dockY, opacity: dockOp }}
              className="flex items-center justify-center gap-4 md:gap-8 flex-wrap pointer-events-auto">
              {[
                <MoistureGauge prog={path1} />,
                <ContainerGraphic prog={path2} />,
                <PortRoute prog={path3} />,
                <ClockGraphic prog={path4} />,
                <MOQGrid prog={path5} />,
              ].map((graphic, i) => (
                <div key={i} className="flex items-center gap-4 md:gap-8">
                  <div className="w-10 h-10 md:w-14 md:h-14 opacity-50 hover:opacity-100 transition-opacity duration-300">
                    {graphic}
                  </div>
                  {i < 4 && <div style={{ width: "1px", height: "28px", backgroundColor: "rgba(255,255,255,0.07)" }} />}
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── Marquee Strip ─────────────────────────────────────────────── */}
      <div className="sourcing-marquee-root" style={{ backgroundColor: BG, borderTop: `1px solid rgba(201,160,92,0.18)`, borderBottom: `1px solid rgba(201,160,92,0.18)`, overflow: "hidden", padding: "0.85rem 0" }}>
        <div className="sourcing-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ color: AMBER, fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.18em", marginRight: "3.5rem", whiteSpace: "nowrap" }}>
              Sampling a new supplier? Ask for a sample crate. ·
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

