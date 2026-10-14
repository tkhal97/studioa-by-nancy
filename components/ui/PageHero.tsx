"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type HeroPanel = {
  src: string;
  alt: string;
  /** small mono caption under the photo, e.g. "Plate 03 · Woven Warmth" */
  caption: string;
};

export function PageHero({
  eyebrow,
  title,
  intro,
  meta,
  panel,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  meta?: ReactNode;
  /** terracotta color block with an arched photo on the right side */
  panel?: HeroPanel;
}) {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "relative px-5 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-10 lg:pb-20 lg:pt-40",
        panel && "mb-12 overflow-hidden pb-0 sm:pb-0 lg:mb-20 lg:min-h-[640px]",
      )}
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn("flex flex-col gap-6", panel && "lg:max-w-[54%]")}
        >
          {eyebrow && (
            <div className="flex items-center gap-3 text-caption">
              {panel && (
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-terracotta" />
              )}
              {eyebrow}
            </div>
          )}
          <h1
            className={cn(
              "text-h1 max-w-[18ch] font-display",
              panel && "[&_.italic]:text-terracotta",
            )}
          >
            {title}
          </h1>
          {intro && (
            <p className="max-w-[58ch] text-body">{intro}</p>
          )}
          {meta && <div className="mt-2 text-caption text-clay">{meta}</div>}
        </motion.div>
      </div>

      {panel ? (
        <>
          <div className="mx-auto mt-16 hidden max-w-[1440px] lg:block">
            <div className="hairline max-w-[54%]" />
          </div>
          <TerracottaPanel panel={panel} reduce={!!reduce} />
        </>
      ) : (
        <div className="mx-auto mt-16 max-w-[1440px]">
          <div className="hairline" />
        </div>
      )}
    </section>
  );
}

function TerracottaPanel({
  panel,
  reduce,
}: {
  panel: HeroPanel;
  reduce: boolean;
}) {
  return (
    <motion.aside
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)" }}
      animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0 0%)" }}
      transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
      className={cn(
        "relative -mx-5 mt-12 flex items-center justify-center overflow-hidden px-6 py-14 text-canvas sm:-mx-6",
        // starts at the fixed header's bottom edge so the glass header stays clean
        "lg:absolute lg:bottom-0 lg:right-0 lg:top-20 lg:mx-0 lg:mt-0 lg:w-[42%] lg:px-10 lg:py-14 xl:w-[40%]",
      )}
      style={{
        background:
          "radial-gradient(120% 70% at 15% 0%, var(--color-terracotta-soft), transparent 60%), linear-gradient(165deg, var(--color-terracotta) 30%, var(--color-terracotta-deep))",
      }}
    >
      {/* film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* concentric arcs echoing the arched frame */}
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -bottom-40 -right-40 h-[34rem] w-[34rem] text-canvas/15"
      >
        {[80, 120, 160, 200].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeWidth="0.75" />
        ))}
      </svg>

      <span
        aria-hidden
        className="absolute bottom-16 left-6 hidden rotate-180 font-mono text-[10px] uppercase tracking-[0.3em] text-canvas/60 [writing-mode:vertical-rl] lg:block"
      >
        Portland · Oregon
      </span>

      <figure className="relative w-[min(52%,12rem)] lg:w-[min(52%,17rem)]">
        <div className="relative rounded-t-full border border-canvas/35 p-2.5">
          <motion.div
            initial={reduce ? false : { scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-terracotta-deep"
          >
            <Image
              src={panel.src}
              alt={panel.alt}
              fill
              priority
              sizes="(min-width: 1024px) 20rem, 60vw"
              className="object-cover"
            />
          </motion.div>
        </div>
        <figcaption className="mt-5 flex items-center justify-center gap-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-canvas/85">
          <span aria-hidden className="h-px w-6 shrink-0 bg-canvas/40" />
          {panel.caption}
          <span aria-hidden className="h-px w-6 shrink-0 bg-canvas/40" />
        </figcaption>
      </figure>
    </motion.aside>
  );
}
