"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NAV_LINKS = [
  { label: "What we ship", href: "#trades" },
  { label: "Materials", href: "#materials" },
  { label: "Process", href: "#process" },
];

interface HeaderProps {
  onQuoteOpen: () => void;
}

export function Header({ onQuoteOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // The stamp rotates continuously as you scroll, and gently dissolves once scrolling into the story
  const rotateStamp = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const stampOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  useEffect(() => {
    function onScroll() {
      // Compress nav after scrolling down a bit (e.g., past the hero section)
      setScrolled(window.scrollY > 200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* 1. Top Edge Seal (The 1px Hairline) */}
      <div 
        className="fixed top-0 inset-x-0 z-[100] pointer-events-none" 
        style={{ height: "1px", backgroundColor: "var(--brass)", opacity: 0.8 }} 
      />
      
      {/* 2. The Spine Label (Rotated Logo) */}
      <div 
        className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-left z-50 pointer-events-none mix-blend-difference"
      >
        <p 
          className="spec" 
          style={{ 
            color: "var(--mill)", 
            whiteSpace: "nowrap", 
            letterSpacing: "0.2em",
            fontSize: "0.65rem" 
          }}
        >
          CG / EXPORTS — FIELD MANIFEST
        </p>
      </div>

      {/* 3. The Rotating Customs Stamp */}
      <motion.div 
        className="fixed top-8 left-6 md:left-12 z-50 pointer-events-none mix-blend-difference hidden md:block"
        style={{ rotate: rotateStamp, opacity: stampOpacity, color: "var(--brass)" }}
      >
        <svg width="64" height="64" viewBox="0 0 100 100">
           {/* Outer dashed ring */}
           <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
           {/* Inner solid ring */}
           <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
           {/* Crosshairs */}
           <line x1="50" y1="2" x2="50" y2="10" stroke="currentColor" strokeWidth="1" />
           <line x1="50" y1="90" x2="50" y2="98" stroke="currentColor" strokeWidth="1" />
           <line x1="2" y1="50" x2="10" y2="50" stroke="currentColor" strokeWidth="1" />
           <line x1="90" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="1" />
           {/* Text Path */}
           <path id="text-curve" d="M 16 50 a 34 34 0 1 1 68 0 a 34 34 0 1 1 -68 0" fill="transparent" />
           <text fontSize="8" fill="currentColor" letterSpacing="0.1em" style={{ fontFamily: "monospace", textTransform: "uppercase" }}>
             <textPath href="#text-curve" startOffset="50%" textAnchor="middle">
               INSPECTED & VERIFIED · QUALITY ASSURANCE ·
             </textPath>
           </text>
        </svg>
      </motion.div>

      {/* 4. Die-cut Corner Tab ("Start a Brief") */}
      <button 
        onClick={onQuoteOpen}
        className="fixed top-0 right-4 md:right-8 z-50 bg-[var(--brass)] text-[var(--ink)] px-2.5 py-4 transition-transform duration-200 hover:translate-y-1 cursor-pointer outline-none shadow-md"
        style={{ 
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), 50% 100%, 0 calc(100% - 10px))",
          minHeight: "96px",
        }}
        aria-label="Start a brief"
      >
        <span 
          className="spec block" 
          style={{ 
            writingMode: "vertical-rl", 
            textOrientation: "mixed",
            letterSpacing: "0.2em",
            fontSize: "0.62rem",
            fontWeight: 700,
            transform: "rotate(180deg)"
          }}
        >
          START A BRIEF
        </span>
      </button>

      {/* 5. Manifest Navigation (Stacked Vertical Index - side-by-side with tab) */}
      <nav 
        className="fixed top-4 md:top-5 right-18 md:right-22 z-50 flex flex-col items-end gap-2 hidden md:flex"
        aria-label="Manifest Index"
      >
        {/* Editorial Index Eyebrow & Rule */}
        <div className="flex items-center gap-2 mb-1 opacity-60">
          <span 
            style={{ 
              fontFamily: "var(--font-ibm-plex-mono, monospace)",
              fontSize: "0.55rem",
              letterSpacing: "0.22em",
              color: "var(--brass)",
              textTransform: "uppercase",
            }}
          >
            INDEX
          </span>
          <div style={{ width: "24px", height: "1px", backgroundColor: "var(--brass)", opacity: 0.4 }} />
        </div>

        {NAV_LINKS.map((link, index) => (
          <NavItem 
            key={link.href} 
            link={link} 
            index={index + 1} 
            scrolled={scrolled} 
          />
        ))}
      </nav>
    </>
  );
}

function NavItem({ link, index, scrolled }: { link: any, index: number, scrolled: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Show full label if we are hovered OR if we are NOT scrolled (top of page)
  const isExpanded = isHovered || !scrolled;

  return (
    <a 
      href={link.href}
      className="flex items-center gap-2.5 group no-underline transition-colors duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontFamily: "var(--font-ibm-plex-mono, monospace)",
        fontSize: "0.68rem",
        letterSpacing: "0.12em",
      }}
    >
      {/* Expandable Label */}
      <motion.span
        initial={false}
        animate={{ 
          width: isExpanded ? "auto" : 0, 
          opacity: isExpanded ? 1 : 0 
        }}
        style={{ 
          overflow: "hidden", 
          whiteSpace: "nowrap",
          color: isHovered ? "var(--brass)" : "rgba(242, 244, 247, 0.85)",
          textTransform: "uppercase",
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {link.label}
      </motion.span>
      
      {/* Subtle Separator */}
      <motion.span
        initial={false}
        animate={{ 
          width: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 0.3 : 0 
        }}
        style={{ 
          overflow: "hidden",
          color: "var(--mill)",
        }}
        transition={{ duration: 0.2 }}
      >
        —
      </motion.span>

      {/* Number Index */}
      <span
        style={{ 
          color: isHovered ? "var(--brass)" : "rgba(201, 160, 92, 0.75)",
          fontVariantNumeric: "tabular-nums",
          fontWeight: 600,
        }}
      >
        0{index}
      </span>
    </a>
  );
}
