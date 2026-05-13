"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** Two-digit chapter number, e.g. "02" */
  index: string;
  /** Eyebrow of the section about to appear, e.g. "Services" */
  label: string;
  /** Tone for the transition band. Defaults to "canvas" — choose to match the
   * section that follows so the divider blends into its destination. */
  tone?: "canvas" | "linen" | "walnut";
};

const TONE_BG: Record<NonNullable<Props["tone"]>, string> = {
  canvas: "bg-canvas",
  linen: "bg-linen/60",
  walnut: "bg-walnut",
};

const TONE_FG: Record<NonNullable<Props["tone"]>, string> = {
  canvas: "text-ink",
  linen: "text-ink",
  walnut: "text-canvas",
};

const TONE_RULE: Record<NonNullable<Props["tone"]>, string> = {
  canvas: "bg-stone/60",
  linen: "bg-stone/70",
  walnut: "bg-canvas/30",
};

const TONE_NUMERAL: Record<NonNullable<Props["tone"]>, string> = {
  canvas: "text-ink/[0.07]",
  linen: "text-ink/[0.08]",
  walnut: "text-canvas/[0.09]",
};

/**
 * Editorial chapter-break that sits between homepage sections.
 *
 * Visual: a generous band of negative space with a tiny mono "chapter" line
 * (small index → drawn hairline → eyebrow of the next section) anchored
 * inside an oversized faded numeral that ghosts behind. The hairline draws
 * left → right on entry, with a brass mid-segment that arrives last.
 */
export function SectionTransition({ index, label, tone = "canvas" }: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      aria-hidden
      className={`relative isolate overflow-hidden ${TONE_BG[tone]} ${TONE_FG[tone]}`}
    >
      {/* Oversized ghost numeral */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          className={`font-display font-light leading-none ${TONE_NUMERAL[tone]} text-[clamp(8rem,22vw,18rem)] tracking-[-0.04em]`}
        >
          {index}
        </span>
      </motion.div>

      {/* Chapter line */}
      <div className="relative mx-auto flex max-w-[1440px] items-center gap-6 px-6 py-20 lg:gap-10 lg:px-10 lg:py-24">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-clay"
        >
          Chapter {index}
        </motion.span>

        {/* base hairline */}
        <span className={`relative h-px flex-1 overflow-hidden ${TONE_RULE[tone]}`}>
          {/* brass fill that draws across */}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ transformOrigin: "left center" }}
            className="absolute inset-0 bg-accent"
          />
        </span>

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.35,
          }}
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-clay"
        >
          {label}
        </motion.span>
      </div>
    </section>
  );
}
