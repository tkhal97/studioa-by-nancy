"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useConcierge } from "@/components/intake/ConciergeProvider";
import { projects } from "@/lib/content";

// Nancy's own work: the Dreamworks Dental lounge
const heroPhoto = projects.find((p) => p.slug === "dreamworks-dental")!.cover;

export function Hero() {
  const reduce = useReducedMotion();
  const { openConcierge } = useConcierge();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 160]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.08]);
  const overlay = useTransform(scrollY, [0, 600], [0.35, 0.55]);

  const headline = [
    "Refined",
    "interiors,",
    "designed",
    "for",
    "real",
    "life.",
  ];

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-obsidian text-canvas">
      <motion.div
        style={reduce ? undefined : { y, scale }}
        className="absolute inset-0"
      >
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { opacity: overlay }}
        className="absolute inset-0 bg-gradient-to-b from-obsidian/45 via-obsidian/25 to-obsidian/95"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-obsidian/70 via-obsidian/25 to-transparent" />
      <div className="absolute inset-0 vignette opacity-60" />

      {/* top label rail */}
      <div className="absolute inset-x-0 top-24 z-10 flex items-center justify-between px-5 text-caption text-canvas/70 sm:top-28 sm:px-6 lg:px-10">
        <span className="hidden sm:inline">
          Studio · Interior Design · Concierge
        </span>
        <span className="hidden md:inline">N 45° 31′ · W 122° 40′</span>
        <span>Portland, Oregon</span>
      </div>

      {/* headline */}
      <div className="relative z-10 flex h-full flex-col items-start justify-end px-5 pb-20 sm:px-6 sm:pb-32 lg:px-10 lg:pb-40">
        <h1 className="text-display max-w-[14ch] font-display text-canvas">
          {headline.map((w, i) => (
            <span
              key={i}
              className="mr-[0.25em] inline-block overflow-hidden align-baseline"
            >
              <motion.span
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.6 + i * 0.08,
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {i === 4 ? <span className="italic font-light">{w}</span> : w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-[46ch] text-base text-canvas/80 sm:text-lg"
        >
          A Portland-based interior design studio crafting refined homes and
          considered commercial spaces - every project led personally by Nancy,
          from first conversation to final reveal.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap"
        >
          <button
            onClick={() => openConcierge({ source: "hero", intent: "inquire" })}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-canvas px-7 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-ink transition-all duration-500 hover:tracking-[0.26em] sm:w-auto"
          >
            <span>Start Your Project</span>
            <svg
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              <path
                d="M1 5h16M12 1l5 4-5 4"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </button>
          <Link
            href="/portfolio"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-canvas/40 px-7 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-canvas transition-all duration-500 hover:bg-canvas hover:text-ink sm:w-auto"
          >
            <span>View Portfolio</span>
          </Link>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-caption text-canvas/65 md:flex"
      >
        <span>Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-canvas/20">
          <motion.span
            className="absolute inset-x-0 top-0 block h-4 bg-canvas"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  );
}
