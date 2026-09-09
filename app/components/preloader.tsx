"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps { onComplete: () => void; }

export function Preloader({ onComplete }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const complete = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem("cge-preloaded-v6") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
    }
  }, [onComplete]);

  useGSAP(() => {
    if (!root.current || sessionStorage.getItem("cge-preloaded-v6") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const q = gsap.utils.selector(root);

    // Initial state
    gsap.set(q(".preloader-cut-line"), { scaleY: 0, opacity: 1 });
    gsap.set(q(".preloader-mask-container"), { clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" });
    gsap.set(q(".preloader-brand-title"), { filter: "blur(20px)", opacity: 0, scale: 1.1 });
    gsap.set(q(".preloader-brand-subtitle"), { filter: "blur(10px)", opacity: 0, y: 10 });

    const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    
    timeline
      // 1. Draw the laser/cut line down
      .to(q(".preloader-cut-line"), { scaleY: 1, duration: 1.2, ease: "power4.inOut" })
      // 2. Split the mask horizontally (opening the doors)
      .to(q(".preloader-mask-container"), { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.4, ease: "power4.inOut" }, "-=0.3")
      // Hide the cut line as it splits
      .to(q(".preloader-cut-line"), { opacity: 0, duration: 0.3 }, "-=1.3")
      // 3. Bring text into sharp focus
      .to(q(".preloader-brand-title"), { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, "-=1.0")
      .to(q(".preloader-brand-subtitle"), { filter: "blur(0px)", opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "-=1.2")
      // 4. Hold for a beat to read
      .to({}, { duration: 1.2 })
      // 5. Expand out and dissolve the entire preloader
      .to(q(".preloader-brand-title"), { filter: "blur(10px)", scale: 1.05, opacity: 0, duration: 0.6, ease: "power2.in" })
      .to(q(".preloader-brand-subtitle"), { filter: "blur(5px)", opacity: 0, duration: 0.5, ease: "power2.in" }, "-=0.5")
      .to(root.current, { clipPath: "inset(0 0 100% 0)", opacity: 0, duration: 0.8, ease: "power4.inOut" }, "-=0.2")
      .call(() => {
        if (!complete.current) {
          complete.current = true;
          sessionStorage.setItem("cge-preloaded-v6", "1");
          onComplete();
        }
      });

    return () => timeline.kill();
  }, { scope: root, dependencies: [onComplete] });

  return (
    <div ref={root} className="preloader-root" role="status" aria-label="Preparing Chandy's Global Exports">
      <div className="preloader-stage">
        {/* The glowing vertical cut line */}
        <div className="preloader-cut-line" aria-hidden="true" />
        
        {/* The horizontal mask container */}
        <div className="preloader-mask-container" aria-hidden="true">
          <div className="preloader-brand-title">CGE</div>
          <div className="preloader-brand-subtitle">Materials in Motion</div>
        </div>
      </div>
    </div>
  );
}
