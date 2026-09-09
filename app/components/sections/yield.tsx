"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useReducedMotion, motion, useScroll, useTransform } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// SVG object silhouettes for state 3
const FINISHED_GOODS = [
  { label: "Fretboard", d: "M10,0 L50,0 L48,140 L12,140 Z", fill: false },
  { label: "Bridge", d: "M0,10 Q30,0 60,10 L60,30 Q30,40 0,30 Z", fill: true },
  { label: "Neck", d: "M15,0 L45,0 L42,200 L18,200 Q10,180 12,100 Z", fill: false },
  { label: "Table top", d: "M0,0 L180,0 L180,100 L0,100 Z", fill: false },
  { label: "Chair leg", d: "M10,0 L30,0 L30,160 L10,160 Z", fill: false },
  { label: "Ply sheet 1", d: "M0,0 L140,0 L140,80 L0,80 Z", fill: true },
  { label: "Ply sheet 2", d: "M0,0 L140,0 L140,80 L0,80 Z", fill: false },
  { label: "Veneer 1", d: "M0,0 L120,0 L120,20 L0,20 Z", fill: true },
  { label: "Veneer 2", d: "M0,0 L120,0 L120,20 L0,20 Z", fill: false },
  { label: "Billet 1", d: "M0,0 L60,0 L60,120 L0,120 Z", fill: false },
  { label: "Billet 2", d: "M0,0 L60,0 L60,120 L0,120 Z", fill: true },
  { label: "Saddle", d: "M0,5 Q30,0 60,5 L60,15 Q30,20 0,15 Z", fill: true },
  { label: "Binding strip", d: "M0,0 L80,0 L80,8 L0,8 Z", fill: false },
  { label: "Rosette ring", d: "M20,20 A20,20 0 1,0 20,19.9 Z", fill: true },
  { label: "Fret", d: "M0,0 L70,0 L70,4 L0,4 Z", fill: false },
  { label: "Bracing strip", d: "M0,0 L90,0 L90,10 L0,10 Z", fill: true },
  { label: "Headstock", d: "M0,0 L80,0 L80,60 Q40,80 0,60 Z", fill: false },
  { label: "Nut", d: "M0,0 L50,0 L50,8 L0,8 Z", fill: true },
  { label: "Panel", d: "M0,0 L160,0 L160,90 L0,90 Z", fill: false },
  { label: "Back plate", d: "M10,0 Q80,-10 150,0 L140,120 Q80,140 20,120 Z", fill: false },
];

