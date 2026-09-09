"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_STAGES = [
  {
    number: "01",
    title: "Selection",
    description:
      "Standing timber is graded in Kodagu before felling. Species, girth, straightness and freedom from defects are assessed against the order requirements.",
  },
  {
    number: "02",
    title: "Sawmilling",
    description:
      "Quartersawn where the specification calls for it, producing straight-grained stock with maximum dimensional stability and even moisture movement.",
  },
  {
    number: "03",
    title: "Seasoning",
    description:
      "Kiln-dried to the target moisture content for the destination climate. Moisture is checked before and after kiln, and again at packing.",
  },
  {
    number: "04",
    title: "Machining",
    description:
      "Blanks are dimensioned to instrument and furniture tolerances. Thickness, width and squareness are held to the agreed specification.",
  },
  {
    number: "05",
    title: "Finishing",
    description:
      "Sanding and surface preparation to the supplied state specified in the order. Guitar parts are supplied in the machined state unless a finish is agreed.",
  },
  {
    number: "06",
    title: "Grading and QC",
    description:
      "Moisture is re-checked. Defects — checks, shakes, sapwood — are identified and either rejected or disclosed against the agreed tolerance.",
  },
  {
    number: "07",
    title: "Packing",
    description:
      "ISPM-15 heat-treated crates, marked with the phytosanitary mark. Packed to the agreed container loading, with all export documents prepared.",
  },
];

export function ProcessSection() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (prefersReduced || !containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const totalWidth = trackRef.current!.scrollWidth - window.innerWidth;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalWidth + window.innerHeight * 0.5}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          const stageIndex = Math.min(
            PROCESS_STAGES.length - 1,
            Math.floor(self.progress * PROCESS_STAGES.length)
          );
          setActiveStage(stageIndex);
          gsap.set(trackRef.current, {
            x: -self.progress * totalWidth,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  if (prefersReduced) {
    return (
      <section
        id="process"
        className="section-pad"
        style={{ backgroundColor: "var(--mill)" }}
        aria-label="Our process"
      >
        <div className="content-width">
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Process</p>
          <h2 className="display-2" style={{ color: "var(--ink)", marginBottom: "3rem", maxWidth: "20ch" }}>
            Timber to tone
          </h2>
          <div className="flex flex-col gap-8">
            {PROCESS_STAGES.map((stage) => (
              <div key={stage.number} style={{ borderTop: "1px solid var(--blueprint)", paddingTop: "1.5rem" }}>
                <p
                  className="spec"
                  style={{ color: "var(--blueprint)", marginBottom: "0.5rem", fontSize: "1.5rem", fontWeight: 800 }}
                >
                  {stage.number}
                </p>
                <h3 className="display-4" style={{ color: "var(--ink)", marginBottom: "0.5rem" }}>
                  {stage.title}
                </h3>
                <p className="body-text" style={{ color: "var(--ink)", opacity: 0.8 }}>
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      id="process"
      style={{ overflow: "hidden", position: "relative" }}
      aria-label="Our process"
    >
      {/* Progress rail */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "rgba(255,255,255,0.1)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            height: "100%",
            background: "var(--mill)",
            width: `${((activeStage + 1) / PROCESS_STAGES.length) * 100}%`,
            transition: "width 0.3s ease",
            boxShadow: "0 0 12px rgba(255,255,255,0.8)"
          }}
        />
      </div>

      {/* Stage nav */}
      <nav
        aria-label="Process stages"
        style={{
          position: "absolute",
          top: "12px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          zIndex: 10,
          padding: "0 2rem",
          flexWrap: "wrap",
        }}
      >
        {PROCESS_STAGES.map((stage, i) => (
          <button
            key={stage.number}
            aria-current={i === activeStage ? "step" : undefined}
            className="spec"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--mill)",
              opacity: i === activeStage ? 1 : 0.4,
              fontSize: "0.75rem",
              transition: "all 0.3s",
              padding: "0.25rem",
              textShadow: i === activeStage ? "0 0 8px rgba(255,255,255,0.5)" : "none"
            }}
          >
            {stage.title}
          </button>
        ))}
      </nav>

      {/* Horizontal track */}
      <div style={{ minHeight: "100vh", backgroundColor: "transparent", overflow: "hidden" }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            width: `${PROCESS_STAGES.length * 100}vw`,
            height: "100vh",
            paddingTop: "60px",
            willChange: "transform",
          }}
        >
          {PROCESS_STAGES.map((stage) => (
            <div
              key={stage.number}
              id={`stage-${stage.number}`}
              style={{
                width: "100vw",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "clamp(2rem, 6vw, 5rem)",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "transparent",
              }}
            >
              {/* Glass Card */}
              <div 
                className="glass-panel"
                style={{
                  position: "relative",
                  zIndex: 1,
                  maxWidth: "800px",
                  width: "100%",
                  padding: "4rem",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem"
                }}
              >
                {/* Large overlay number */}
                <p
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: "-1rem",
                    top: "-2rem",
                    fontFamily: "var(--font-family-archivo)",
                    fontSize: "clamp(6rem, 15vw, 15rem)",
                    fontWeight: 800,
                    fontVariationSettings: '"wdth" 125',
                    color: "rgba(255,255,255,0.05)",
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                    letterSpacing: "-0.06em",
                  }}
                >
                  {stage.number}
                </p>

                <h2 className="display-2" style={{ color: "var(--mill)", margin: 0, textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
                  {stage.title}
                </h2>
                <p className="lede" style={{ color: "var(--mill)", opacity: 0.9, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
