"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { SITE } from "@/content/site";

interface MaterialsSectionProps {
  onQuoteOpen: () => void;
}

export function MaterialsSection({ onQuoteOpen }: MaterialsSectionProps) {
  const prefersReduced = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);

  if (SITE.species.length === 0) {
    return (
      <section
        id="materials"
        className="section-pad relative"
        style={{ backgroundColor: "transparent" }}
        aria-label="Materials"
      >
        <div className="content-width relative z-10" style={{ textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem", color: "var(--mill)", opacity: 0.8 }}>Materials</p>
          <h2 className="display-2" style={{ color: "var(--mill)", marginBottom: "2rem", textShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>
            The sample book
          </h2>
          <div
            className="glass-panel"
            style={{
              padding: "3rem 2rem",
              maxWidth: "400px",
              margin: "0 auto",
              borderRadius: "8px"
            }}
          >
            <p
              className="display-4"
              style={{ color: "var(--mill)", marginBottom: "1rem" }}
            >
              Sample book in preparation
            </p>
            <p className="body-text" style={{ color: "var(--mill)", opacity: 0.8, marginBottom: "1.5rem" }}>
              We are photographing our current stock. In the meantime, contact
              us with the species and dimensions you need.
            </p>
            <button onClick={onQuoteOpen} className="btn glass-panel" style={{ color: "var(--mill)", border: "1px solid rgba(255,255,255,0.2)" }}>
              Ask about a species
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Full sample book — shown when species data exists
  return (
    <section
      id="materials"
      className="section-pad relative"
      style={{ backgroundColor: "transparent" }}
      aria-label="Materials sample book"
    >
      <div className="content-width relative z-10">
        <p className="eyebrow" style={{ marginBottom: "1rem", color: "var(--mill)", opacity: 0.8 }}>Materials</p>
        <h2 className="display-2" style={{ color: "var(--mill)", marginBottom: "3rem", textShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>
          The sample book
        </h2>

        <div className="flex gap-4 flex-wrap">
          {SITE.species.map((species, i) => (
            <button
              key={species.id}
              onClick={() => setSelected(selected === i ? null : i)}
              className="text-left"
              aria-expanded={selected === i}
              style={{
                flex: "0 0 auto",
                width: "180px",
                background: "var(--mill)",
                border: selected === i ? "2px solid var(--rosewood)" : "1px solid transparent",
                borderRadius: "4px",
                padding: "1.5rem 1rem",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
            >
              <p
                className="display-4"
                style={{ color: "var(--rosewood)", marginBottom: "0.25rem", fontSize: "1rem" }}
              >
                {species.commonName}
              </p>
              <p className="spec" style={{ color: "var(--ink)", opacity: 0.6 }}>
                {species.thicknessRangeMm[0]}–{species.thicknessRangeMm[1]}mm
              </p>
            </button>
          ))}
        </div>

        {selected !== null && SITE.species[selected] && (
          <div
            style={{
              marginTop: "2rem",
              padding: "2rem",
              background: "var(--mill)",
              borderRadius: "4px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
          >
            <div>
              <p className="display-3" style={{ color: "var(--ink)", marginBottom: "0.25rem" }}>
                {SITE.species[selected].commonName}
              </p>
              <p className="body-text" style={{ color: "var(--rosewood)", marginBottom: "1rem", fontStyle: "italic" }}>
                {SITE.species[selected].botanicalName}
              </p>
              <p className="body-text" style={{ color: "var(--ink)", marginBottom: "1.5rem" }}>
                {SITE.species[selected].uses}
              </p>
            </div>
            <div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {[
                    ["Origin", SITE.species[selected].origin],
                    ["Thickness", `${SITE.species[selected].thicknessRangeMm[0]}–${SITE.species[selected].thicknessRangeMm[1]}mm`],
                    ["Sheet sizes", SITE.species[selected].sheetSizes.join(", ")],
                    SITE.species[selected].coreType
                      ? ["Core", SITE.species[selected].coreType!]
                      : null,
                    ["CITES", SITE.species[selected].isCITES ? "Restricted — ask us" : "Not restricted"],
                  ]
                    .filter((x): x is [string, string] => Boolean(x))
                    .map(([label, value]) => (
                      <tr key={label} style={{ borderBottom: "1px solid var(--blueprint)" }}>
                        <td className="spec" style={{ padding: "0.5rem 0", color: "var(--ink)", opacity: 0.6, width: "40%" }}>
                          {label}
                        </td>
                        <td className="spec" style={{ padding: "0.5rem 0", color: "var(--ink)" }}>
                          {value}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
