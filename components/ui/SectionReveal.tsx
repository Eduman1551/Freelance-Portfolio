"use client";

// components/ui/SectionReveal.tsx
// Reusable scroll-triggered reveal wrapper using Framer Motion.
// Wraps children in a fade + upward translate animation on viewport entry.
// Supports staggering child elements via `staggerChildren` prop.

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Stagger children animations by this interval (seconds) */
  staggerChildren?: number;
  /** Y offset for the slide-up animation (px) */
  yOffset?: number;
  /** Amount of element that must be in view to trigger (0–1) */
  threshold?: number;
  /** Only animate once */
  once?: boolean;
}

const containerVariants = (stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
});

const itemVariants = (yOffset: number, delay: number): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number], delay },
  },
});

export function SectionReveal({
  children,
  className,
  delay = 0,
  staggerChildren = 0,
  yOffset = 40,
  threshold = 0.1,
  once = true,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  if (staggerChildren > 0) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={containerVariants(staggerChildren)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={itemVariants(yOffset, delay)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual item component to be used as a child of SectionReveal
 * when staggerChildren is enabled.
 */
export function RevealItem({
  children,
  className,
  yOffset = 40,
}: {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={itemVariants(yOffset, 0)}
    >
      {children}
    </motion.div>
  );
}
