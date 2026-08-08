// components/ui/Badge.tsx
// Skill badge component styled with JetBrains Mono for the tech stack section.

import { cn } from "@/lib/utils";

type BadgeColor = "primary" | "secondary" | "highlight" | "muted";

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
  primary:   "border-[#E8834D]/30 text-[#E8834D] bg-[#E8834D]/8",
  secondary: "border-[#82A788]/30 text-[#82A788] bg-[#82A788]/8",
  highlight: "border-[#E8B94D]/30 text-[#E8B94D] bg-[#E8B94D]/8",
  muted:     "border-[#93816C]/30 text-[#93816C] bg-[#93816C]/8",
};

export function Badge({ label, color = "muted", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-medium tracking-wide",
        "font-[JetBrains_Mono,monospace]",
        colorStyles[color],
        className
      )}
    >
      {label}
    </span>
  );
}
