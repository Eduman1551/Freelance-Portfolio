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
  primary:
    "border-[#E8834D]/30 text-[#E8834D] bg-gradient-to-br from-[#E8834D]/15 to-[#E8834D]/5 hover:shadow-[0_0_12px_rgba(232,131,77,0.4)]",
  secondary:
    "border-[#82A788]/30 text-[#82A788] bg-gradient-to-br from-[#82A788]/15 to-[#82A788]/5 hover:shadow-[0_0_12px_rgba(130,167,136,0.4)]",
  highlight:
    "border-[#E8B94D]/30 text-[#E8B94D] bg-gradient-to-br from-[#E8B94D]/15 to-[#E8B94D]/5 hover:shadow-[0_0_12px_rgba(232,185,77,0.4)]",
  muted:
    "border-[#93816C]/30 text-[#93816C] bg-gradient-to-br from-[#93816C]/15 to-[#93816C]/5 hover:shadow-[0_0_12px_rgba(147,129,108,0.4)]",
};

export function Badge({ label, color = "muted", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-medium tracking-wide",
        "font-[JetBrains_Mono,monospace]",
        "transition-all duration-200 ease-out hover:-translate-y-[2px] hover:scale-[1.03] cursor-default",
        colorStyles[color],
        className
      )}
    >
      {label}
    </span>
  );
}
