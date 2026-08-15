"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(to right, #E8834D, #E8B94D)",
      }}
    />
  );
}
