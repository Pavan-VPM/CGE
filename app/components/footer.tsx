"use client";

import Link from "next/link";
import { SITE } from "@/content/site";

const NAV_LINKS = [
  { label: "Home.", href: "/" },
  { label: "What we ship.", href: "#trades" },
  { label: "Materials.", href: "#materials" },
  { label: "Process.", href: "#process" },
  { label: "Reach.", href: "#reach" },
  { label: "Compliance.", href: "#compliance" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "transparent", color: "var(--mill)" }}
      aria-label="Site footer"
    >
      <div className="content-width" style={{ paddingBlock: "4rem" }}>
        <div
          className="glass-panel"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "3rem",
            padding: "3rem",
            borderRadius: "12px",
          }}
        >
          {/* Brand + taglines */}
          <div>
            <div
              className="flex items-center gap-2"
              style={{ marginBottom: "1.5rem" }}
            >
              <svg width="24" height="24" viewBox="0 0 72 72" fill="none" aria-hidden="true">
                <circle cx="36" cy="36" r="32" stroke="currentColor" strokeWidth="2" />
                <ellipse cx="36" cy="36" rx="20" ry="32" stroke="currentColor" strokeWidth="1.5" />
                <ellipse cx="36" cy="36" rx="32" ry="14" stroke="currentColor" strokeWidth="1.5" />
                <line x1="36" y1="4" x2="36" y2="68" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span
                style={{
                  fontFamily: "var(--font-family-archivo)",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                }}
              >
                {SITE.name}
              </span>
            </div>

            <p
              className="body-text"
              style={{ color: "var(--blueprint)", marginBottom: "0.5rem", fontSize: "0.9rem" }}
            >
              {SITE.taglines[1]}
            </p>
            <p
              className="body-text"
              style={{ color: "var(--blueprint)", fontSize: "0.9rem" }}
            >
              {SITE.taglines[2]}
            </p>

            {(SITE.iecNumber || SITE.gstNumber) && (
              <p
                className="spec"
                style={{
                  color: "var(--blueprint)",
                  opacity: 0.5,
                  marginTop: "1rem",
                  fontSize: "0.7rem",
                }}
              >
                {SITE.iecNumber && `IEC: ${SITE.iecNumber}`}
                {SITE.iecNumber && SITE.gstNumber && " · "}
                {SITE.gstNumber && `GST: ${SITE.gstNumber}`}
              </p>
            )}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p
              className="eyebrow"
              style={{ color: "var(--brass)", marginBottom: "1rem" }}
            >
              Navigation
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="body-text no-underline transition-opacity hover:opacity-70"
                    style={{ color: "var(--blueprint)", fontSize: "0.9rem" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address style={{ fontStyle: "normal" }}>
            <p
              className="eyebrow"
              style={{ color: "var(--brass)", marginBottom: "1rem" }}
            >
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="body-text no-underline"
                style={{ color: "var(--blueprint)", fontSize: "0.9rem" }}
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="body-text no-underline"
                style={{ color: "var(--blueprint)", fontSize: "0.9rem" }}
              >
                {SITE.email}
              </a>
              <a
                href={SITE.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="body-text no-underline"
                style={{ color: "var(--blueprint)", fontSize: "0.9rem" }}
              >
                {SITE.address.line1}
                <br />
                {SITE.address.city}, {SITE.address.state} {SITE.address.pin}
                <br />
                {SITE.address.country}
              </a>
            </div>
          </address>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(232,240,251,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            className="spec"
            style={{ color: "var(--blueprint)", opacity: 0.5, fontSize: "0.7rem" }}
          >
            © {year} {SITE.name}. Sole proprietorship.
          </p>
          <p
            className="spec"
            style={{ color: "var(--blueprint)", opacity: 0.5, fontSize: "0.7rem" }}
          >
            {SITE.address.city}, {SITE.address.state}, India
          </p>
        </div>
      </div>
    </footer>
  );
}
