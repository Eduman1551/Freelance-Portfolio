"use client";

// components/sections/Projects.tsx
// Horizontal scroll-snap project card gallery with prev/next buttons,
// hover image scale overlay, and dot indicator.

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionReveal>
              <p className="font-[JetBrains_Mono,monospace] text-xs text-[#93816C] tracking-[0.2em] uppercase mb-4">
                — Projects
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2
                className="font-[Bricolage_Grotesque,sans-serif] font-bold text-4xl md:text-5xl text-[#F2E6D3] leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                Selected Work.
              </h2>
            </SectionReveal>
          </div>

          {/* Prev/Next buttons */}
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



        {/* Card track */}
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
            <ProjectCard
              key={project.id}
              project={project}
              isHovered={hoveredId === project.id}
              onHover={() => setHoveredId(project.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>

        {/* Dot indicator */}
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

// ─── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  isHovered,
  onHover,
  onLeave,
}: {
  project: (typeof projects)[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      className="flex-shrink-0 w-[85vw] max-w-[500px] rounded-2xl overflow-hidden bg-[#2A1F15] border border-[#33261C] cursor-none"
      style={{ scrollSnapAlign: "start" }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-cursor-hover
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Image area */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          className="w-full h-full"
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 85vw, 500px"
          />
        </motion.div>

        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(23, 17, 12, 0.7)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <a
                href={project.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8834D] text-[#17110C] font-medium font-[Inter] text-sm"
              >
                View project <ArrowUpRight size={16} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Year tag */}
        <div className="absolute top-3 right-3">
          <span className="font-[JetBrains_Mono,monospace] text-xs text-[#93816C] bg-[#17110C]/80 px-2 py-1 rounded-md">
            {project.year}
          </span>
        </div>
      </div>

      {/* Card body */}
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
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} color="muted" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
