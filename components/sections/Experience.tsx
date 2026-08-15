"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/content";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 bg-[#17110C]">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <p className="font-[JetBrains_Mono,monospace] text-xs text-[#93816C] tracking-[0.2em] uppercase mb-4">
            — Experience
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2
            className="font-[Bricolage_Grotesque,sans-serif] font-bold text-4xl md:text-5xl text-[#F2E6D3] mb-16 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Where I&apos;ve worked.
          </h2>
        </SectionReveal>

        <SectionReveal staggerChildren={0.12}>
          <div className="relative flex flex-col gap-0">
            <div
              className="absolute left-[7px] top-3 bottom-3 w-px"
              style={{ background: "linear-gradient(to bottom, #E8834D40, #33261C)" }}
            />
            {experience.map((entry) => (
              <RevealItem key={entry.id}>
                <ExperienceCard entry={entry} />
              </RevealItem>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function ExperienceCard({ entry }: { entry: (typeof experience)[0] }) {
  return (
    <motion.div
      className="relative pl-10 pb-12 last:pb-0 group"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div
        className="absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-2 flex-shrink-0 transition-colors duration-200 group-hover:border-[#E8834D]"
        style={{
          borderColor: entry.status === "ongoing" ? "#E8834D" : "#93816C",
          backgroundColor: entry.status === "ongoing" ? "#E8834D22" : "#17110C",
        }}
      />

      <div className="bg-[#2A1F15]/60 border border-[#33261C] rounded-xl p-5 group-hover:border-[#E8834D]/30 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3
              className="font-[Bricolage_Grotesque,sans-serif] font-semibold text-lg text-[#F2E6D3] leading-snug"
              style={{ letterSpacing: "-0.01em" }}
            >
              {entry.title}
            </h3>
            <p className="font-[Inter] text-sm text-[#E8834D] mt-0.5">{entry.org}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {entry.status === "ongoing" && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82A788] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#82A788]" />
              </span>
            )}
            <span className="font-[JetBrains_Mono,monospace] text-xs text-[#93816C] tracking-wide">
              {entry.duration}
            </span>
          </div>
        </div>
        <p className="font-[Inter] text-sm text-[#93816C] leading-relaxed">
          {entry.description}
        </p>
      </div>
    </motion.div>
  );
}
