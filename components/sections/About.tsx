"use client";

// components/sections/About.tsx
// Warm intro section with profile photo in organic blob shape and 2-3 paragraphs.

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutContent } from "@/lib/content";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-[#17110C]">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <SectionReveal>
          <p className="font-[JetBrains_Mono,monospace] text-xs text-[#93816C] tracking-[0.2em] uppercase mb-12">
            — About me
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Photo */}
          <SectionReveal delay={0.1}>
            <div className="relative mx-auto md:mx-0 w-64 h-72 md:w-80 md:h-96">
              {/* Blob background */}
              <div
                className="absolute -inset-4 opacity-20"
                style={{
                  background: "radial-gradient(ellipse, #E8834D 0%, transparent 70%)",
                  borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                }}
              />
              {/* Photo */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                  border: "2px solid #33261C",
                }}
              >
                <Image
                  src={aboutContent.imageSrc}
                  alt={aboutContent.imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                />
              </div>
              {/* Floating accent dot */}
              <motion.div
                className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#E8834D]"
                animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-2 -left-4 w-4 h-4 rounded-full bg-[#82A788]"
                animate={{ y: [0, 6, 0], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </SectionReveal>

          {/* Text content */}
          <SectionReveal staggerChildren={0.15} delay={0.2}>
            {/* Name callout */}
            <RevealItem>
              <h2
                className="font-[Bricolage_Grotesque,sans-serif] font-bold text-4xl md:text-5xl text-[#F2E6D3] mb-8 leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                {aboutContent.intro}
              </h2>
            </RevealItem>

            {/* Paragraphs */}
            {aboutContent.paragraphs.map((para, i) => (
              <RevealItem key={i}>
                <p className="text-[#93816C] font-[Inter] text-base md:text-lg leading-relaxed mb-5 last:mb-0">
                  {para}
                </p>
              </RevealItem>
            ))}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
