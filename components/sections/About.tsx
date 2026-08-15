"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { aboutContent } from "@/lib/content";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-[#17110C]">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <p className="font-[JetBrains_Mono,monospace] text-xs text-[#93816C] tracking-[0.2em] uppercase mb-12">
            — About me
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            ref={imgRef}
            style={{ y }}
            className="relative mx-auto md:mx-0 w-64 h-72 md:w-80 md:h-96"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="absolute -inset-4 opacity-20"
              style={{
                background: "radial-gradient(ellipse, #E8834D 0%, transparent 70%)",
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              }}
            />
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
          </motion.div>

          <SectionReveal staggerChildren={0.15} delay={0.2}>
            <RevealItem>
              <motion.h2
                className="font-[Bricolage_Grotesque,sans-serif] font-bold text-4xl md:text-5xl text-[#F2E6D3] mb-8 leading-tight"
                style={{ letterSpacing: "-0.02em" }}
                variants={clipReveal}
              >
                {aboutContent.intro}
              </motion.h2>
            </RevealItem>

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
