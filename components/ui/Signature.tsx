"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text?: string;
  className?: string;
  /** seconds, default 2.2 */
  duration?: number;
  /** delay before drawing begins, default 0.3 */
  delay?: number;
  /** size class for the script. Default scales fluidly. */
  size?: string;
};

/**
 * Renders a script-font signature that "writes itself in" on viewport entry.
 * Uses a clip-path inset reveal — the closest cross-browser equivalent to
 * SVG stroke-dasharray for arbitrary text, with no manual pathwork.
 */
export function Signature({
  text = "Nancy",
  className,
  duration = 2.2,
  delay = 0.3,
  size = "text-[clamp(4rem,7vw,6rem)]",
}: Props) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative inline-block leading-none", className)}>
      {/* invisible placeholder so the container reserves space and doesn't reflow */}
      <span
        aria-hidden
        className={cn(
          "font-signature pointer-events-none select-none opacity-0",
          size,
        )}
      >
        {text}
      </span>

      <motion.span
        initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 100% -0.2em 0)" }}
        whileInView={
          reduce
            ? { opacity: 1 }
            : { clipPath: "inset(0 0% -0.2em 0)" }
        }
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: reduce ? 0.4 : duration,
          ease: [0.65, 0, 0.35, 1],
          delay: reduce ? 0 : delay,
        }}
        className={cn(
          "font-signature absolute inset-0 text-ink/90",
          size,
        )}
        aria-label={text}
      >
        {text}
      </motion.span>
    </div>
  );
}
