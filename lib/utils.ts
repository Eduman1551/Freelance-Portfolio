// lib/utils.ts
// Utility functions shared across the portfolio

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes safely, resolving conflicts.
 * Use this wherever conditional class names are needed.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
