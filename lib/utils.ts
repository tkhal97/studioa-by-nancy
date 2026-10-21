import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://studioabynancy.com";

/**
 * Path to a file in /public, prefixed with the deploy base path. Next adds
 * the base path to links and imported images, but not to plain string src.
 */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

export const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "";

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const [a, b, c] = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6)];
  if (digits.length > 6) return `(${a}) ${b}-${c}`;
  if (digits.length > 3) return `(${a}) ${b}`;
  if (digits.length > 0) return `(${a}`;
  return "";
}
