"use client";

// components/ui/CustomCursor.tsx
// Custom circular cursor that scales up and changes color on interactive elements.
// Hidden on touch devices (pointer: coarse). Hidden entirely if reduced motion preferred.

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Don't render on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    // Smooth cursor position with rAF
    const updatePos = () => {
      setPos((prev) => {
        const dx = cursorRef.current.x - prev.x;
        const dy = cursorRef.current.y - prev.y;
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) return prev;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      rafRef.current = requestAnimationFrame(updatePos);
    };

    rafRef.current = requestAnimationFrame(updatePos);
    window.addEventListener("mousemove", onMouseMove);

    // Attach hover listeners to interactive elements
    const addListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [data-cursor-hover], input, textarea, select, label"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    addListeners();
    // Re-run after a tick so dynamically rendered elements are captured
    const timer = setTimeout(addListeners, 500);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border mix-blend-difference"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering ? "#E8834D" : "#F2E6D3",
          borderWidth: 1.5,
          opacity: isVisible ? 1 : 0,
          translateX: pos.x - (isHovering ? 24 : 16),
          translateY: pos.y - (isHovering ? 24 : 16),
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          width: isHovering ? 6 : 5,
          height: isHovering ? 6 : 5,
          backgroundColor: isHovering ? "#E8834D" : "#F2E6D3",
          opacity: isVisible ? 1 : 0,
          translateX: pos.x - (isHovering ? 3 : 2.5),
          translateY: pos.y - (isHovering ? 3 : 2.5),
          transition: "background-color 0.3s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
}
