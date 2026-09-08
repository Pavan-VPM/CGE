"use client";

import { SITE } from "@/content/site";

interface ProprietorSectionProps {
  onQuoteOpen: () => void;
}

export function ProprietorSection({ onQuoteOpen }: ProprietorSectionProps) {
  return (
    <section
      id="about"
      className="section-pad"
      style={{ backgroundColor: "var(--ink)" }}
      aria-label="About the proprietor"
    >
      <div className="content-width">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 6vw, 6rem)",
            alignItems: "center",
          }}
        >
          {/* Portrait / Initials */}
          <div>
            <div
              style={{
                width: "100%",
                paddingBottom: "120%",
                position: "relative",
                background: "rgba(27,110,243,0.12)",
                borderRadius: "2px",
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
                }}
              >
                <span
                  className="display-1"
                  style={{
                    color: "var(--blueprint)",
                    opacity: 0.5,
                    fontSize: "clamp(5rem, 14vw, 12rem)",
                  }}
                  aria-hidden="true"
                >
                  SC
                </span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2
              className="display-2"
              style={{ color: "var(--mill)", marginBottom: "0.25rem" }}
            >
              {SITE.proprietor}
            </h2>
            <p
              className="body-text"
              style={{ color: "var(--blueprint)", marginBottom: "2rem" }}
            >
              Proprietor
            </p>

            <p
              className="lede"
              style={{ color: "var(--mill)", opacity: 0.9, marginBottom: "2rem" }}
            >
              I have been working with the timbers of the Western Ghats for
              over two decades. Every order that leaves Kodagu carries my
              signature on the grading report. If the moisture is wrong, you
              call me directly. If the grade is not what you ordered, we fix
              it. That is the only way a proprietorship works.
            </p>

            <div className="flex flex-col gap-2">
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="body-text no-underline"
                style={{ color: "var(--signal)" }}
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="body-text no-underline"
                style={{ color: "var(--signal)" }}
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="display-3"
          style={{
            color: "var(--mill)",
            marginTop: "4rem",
            borderTop: "1px solid rgba(232,240,251,0.15)",
            paddingTop: "2rem",
          }}
        >
          People, products, partnerships, worldwide.
        </p>
      </div>
    </section>
  );
}
