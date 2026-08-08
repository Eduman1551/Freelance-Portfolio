"use client";

// components/sections/HowIWork.tsx
// 4-step process section — clean timeline aimed at non-technical small business owners.

import { processSteps } from "@/lib/content";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

export function HowIWork() {
  return (
    <section id="process" className="py-24 md:py-32 px-6 bg-[#2A1F15]">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <SectionReveal>
          <p className="font-[JetBrains_Mono,monospace] text-xs text-[#93816C] tracking-[0.2em] uppercase mb-4">
            — How I Work
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2
            className="font-[Bricolage_Grotesque,sans-serif] font-bold text-4xl md:text-5xl text-[#F2E6D3] mb-16 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Simple process,
            <br />
            <span className="text-[#E8834D]">real results.</span>
          </h2>
        </SectionReveal>

        {/* Steps grid — horizontal on desktop, vertical on mobile */}
        <SectionReveal staggerChildren={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-0">
            {processSteps.map((step, index) => (
              <RevealItem key={step.number}>
                <ProcessStep step={step} index={index} total={processSteps.length} />
              </RevealItem>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  total,
}: {
  step: (typeof processSteps)[0];
  index: number;
  total: number;
}) {
  return (
    <div className="relative flex flex-col md:flex-col">
      {/* Connector line (desktop: horizontal, mobile: vertical) */}
      <div className="flex items-start md:flex-col">
        {/* Number circle */}
        <div className="relative z-10 flex-shrink-0">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-[JetBrains_Mono,monospace] text-sm font-medium"
            style={{
              backgroundColor: "#E8834D",
              color: "#17110C",
            }}
          >
            {step.number}
          </div>
        </div>

        {/* Connector line */}
        {index < total - 1 && (
          <>
            {/* Desktop: horizontal line to the right */}
            <div
              className="hidden md:block flex-1 h-px mt-6 mx-4"
              style={{ background: "linear-gradient(to right, #E8834D, #33261C)" }}
            />
            {/* Mobile: vertical line downward */}
            <div
              className="md:hidden w-px flex-1 mx-6 my-2"
              style={{
                background: "linear-gradient(to bottom, #E8834D, #33261C)",
                minHeight: "40px",
              }}
            />
          </>
        )}
      </div>

      {/* Step content */}
      <div className="pl-6 pb-12 md:pl-0 md:pb-0 md:pt-8 md:pr-6">
        <h3
          className="font-[Bricolage_Grotesque,sans-serif] font-semibold text-xl text-[#F2E6D3] mb-3"
          style={{ letterSpacing: "-0.01em" }}
        >
          {step.title}
        </h3>
        <p className="text-sm text-[#93816C] font-[Inter] leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
