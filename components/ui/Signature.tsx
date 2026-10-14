"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text?: string;
  className?: string;
  /** seconds, default 2.4 */
  duration?: number;
  /** delay before drawing begins, default 0.3 */
  delay?: number;
  /** size class for the script. Default scales fluidly. */
  size?: string;
};

const PEN = [0.45, 0.05, 0.35, 1] as const;

/**
 * Renders a script-font signature that writes itself in on viewport entry:
 * the pen traces the letter outlines left to right (stroke-dashoffset behind
 * a moving clip edge), then the ink floods in.
 */
export function Signature({
  text = "Nancy",
  className,
  duration = 2.4,
  delay = 0.3,
  size = "text-[clamp(4rem,7vw,6rem)]",
}: Props) {
  const reduce = useReducedMotion();
  const inView = { once: true, amount: 0.6 };

  return (
    <div
      className={cn("relative inline-block leading-none", size, className)}
      role="img"
      aria-label={text}
    >
      {/* invisible placeholder so the container reserves space and doesn't reflow */}
      <span
        aria-hidden
        className="font-signature pointer-events-none select-none px-[0.1em] opacity-0"
      >
        {text}
      </span>

      {reduce ? (
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.6 }}
          className="font-signature absolute inset-0 px-[0.1em] text-ink/90"
        >
          {text}
        </motion.span>
      ) : (
        <motion.svg
          aria-hidden
          initial="hidden"
          whileInView="written"
          viewport={inView}
          className="absolute inset-0 h-full w-full overflow-visible text-ink/90"
        >
          {/* moving clip edge = the pen's position */}
          <motion.text
            x="0.1em"
            y="0.78em"
            className="font-signature"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1.1}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1600"
            variants={{
              hidden: {
                strokeDashoffset: 1600,
                fillOpacity: 0,
                clipPath: "inset(-0.3em 100% -0.4em -0.2em)",
              },
              written: {
                strokeDashoffset: 0,
                fillOpacity: 1,
                clipPath: "inset(-0.3em -0.2em -0.4em -0.2em)",
                transition: {
                  delay,
                  strokeDashoffset: { duration: duration * 1.1, ease: PEN, delay },
                  clipPath: { duration, ease: PEN, delay },
                  fillOpacity: {
                    duration: 0.9,
                    ease: "easeOut",
                    delay: delay + duration * 0.55,
                  },
                },
              },
            }}
          >
            {text}
          </motion.text>
        </motion.svg>
      )}
    </div>
  );
}
