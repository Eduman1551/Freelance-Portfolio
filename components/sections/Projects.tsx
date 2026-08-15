"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { SectionReveal } from "@/components/ui/SectionReveal";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[index] as HTMLElement;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveIndex(index);
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(projects.length - 1, activeIndex + 1));

  return (
    <section id="projects" className="py-24 md:py-32 px-6 bg-[#17110C]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p
              className="font-[JetBrains_Mono,monospace] text-xs text-[#93816C] tracking-[0.2em] uppercase mb-4"
              variants={headingVariants}
            >
              — Projects
            </motion.p>
            <motion.h2
              className="font-[Bricolage_Grotesque,sans-serif] font-bold text-4xl md:text-5xl text-[#F2E6D3] leading-tight"
              style={{ letterSpacing: "-0.02em" }}
              variants={headingVariants}
            >
              Selected Work.
            </motion.h2>
          </motion.div>

          <SectionReveal delay={0.15}>
            <div className="flex gap-3">
              <motion.button
                className="w-10 h-10 rounded-full border border-[#33261C] flex items-center justify-center text-[#93816C] hover:border-[#E8834D] hover:text-[#E8834D] transition-colors cursor-none"
                onClick={prev}
                disabled={activeIndex === 0}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous project"
                data-cursor-hover
                style={{ opacity: activeIndex === 0 ? 0.4 : 1 }}
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                className="w-10 h-10 rounded-full border border-[#33261C] flex items-center justify-center text-[#93816C] hover:border-[#E8834D] hover:text-[#E8834D] transition-colors cursor-none"
                onClick={next}
                disabled={activeIndex === projects.length - 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next project"
                data-cursor-hover
                style={{ opacity: activeIndex === projects.length - 1 ? 0.4 : 1 }}
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </SectionReveal>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-6"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onScroll={(e) => {
            const el = e.currentTarget;
            const cardWidth = el.scrollWidth / projects.length;
            setActiveIndex(Math.round(el.scrollLeft / cardWidth));
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="cursor-none transition-all duration-300"
              aria-label={`Go to project ${i + 1}`}
              data-cursor-hover
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === i ? 24 : 8,
                  height: 8,
                  backgroundColor: activeIndex === i ? "#E8834D" : "#33261C",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      visible: true,
    });
  }, []);

  const tagVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };
  const tagItem: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative flex-shrink-0 w-[85vw] max-w-[500px] rounded-2xl overflow-hidden bg-[#2A1F15] border border-[#33261C] cursor-none"
      style={{ scrollSnapAlign: "start" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setSpotlight((s) => ({ ...s, visible: false })); }}
      onMouseMove={handleMouseMove}
      data-cursor-hover
      whileHover={{ y: -6, borderColor: "#E8834D40" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {spotlight.visible && (
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(240px circle at ${spotlight.x}% ${spotlight.y}%, rgba(232,131,77,0.08) 0%, transparent 70%)`,
          }}
        />
      )}

      <div className="relative h-64 overflow-hidden">
        <motion.div
          className="w-full h-full"
          animate={{ scale: isHovered ? 1.07 : 1 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 85vw, 500px"
          />
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{ background: "rgba(23, 17, 12, 0.72)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <motion.a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8834D] text-[#17110C] font-medium font-[Inter] text-sm"
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                View project <ArrowUpRight size={16} />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-3 right-3 z-20">
          <span className="font-[JetBrains_Mono,monospace] text-xs text-[#93816C] bg-[#17110C]/80 px-2 py-1 rounded-md">
            {project.year}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3
          className="font-[Bricolage_Grotesque,sans-serif] font-semibold text-xl text-[#F2E6D3] mb-2 leading-snug"
          style={{ letterSpacing: "-0.01em" }}
        >
          {project.name}
        </h3>
        <p className="text-sm text-[#93816C] font-[Inter] mb-4 leading-relaxed">
          {project.description}
        </p>
        <motion.div
          className="flex flex-wrap gap-2"
          variants={tagVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
        >
          {project.tags.map((tag) => (
            <motion.div key={tag} variants={tagItem}>
              <Badge label={tag} color="muted" />
            </motion.div>
          ))}
        </motion.div>
        {!isHovered && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} label={tag} color="muted" />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
