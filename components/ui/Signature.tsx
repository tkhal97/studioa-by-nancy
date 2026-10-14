"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  NANCY_INK,
  NANCY_STROKES,
  NANCY_TRACE_EM,
  NANCY_VIEWBOX,
} from "./signature-paths";

type Props = {
  className?: string;
  /** seconds of pen-on-paper time for the whole name, default 3 */
  duration?: number;
  /** delay after entering view, default 0.1 */
  delay?: number;
  /** font-size class; the signature scales with it. Default scales fluidly. */
  size?: string;
};

const [, , VB_W, VB_H] = NANCY_VIEWBOX.split(" ").map(Number);

/** pause between strokes while the pen lifts */
const PEN_LIFT = 0.14;

/** start offset and duration for each stroke at a constant hand speed */
function schedule(duration: number) {
  const total = NANCY_STROKES.reduce((n, s) => n + s.length, 0);
  let at = 0;
  return NANCY_STROKES.map((s, i) => {
    // the last stroke gets a little extra time to decelerate
    const last = i === NANCY_STROKES.length - 1;
    const dur = (duration * s.length) / total + (last ? 0.35 : 0);
    const step = { d: s.d, at, dur, last };
    at += dur + PEN_LIFT;
    return step;
  });
}

/**
 * "Nancy" signed in on viewport entry. A round-capped pen stroke travels the
 * letters' centerline stroke by stroke (with short pen lifts) and reveals the
 * ink through a mask, so the name is written at an even hand speed.
 */
export function Signature({
  className,
  duration = 3,
  delay = 0.1,
  size = "text-[clamp(4rem,7vw,6rem)]",
}: Props) {
  const reduce = useReducedMotion();
  const timeline = schedule(duration);
  const maskId = `sig-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <motion.svg
      viewBox={NANCY_VIEWBOX}
      role="img"
      aria-label="Nancy"
      initial="unsigned"
      whileInView="signed"
      viewport={{ once: true, amount: 0.5 }}
      className={cn("block overflow-visible text-ink/90", size, className)}
      style={{
        height: `${VB_H / NANCY_TRACE_EM}em`,
        width: `${VB_W / NANCY_TRACE_EM}em`,
      }}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {timeline.map(({ d, at, dur, last }) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="#fff"
              strokeWidth={30}
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                // hidden until the pen lands, so the round cap does not show as a dot
                unsigned: { pathLength: reduce ? 1 : 0, opacity: 0 },
                signed: {
                  pathLength: 1,
                  opacity: 1,
                  transition: reduce
                    ? { duration: 0.6 }
                    : {
                        pathLength: {
                          duration: dur,
                          delay: delay + at,
                          // steady hand; the final stroke eases off the page
                          ease: last ? [0.3, 0.05, 0.2, 1] : [0.35, 0.05, 0.65, 0.95],
                        },
                        opacity: { duration: 0, delay: delay + at },
                      },
                },
              }}
            />
          ))}
        </mask>
      </defs>
      <path
        d={NANCY_INK}
        fill="currentColor"
        fillRule="evenodd"
        mask={`url(#${maskId})`}
      />
    </motion.svg>
  );
}
