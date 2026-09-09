"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/content/site";

interface ComplianceSectionProps {
  onQuoteOpen: () => void;
}

export function ComplianceSection({ onQuoteOpen }: ComplianceSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const c = SITE.compliance;

  const rows = [
    { label: "Moisture content at dispatch", value: c.moistureContentAtDispatch },
    { label: "Grading standard", value: c.gradingStandard },
    { label: "Phytosanitary treatment", value: c.phytosanitaryTreatment },
    { label: "Packing specification", value: c.packingSpec },
    { label: "Documents issued", value: c.documentsIssued.join(", ") },
    { label: "Incoterms offered", value: (c.incotermsOffered as readonly string[]).join(", ") },
    { label: "Lead time from confirmed order", value: c.leadTimeDays ? `${c.leadTimeDays} days` : "" },
    { label: "IEC number", value: SITE.iecNumber },
    { label: "GST number", value: SITE.gstNumber },
  ];

  return (
    <section
      id="compliance"
      className="section-pad relative"
      style={{ backgroundColor: "transparent" }}
      aria-label="Compliance and certification"
    >
      <div className="content-width relative z-10 glass-panel" style={{ padding: "4rem", borderRadius: "16px" }}>
        <p className="eyebrow" style={{ marginBottom: "1rem", color: "var(--mill)", opacity: 0.8 }}>Compliance</p>
        <h2
          className="display-2"
          style={{ color: "var(--mill)", marginBottom: "3rem", maxWidth: "22ch", textShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
        >
          Specification sheet
        </h2>

        {/* Compliance table */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            borderTop: "1px solid var(--blueprint)",
          }}
        >
          {rows.map((row, i) => (
            <div
              key={row.label}
              style={{
                gridColumn: "1 / -1",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                borderBottom: "1px solid var(--blueprint)",
                padding: "0.875rem 0",
              }}
            >
              <p
                className="spec"
                style={{
                  color: "var(--ink)",
                  opacity: 0.6,
                  fontSize: "0.75rem",
                  paddingRight: "1rem",
                }}
              >
                {row.label}
              </p>
              {row.value ? (
                <p className="spec" style={{ color: "var(--ink)", fontSize: "0.875rem" }}>
                  {row.value}
                </p>
              ) : (
                <button
                  onClick={onQuoteOpen}
                  className="spec text-left"
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--signal)",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "0.875rem",
                    padding: 0,
                  }}
                >
                  Confirm with us
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ marginTop: "2rem" }}>
          {SITE.certifications.length === 0 ? (
            <p className="body-text" style={{ color: "var(--ink)", opacity: 0.6 }}>
              Certification details on request.
            </p>
          ) : (
            <div className="flex gap-4 flex-wrap">
              {SITE.certifications.map((cert) => (
                <div
                  key={cert.name}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "1px solid var(--blueprint)",
                    borderRadius: "2px",
                  }}
                >
                  <p className="spec" style={{ color: "var(--ink)", fontSize: "0.875rem" }}>
                    {cert.name}
                  </p>
                  {cert.number && (
                    <p className="spec" style={{ color: "var(--ink)", opacity: 0.5, fontSize: "0.7rem" }}>
                      {cert.standard} {cert.number}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FAQ Accordion */}
        <div style={{ marginTop: "4rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>Questions buyers ask</p>

          <div role="list">
            {SITE.faqs.map((faq, i) => (
              <div
                key={i}
                role="listitem"
                style={{ borderTop: "1px solid var(--blueprint)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.25rem 0",
                    textAlign: "left",
                    gap: "1rem",
                  }}
                >
                  <span
                    className="display-4"
                    style={{ color: "var(--ink)", fontSize: "1.1rem" }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      color: "var(--rosewood)",
                      transition: "transform 0.3s",
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>

                <motion.div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  initial={false}
                  animate={{
                    height: openFaq === i ? "auto" : 0,
                    opacity: openFaq === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0, 0, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    className="body-text"
                    style={{
                      color: "var(--ink)",
                      paddingBottom: "1.5rem",
                      opacity: 0.85,
                    }}
                  >
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--blueprint)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
