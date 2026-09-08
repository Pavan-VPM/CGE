"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/content/site";

const NAV_LINKS = [
  { label: "Home.", href: "/" },
  { label: "What we ship.", href: "#trades" },
  { label: "Materials.", href: "#materials" },
  { label: "Process.", href: "#process" },
  { label: "Reach.", href: "#reach" },
];

interface HeaderProps {
  onQuoteOpen: () => void;
}

export function Header({ onQuoteOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all"
        style={{
          height: scrolled ? "56px" : "80px",
          backgroundColor: scrolled ? "var(--ink)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition:
            "height 240ms cubic-bezier(0.25,0,0,1), background-color 240ms cubic-bezier(0.25,0,0,1)",
        }}
      >
        <div
          className="content-width h-full flex items-center justify-between"
        >
          {/* Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 text-white no-underline"
            style={{ fontFamily: "var(--font-family-archivo)", fontWeight: 800 }}
          >
            <svg width="28" height="28" viewBox="0 0 72 72" fill="none" aria-hidden="true">
              <circle cx="36" cy="36" r="32" stroke="currentColor" strokeWidth="2" />
              <ellipse cx="36" cy="36" rx="20" ry="32" stroke="currentColor" strokeWidth="1.5" />
              <ellipse cx="36" cy="36" rx="32" ry="14" stroke="currentColor" strokeWidth="1.5" />
              <line x1="36" y1="4" x2="36" y2="68" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}>
              Chandy&apos;s Global Exports
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white no-underline text-sm transition-opacity hover:opacity-70"
                style={{ fontFamily: "var(--font-family-archivo)", fontWeight: 600 }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onQuoteOpen}
              className="btn btn-primary"
              style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}
            >
              Request a quote
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            ref={menuButtonRef}
            className="lg:hidden text-white p-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: "currentColor",
                marginBottom: 6,
                transition: "transform 0.3s, opacity 0.3s",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: "currentColor",
                marginBottom: 6,
                transition: "opacity 0.3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: "currentColor",
                transition: "transform 0.3s",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 95% 5%)" }}
            animate={{ clipPath: "circle(150% at 95% 5%)" }}
            exit={{ clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-8"
            style={{ backgroundColor: "var(--ink)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  className="display-3 no-underline"
                  style={{ color: "var(--mill)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="btn btn-primary self-start mt-4"
                onClick={() => {
                  setMenuOpen(false);
                  onQuoteOpen();
                }}
              >
                Request a quote
              </motion.button>
            </nav>

            <div className="mt-12 flex flex-col gap-2">
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="body-text no-underline"
                style={{ color: "var(--blueprint)" }}
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="body-text no-underline"
                style={{ color: "var(--blueprint)" }}
              >
                {SITE.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
