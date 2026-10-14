"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LOGO_BYLINE_PATH,
  LOGO_FULL_HEIGHT,
  LOGO_MARK_HEIGHT,
  LOGO_MARK_PATH,
  LOGO_WIDTH,
} from "./logo-paths";

/**
 * The Studio A by Nancy logo, drawn in `currentColor` and sized by font-size
 * (use text-* classes). `full` is the complete lockup with "by nancy";
 * `mark` is "studio a" alone for compact spots where the byline would be
 * too small to read.
 */
export function Wordmark({
  className,
  variant = "full",
  asLink = false,
  /** disable the reveal animation (use for inert previews or e-mail) */
  animate = true,
}: {
  className?: string;
  variant?: "full" | "mark";
  asLink?: boolean;
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;
  const full = variant === "full";
  const height = full ? LOGO_FULL_HEIGHT : LOGO_MARK_HEIGHT;
  // full lockup is 3em tall; the mark alone is 1.5em
  const em = full ? 3 : 1.5;

  const logo = (
    <motion.svg
      viewBox={`0 0 ${LOGO_WIDTH} ${height}`}
      role="img"
      aria-label="Studio A by Nancy"
      initial={shouldAnimate ? { clipPath: "inset(0 100% 0 0)" } : false}
      animate={shouldAnimate ? { clipPath: "inset(0 0% 0 0)" } : undefined}
      transition={{ duration: 1.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
      className={cn("block shrink-0 select-none", className)}
      style={{ height: `${em}em`, width: `${(em * LOGO_WIDTH) / height}em` }}
    >
      <g fill="currentColor" fillRule="evenodd">
        <path d={LOGO_MARK_PATH} />
        {full && <path d={LOGO_BYLINE_PATH} />}
      </g>
    </motion.svg>
  );

  if (asLink)
    return (
      <Link href="/" aria-label="Studio A by Nancy - home">
        {logo}
      </Link>
    );
  return logo;
}
