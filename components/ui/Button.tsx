"use client";

// components/ui/Button.tsx
// Reusable button component matching the Kin design system.
// Supports primary (terracotta), secondary (ghost), and outline variants.

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonAsAnchor extends ButtonBaseProps {
  href: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  external?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#E8834D] text-[#17110C] font-medium hover:bg-[#E8B94D] active:scale-[0.97]",
  secondary:
    "bg-[#2A1F15] text-[#F2E6D3] border border-[#33261C] hover:border-[#E8834D] hover:text-[#E8834D] active:scale-[0.97]",
  ghost:
    "bg-transparent text-[#F2E6D3] hover:text-[#E8834D] active:scale-[0.97]",
  outline:
    "bg-transparent text-[#E8834D] border border-[#E8834D] hover:bg-[#E8834D] hover:text-[#17110C] active:scale-[0.97]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-[Inter] transition-all duration-200 cursor-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        data-cursor-hover
      >
        {children}
      </motion.a>
    );
  }

  const { disabled, type } = rest as ButtonAsButton;

  return (
    <motion.button
      className={classes}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      type={type ?? "button"}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      data-cursor-hover
    >
      {children}
    </motion.button>
  );
}
