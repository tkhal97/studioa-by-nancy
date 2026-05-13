"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  asLink = false,
  /** disable the write-in animation (use for inert previews or e-mail) */
  animate = true,
}: {
  className?: string;
  asLink?: boolean;
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  const inner = (
    <span
      className={cn(
        "font-display inline-flex items-baseline gap-[0.2em] leading-none tracking-[-0.02em] select-none",
        className,
      )}
    >
      <span>
        Studio <span className="italic font-light">A</span> by
      </span>
      <span className="inline-block overflow-hidden pb-[0.1em] align-baseline">
        <motion.span
          initial={
            shouldAnimate
              ? { clipPath: "inset(0 100% -0.25em 0)" }
              : false
          }
          animate={
            shouldAnimate ? { clipPath: "inset(0 0% -0.25em 0)" } : false
          }
          transition={{
            duration: 1.9,
            delay: 0.45,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="font-signature inline-block text-[1.4em] leading-[0.85] tracking-[0.01em]"
        >
          Nancy
        </motion.span>
      </span>
    </span>
  );
  if (asLink)
    return (
      <a href="/" aria-label="Studio A by Nancy - home">
        {inner}
      </a>
    );
  return inner;
}

export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-7 w-7", className)} aria-hidden>
      <circle
        cx="20"
        cy="20"
        r="19"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      <text
        x="50%"
        y="58%"
        textAnchor="middle"
        fontFamily="var(--font-fraunces)"
        fontSize="16"
        fontStyle="italic"
        fontWeight="300"
        fill="currentColor"
      >
        Sa
      </text>
    </svg>
  );
}