export function YieldSection() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<SVGGElement>(null);
  const billetsRef = useRef<SVGGElement>(null);
  const goodsRef = useRef<SVGGElement>(null);
  const caption1Ref = useRef<HTMLParagraphElement>(null);
  const caption2Ref = useRef<HTMLParagraphElement>(null);
  const caption3Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      // State 1 → 2: log splits
      tl.to(logRef.current, { opacity: 0, scale: 0.9, duration: 0.3 })
        .to(caption1Ref.current, { opacity: 0, duration: 0.2 }, "<")
        .fromTo(billetsRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4 })
        .fromTo(caption2Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, "<0.1");

      // State 2 → 3: billets multiply into goods
      tl.to(billetsRef.current, { opacity: 0, duration: 0.3 })
        .to(caption2Ref.current, { opacity: 0, duration: 0.2 }, "<")
        .fromTo(goodsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(caption3Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, "<0.1");

      // Stagger in goods SVG items
      tl.fromTo(
        "#yield-goods rect, #yield-goods path, #yield-goods ellipse",
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        { scale: 1, opacity: 1, stagger: 0.025, duration: 0.5 },
        "<"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  if (prefersReduced) {
    return (
      <section
        id="yield"
        className="section-pad relative"
        style={{ backgroundColor: "transparent" }}
        aria-label="One log, many goods"
      >
        <div className="content-width relative z-10">
          <p className="eyebrow" style={{ marginBottom: "3rem", color: "var(--mill)" }}>Yield</p>
          <div className="flex flex-col gap-16">
            {/* State 1 */}
            <div className="flex flex-col items-center gap-4 text-center glass-panel p-12 rounded-lg">
              <YieldLogSVG />
              <p className="display-3" style={{ color: "var(--mill)" }}>One log.</p>
            </div>
            {/* State 2 */}
            <div className="flex flex-col items-center gap-4 text-center glass-panel p-12 rounded-lg">
              <YieldBilletsSVG />
              <p className="display-3" style={{ color: "var(--mill)" }}>Quartersawn four ways.</p>
            </div>
            {/* State 3 */}
            <div className="flex flex-col items-center gap-4 text-center glass-panel p-12 rounded-lg">
              <YieldGoodsSVG />
              <p className="display-3" style={{ color: "var(--mill)" }}>Nothing left over.</p>
            </div>
          </div>
          <YieldCopy />
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef}>
      <section
        id="yield"
        style={{ backgroundColor: "transparent" }}
        aria-label="One log, many goods"
      >
        <div ref={pinRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <p className="eyebrow absolute top-8 left-1/2 -translate-x-1/2" style={{ color: "var(--mill)", opacity: 0.8 }}>Yield</p>

          <div className="glass-panel" style={{ position: "relative", width: "100%", maxWidth: 700, margin: "0 auto", padding: "4rem", borderRadius: "16px" }}>
            {/* All three states overlaid */}
            <svg
              viewBox="0 0 700 400"
              style={{ width: "100%", height: "auto", display: "block" }}
              aria-hidden="true"
            >
              {/* State 1 — Log */}
              <g ref={logRef}>
                <ellipse cx="350" cy="200" rx="280" ry="100" fill="var(--rosewood)" />
                <ellipse cx="350" cy="200" rx="230" ry="75" fill="none" stroke="var(--brass)" strokeWidth="1.5" />
                <ellipse cx="350" cy="200" rx="170" ry="55" fill="none" stroke="var(--brass)" strokeWidth="1" />
                <ellipse cx="350" cy="200" rx="110" ry="35" fill="none" stroke="var(--brass)" strokeWidth="0.8" />
                <ellipse cx="350" cy="200" rx="50" ry="16" fill="none" stroke="var(--brass)" strokeWidth="0.8" />
                <line x1="70" y1="200" x2="630" y2="200" stroke="var(--brass)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="350" y1="100" x2="350" y2="300" stroke="var(--brass)" strokeWidth="1" strokeDasharray="4 4" />
              </g>

              {/* State 2 — Billets */}
              <g ref={billetsRef} style={{ opacity: 0 }}>
                {[
                  { x: 100, y: 80, w: 220, h: 100, rotate: -5 },
                  { x: 390, y: 80, w: 220, h: 100, rotate: 5 },
                  { x: 100, y: 220, w: 220, h: 100, rotate: 5 },
                  { x: 390, y: 220, w: 220, h: 100, rotate: -5 },
                ].map((b, i) => (
                  <g key={i} transform={`rotate(${b.rotate}, ${b.x + b.w / 2}, ${b.y + b.h / 2})`}>
                    <rect
                      x={b.x}
                      y={b.y}
                      width={b.w}
                      height={b.h}
                      rx="4"
                      fill="var(--rosewood)"
                      opacity="0.85"
                    />
                    <rect
                      x={b.x + 8}
                      y={b.y + 8}
                      width={b.w - 16}
                      height={b.h - 16}
                      rx="2"
                      fill="none"
                      stroke="var(--brass)"
                      strokeWidth="1"
                    />
                  </g>
                ))}
              </g>

              {/* State 3 — Finished goods scatter */}
              <g ref={goodsRef} id="yield-goods" style={{ opacity: 0 }}>
                {FINISHED_GOODS.slice(0, 12).map((item, i) => {
                  const col = i % 4;
                  const row = Math.floor(i / 4);
                  const tx = 80 + col * 140;
                  const ty = 60 + row * 110;
                  const scale = 0.35 + Math.random() * 0.15;
                  return (
                    <g key={i} transform={`translate(${tx}, ${ty}) scale(${scale})`}>
                      <path
                        d={item.d}
                        fill={item.fill ? "var(--rosewood)" : "none"}
                        stroke="var(--ink)"
                        strokeWidth={item.fill ? 0 : 2}
                        opacity="0.85"
                      />
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Captions */}
            <p
              ref={caption1Ref}
              className="display-3 text-center"
              style={{ color: "var(--mill)", marginTop: "1.5rem" }}
            >
              One log.
            </p>
            <p
              ref={caption2Ref}
              className="display-3 text-center absolute bottom-0 inset-x-0"
              style={{ color: "var(--mill)", opacity: 0 }}
            >
              Quartersawn four ways.
            </p>
            <p
              ref={caption3Ref}
              className="display-3 text-center absolute bottom-0 inset-x-0"
              style={{ color: "var(--mill)", opacity: 0 }}
            >
              Nothing left over.
            </p>
          </div>
        </div>
      </section>

      {/* Released content */}
      <section
        className="section-pad"
        style={{ backgroundColor: "transparent" }}
        aria-label="Yield practice"
      >
        <div className="content-width glass-panel" style={{ maxWidth: "60ch", padding: "3rem", borderRadius: "12px" }}>
          <YieldCopy />
        </div>
      </section>
    </div>
  );
}

function YieldLogSVG() {
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", maxWidth: 400, height: "auto" }} aria-hidden="true">
      <ellipse cx="200" cy="100" rx="180" ry="70" fill="var(--rosewood)" />
      <ellipse cx="200" cy="100" rx="140" ry="52" fill="none" stroke="var(--brass)" strokeWidth="1.5" />
      <ellipse cx="200" cy="100" rx="90" ry="34" fill="none" stroke="var(--brass)" strokeWidth="1" />
    </svg>
  );
}

function YieldBilletsSVG() {
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", maxWidth: 400, height: "auto" }} aria-hidden="true">
      {[
        { x: 20, y: 20, w: 170, h: 70, rotate: -3 },
        { x: 210, y: 20, w: 170, h: 70, rotate: 3 },
        { x: 20, y: 110, w: 170, h: 70, rotate: 3 },
        { x: 210, y: 110, w: 170, h: 70, rotate: -3 },
      ].map((b, i) => (
        <g key={i} transform={`rotate(${b.rotate}, ${b.x + b.w / 2}, ${b.y + b.h / 2})`}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" fill="var(--rosewood)" opacity="0.85" />
        </g>
      ))}
    </svg>
  );
}

function YieldGoodsSVG() {
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", maxWidth: 400, height: "auto" }} aria-hidden="true">
      {[
        { x: 20, y: 10, w: 60, h: 140, fill: true, label: "fretboard" },
        { x: 95, y: 40, w: 120, h: 60, fill: false, label: "tabletop" },
        { x: 230, y: 10, w: 40, h: 180, fill: false, label: "neck" },
        { x: 285, y: 20, w: 100, h: 50, fill: true, label: "ply" },
        { x: 285, y: 85, w: 100, h: 50, fill: false, label: "ply2" },
        { x: 20, y: 165, w: 360, h: 12, fill: true, label: "veneer" },
      ].map((item) => (
        <rect
          key={item.label}
          x={item.x}
          y={item.y}
          width={item.w}
          height={item.h}
          rx="2"
          fill={item.fill ? "var(--rosewood)" : "none"}
          stroke="var(--ink)"
          strokeWidth={item.fill ? 0 : 1.5}
          opacity={0.85}
        />
      ))}
    </svg>
  );
}

function YieldCopy() {
  return (
    <p
      className="body-text"
      style={{ color: "var(--mill)", marginTop: "2rem" }}
    >
      Offcuts from furniture stock become instrument parts. A board too narrow
      for a tabletop is exactly right for a fretboard blank. This is why our
      minimum order can be low on small components: the yield is already
      planned across both trades before the log is cut.
    </p>
  );
}
