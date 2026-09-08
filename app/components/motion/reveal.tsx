"use client";

import { useInView } from "react-intersection-observer";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const prefersReduced = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0, 0, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
