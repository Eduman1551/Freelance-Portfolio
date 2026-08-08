"use client";

// components/sections/MarqueeBand.tsx
// Infinite horizontal scrolling text marquee band.
// Pure CSS animation — seamless loop, pauses on hover, gradient masked edges.

import { marqueeWords } from "@/lib/content";

export function MarqueeBand() {
  // Duplicate content to ensure it fills the screen and seamlessly loops.
  const repeatedWords = Array(12).fill(marqueeWords).flat();

  return (
    <div
      className="relative w-full overflow-hidden py-5 border-y border-[#33261C] bg-[#17110C] group"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap w-max hover:[animation-play-state:paused]"
        style={{ animation: "marquee 40s linear infinite" }}
      >
        <div className="flex">
          {repeatedWords.map((word, idx) => (
            <div key={`m1-${idx}`} className="flex items-center">
              <span className="font-[JetBrains_Mono,monospace] text-sm text-[#93816C] tracking-wider transition-all duration-300 hover:scale-110 hover:text-[#E8834D] hover:drop-shadow-[0_0_8px_rgba(232,131,77,0.8)] px-4">
                {word}
              </span>
              <div className="w-1 h-1 bg-[#E8834D] rounded-full animate-pulse opacity-60" />
            </div>
          ))}
        </div>
        <div className="flex">
          {repeatedWords.map((word, idx) => (
            <div key={`m2-${idx}`} className="flex items-center">
              <span className="font-[JetBrains_Mono,monospace] text-sm text-[#93816C] tracking-wider transition-all duration-300 hover:scale-110 hover:text-[#E8834D] hover:drop-shadow-[0_0_8px_rgba(232,131,77,0.8)] px-4">
                {word}
              </span>
              <div className="w-1 h-1 bg-[#E8834D] rounded-full animate-pulse opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
