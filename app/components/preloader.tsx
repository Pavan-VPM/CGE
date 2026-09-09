"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps { onComplete: () => void; }

export function Preloader({ onComplete }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const complete = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem("cge-preloaded-v2") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) onComplete();
  }, [onComplete]);

  useGSAP(() => {
    if (!root.current || sessionStorage.getItem("cge-preloaded-v2") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const q = gsap.utils.selector(root);
    const progress = { value: 0 };
    const setCopy = (text: string) => {
      if (!copy.current) return;
      const next = document.createElement("span");
      next.className = "preloader-copy-line";
      next.innerHTML = text.replace("\n", "<br />");
      copy.current.appendChild(next);
      const old = Array.from(copy.current.children).slice(0, -1);
      gsap.fromTo(next, { yPercent: 115, filter: "blur(8px)" }, { yPercent: 0, filter: "blur(0px)", duration: 0.72, ease: "power4.out" });
      if (old.length) gsap.to(old, { yPercent: -105, filter: "blur(6px)", opacity: 0, duration: 0.48, ease: "power3.in", overwrite: true });
    };
    const updateCounter = () => { if (counter.current) counter.current.textContent = String(Math.round(progress.value)).padStart(2, "0"); };
    gsap.set(q(".preloader-word"), { yPercent: 110, opacity: 0 });
    gsap.set(q(".preloader-grain"), { opacity: 0, scaleX: 0.76 });
    gsap.set(q(".preloader-grid"), { opacity: 0, rotation: -2 });
    gsap.set(q(".preloader-string"), { opacity: 0, scaleX: 0.2, transformOrigin: "left center" });
    gsap.set(q(".preloader-route"), { strokeDashoffset: 860, opacity: 0 });
    gsap.set(q(".preloader-node"), { scale: 0, transformOrigin: "center" });
    setCopy("SOMETHING\nIS TAKING SHAPE.");
    const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    timeline
      .to(q(".preloader-scan"), { scaleX: 1, duration: 5.25, ease: "none" }, 0.12)
      .to(progress, { value: 24, duration: 1.2, ease: "power2.inOut", onUpdate: updateCounter }, 0)
      .to(q(".preloader-word--origin"), { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out" }, 0.2)
      .to(q(".preloader-grain"), { opacity: 1, scaleX: 1, duration: 1.1, stagger: 0.08 }, 1.04)
      .call(() => setCopy("WOOD"), [], 1.2).to(progress, { value: 47, duration: 1, onUpdate: updateCounter }, 1.2)
      .to(q(".preloader-grid"), { opacity: 0.75, rotation: 0, duration: 1.2, ease: "power4.out" }, 2.04)
      .to(q(".preloader-grain"), { rotation: -5, y: -24, duration: 0.9 }, 2.18)
      .call(() => setCopy("CRAFT"), [], 2.2).to(progress, { value: 68, duration: 1, onUpdate: updateCounter }, 2.2)
      .to(q(".preloader-string"), { opacity: 0.82, scaleX: 1, duration: 0.72, stagger: 0.08, ease: "power4.out" }, 3.02)
      .to(q(".preloader-string"), { keyframes: [{ y: -7 }, { y: 5 }, { y: 0 }], duration: 0.7, stagger: 0.045, ease: "sine.inOut" }, 3.38)
      .call(() => setCopy("SOUND"), [], 3.2).to(progress, { value: 86, duration: 1, onUpdate: updateCounter }, 3.2)
      .to(q(".preloader-route"), { strokeDashoffset: 0, opacity: 1, duration: 1.15, ease: "power2.inOut" }, 4.04)
      .to(q(".preloader-node"), { scale: 1, duration: 0.4, stagger: 0.42, ease: "back.out(2)" }, 4.42)
      .call(() => setCopy("DESTINATION"), [], 4.2).to(progress, { value: 100, duration: 1, onUpdate: updateCounter }, 4.2)
      .call(() => setCopy("THE WORLD\nIS READY."), [], 5.2)
      .to(q(".preloader-word--origin"), { yPercent: -115, opacity: 0, duration: 0.5 }, 5.24)
      .to(q(".preloader-brand"), { yPercent: 0, clipPath: "inset(0 0 0% 0)", duration: 1.05, ease: "power4.out" }, 5.46)
      .to(q(".preloader-brand-detail"), { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power3.out" }, 5.82)
      .to(q(".preloader-exit"), { yPercent: -105, duration: 0.78, ease: "power4.inOut" }, 6.65)
      .call(() => { if (!complete.current) { complete.current = true; sessionStorage.setItem("cge-preloaded-v2", "1"); onComplete(); } });
    return () => timeline.kill();
  }, { scope: root, dependencies: [onComplete] });

  return <div ref={root} className="preloader-root preloader-exit" role="status" aria-label="Preparing Chandy's Global Exports">
    <div className="preloader-noise" aria-hidden="true" />
    <div className="preloader-corner preloader-corner--top">CG / 01°12′N&nbsp;&nbsp;075°46′E</div><div className="preloader-corner preloader-corner--bottom">MATERIAL / MOTION / 2026</div>
    <div className="preloader-visuals" aria-hidden="true">
      <svg className="preloader-grain preloader-grain--one" viewBox="0 0 700 260" fill="none"><path d="M-40 192C85 91 136 259 253 155S421 39 531 129s117 4 218-78" /><path d="M-56 220C66 119 146 291 266 181S421 70 519 156s133 10 246-91" /><path d="M-14 159C90 62 151 220 244 124S414 7 541 101s98 6 180-62" /></svg>
      <svg className="preloader-grain preloader-grain--two" viewBox="0 0 700 260" fill="none"><path d="M-40 192C85 91 136 259 253 155S421 39 531 129s117 4 218-78" /><path d="M-56 220C66 119 146 291 266 181S421 70 519 156s133 10 246-91" /></svg>
      <div className="preloader-grid"><i /><i /><i /><i /><i /><i /></div><div className="preloader-strings"><i className="preloader-string" /><i className="preloader-string" /><i className="preloader-string" /><i className="preloader-string" /></div>
      <svg className="preloader-route-svg" viewBox="0 0 1200 700" fill="none"><path className="preloader-route" d="M69 544C264 636 386 321 568 385c178 63 164-252 522-168" pathLength="860" /><circle className="preloader-node" cx="69" cy="544" r="6" /><circle className="preloader-node" cx="1090" cy="217" r="6" /></svg>
    </div>
    <div className="preloader-content"><div className="preloader-meter"><span ref={counter}>00</span><em>%</em></div><div className="preloader-copy-wrap"><div ref={copy} className="preloader-copy" /></div><div className="preloader-origin"><span className="preloader-word preloader-word--origin">FROM MATERIAL<br />TO MOVEMENT</span></div><div className="preloader-rule"><i className="preloader-scan" /></div></div>
    <div className="preloader-brand" aria-hidden="true"><div>CHANDY’S</div><div>GLOBAL EXPORTS</div><p className="preloader-brand-detail">MANUFACTURERS &amp; EXPORTERS</p><p className="preloader-brand-detail preloader-brand-catalog">GUITAR PARTS&nbsp;&nbsp; / &nbsp;&nbsp;WOODEN FURNITURE&nbsp;&nbsp; / &nbsp;&nbsp;PLYWOOD &amp; VENEERS</p></div>
  </div>;
}
