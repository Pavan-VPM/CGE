"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROBLEMS = [
  {
    heading: "…the moisture content arrives wrong and the panel cups in a dry showroom",
    body: "Kiln-dried timber can reabsorb moisture in transit or storage. A panel that left Kodagu at 10 percent can arrive at 16. The face splits. The joint opens. The batch fails.",
  },
  {
    heading: "…the grade in the photo is not the grade in the container",
    body: "Select-grade photographs ship with utility-grade timber underneath. By the time the container is opened, the supplier is unreachable and the deposit is gone.",
  },
  {
    heading: "…the crate fails phytosanitary inspection at the destination port",
    body: "Untreated or incorrectly documented wood is held, fumigated at the importer's cost, or destroyed. The shipment timeline collapses regardless of what was agreed.",
  },
  {
    heading: "…nobody answers after the deposit clears",
    body: "Communication that was daily before payment becomes weekly, then monthly, then nothing. Updates require chasing. Chasing requires time. Time is the one thing a production schedule does not have.",
  },
  {
    heading: "…the MOQ assumes you are a factory, not a workshop",
    body: "A luthier who needs forty fretboard blanks cannot buy a container of four thousand. An MOQ set for industrial buyers excludes the craftspeople who pay the highest price per piece.",
  },
];

export function ProblemSection() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(Boolean);

      // Stack animation: each item slides up over the previous
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 5}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      items.forEach((item, i) => {
        if (i === 0) return; // first item is already visible
        tl.fromTo(
          item,
          { yPercent: 100, opacity: 1 },
          { yPercent: 0, opacity: 1, duration: 1 }
        );
        // Dim previous
        if (items[i - 1]) {
          tl.to(items[i - 1], { opacity: 0.3, duration: 0.5 }, "<0.5");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="sourcing"
      ref={containerRef}
      className="section-pad"
      style={{ backgroundColor: "var(--ink)" }}
      aria-label="The sourcing problem"
    >
      {!prefersReduced ? (
        // Pinned scroll version
        <div ref={pinRef} style={{ minHeight: "100vh", overflow: "hidden", position: "relative" }}>
          <div className="content-width" style={{ paddingBlock: "6rem" }}>
            {/* Eyebrow */}
            <p className="eyebrow" style={{ color: "var(--rosewood)", marginBottom: "1rem" }}>
              Sourcing
            </p>

            {/* Continuing headline */}
            <h2
              className="display-3"
              style={{ color: "var(--mill)", marginBottom: "3rem", maxWidth: "54ch" }}
            >
              Buying wood products from overseas is cheap, until it isn&apos;t
            </h2>

            {/* Stack of items */}
            <div style={{ position: "relative", minHeight: "320px" }}>
              {PROBLEMS.map((problem, i) => (
                <div
                  key={i}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  style={{
                    position: i === 0 ? "relative" : "absolute",
                    inset: 0,
                    paddingBlock: "1rem",
                    borderTop: "1px solid rgba(232,240,251,0.15)",
                  }}
                >
                  <h3
                    className="display-4"
                    style={{ color: "var(--mill)", marginBottom: "0.75rem", maxWidth: "52ch" }}
                  >
                    {problem.heading}
                  </h3>
                  <p
                    className="body-text"
                    style={{ color: "var(--blueprint)", maxWidth: "54ch" }}
                  >
                    {problem.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Hinge line */}
            <p
              className="display-3"
              style={{
                color: "var(--mill)",
                marginTop: "4rem",
                borderTop: "1px solid rgba(232,240,251,0.15)",
                paddingTop: "2rem",
              }}
            >
              Every one of those is a specification problem. So we ship specifications.
            </p>
          </div>
        </div>
      ) : (
        // Reduced motion: plain vertical list
        <div className="content-width" ref={inViewRef}>
          <p className="eyebrow" style={{ color: "var(--rosewood)", marginBottom: "1rem" }}>
            Sourcing
          </p>
          <h2
            className="display-3"
            style={{ color: "var(--mill)", marginBottom: "3rem", maxWidth: "54ch" }}
          >
            Buying wood products from overseas is cheap, until it isn&apos;t
          </h2>
          <div className="flex flex-col gap-0">
            {PROBLEMS.map((problem, i) => (
              <div
                key={i}
                style={{
                  padding: "2rem 0",
                  borderTop: "1px solid rgba(232,240,251,0.2)",
                }}
              >
                <h3
                  className="display-4"
                  style={{ color: "var(--mill)", marginBottom: "0.75rem" }}
                >
                  {problem.heading}
                </h3>
                <p className="body-text" style={{ color: "var(--blueprint)" }}>
                  {problem.body}
                </p>
              </div>
            ))}
          </div>
          <p
            className="display-3"
            style={{
              color: "var(--mill)",
              marginTop: "4rem",
              borderTop: "1px solid rgba(232,240,251,0.2)",
              paddingTop: "2rem",
            }}
          >
            Every one of those is a specification problem. So we ship specifications.
          </p>
        </div>
      )}
    </section>
  );
}
