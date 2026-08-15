"use client";

import { motion, type Variants, useMotionValue, useSpring } from "framer-motion";
import { heroLines, heroTagline } from "@/lib/content";

const colorMap: Record<string, string> = {
  text:      "#F2E6D3",
  primary:   "#E8834D",
  secondary: "#82A788",
  muted:     "#93816C",
};

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const line: Variants = {
  hidden: { opacity: 0, y: 80, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
};

const supportVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number], delay: 1.1 },
  },
};

const ctaVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number], delay: 1.35 },
  },
};

function MagneticButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className="px-8 py-4 text-lg rounded-xl bg-[#E8834D] text-[#17110C] font-medium font-[Inter] transition-colors duration-200 hover:bg-[#E8B94D] cursor-none"
      data-cursor-hover
    >
      {children}
    </motion.button>
  );
}

export function Hero() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #E8834D 0%, transparent 50%), radial-gradient(circle at 80% 20%, #82A788 0%, transparent 40%)",
        }}
      />

      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="overflow-hidden"
          variants={container}
          initial="hidden"
          animate="visible"
          aria-label="Building confident websites for small biz."
        >
          {heroLines.map((l, i) => (
            <div key={i} className="overflow-hidden leading-none">
              <motion.span
                className="block"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "clamp(3.5rem, 11vw, 9rem)",
                  fontWeight: l.weight === "bold" ? 700 : 400,
                  fontStyle: l.style === "italic" ? "italic" : "normal",
                  color: colorMap[l.color],
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
                variants={line}
              >
                {l.text}
              </motion.span>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 max-w-xl text-[#93816C] font-[Inter] text-base md:text-lg leading-relaxed"
          variants={supportVariant}
          initial="hidden"
          animate="visible"
        >
          {heroTagline}
        </motion.p>

        <motion.div
          className="mt-10"
          variants={ctaVariant}
          initial="hidden"
          animate="visible"
        >
          <MagneticButton onClick={scrollToProjects}>See my work</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
