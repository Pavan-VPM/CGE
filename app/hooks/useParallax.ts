"use client";

import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

type ParallaxOptions = {
  /** How far (in px) to shift on the Y axis over the element's scroll range. Default: [-80, 80] */
  yRange?: [number, number];
};

export function useParallax(options?: ParallaxOptions): {
  ref: React.RefObject<HTMLElement | HTMLDivElement | null>;
  y: MotionValue<number>;
  progress: MotionValue<number>;
} {
  const ref = useRef<HTMLElement & HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRange = options?.yRange ?? [80, -80];
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return { ref, y, progress: scrollYProgress };
}
