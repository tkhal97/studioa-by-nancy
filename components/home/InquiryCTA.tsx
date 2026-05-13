"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useConcierge } from "@/components/intake/ConciergeProvider";
import { Reveal } from "@/components/ui/Reveal";

export function InquiryCTA() {
  const reduce = useReducedMotion();
  const { openConcierge } = useConcierge();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative h-[90svh] min-h-[640px] overflow-hidden">
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80"
          alt="A serene living room bathed in late-afternoon light"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/30 to-obsidian/65" />
      <div className="vignette absolute inset-0 opacity-60" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-canvas">
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-caption text-canvas/70">06 · Begin</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-display mt-8 font-display leading-[0.95]">
              Let&rsquo;s create a space
              <br />
              that feels{" "}
              <span className="italic font-light">uniquely yours.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-[46ch] text-canvas/85">
              Tell us a little about your project and Nancy will personally
              review your inquiry.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() =>
                  openConcierge({ source: "inquiry-cta", intent: "inquire" })
                }
                className="inline-flex items-center gap-3 rounded-full bg-canvas px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-ink transition-all duration-500 hover:tracking-[0.26em]"
              >
                Start Your Project
              </button>
              <button
                onClick={() =>
                  openConcierge({ source: "inquiry-cta", intent: "schedule" })
                }
                className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-obsidian transition-all duration-500 hover:bg-canvas hover:tracking-[0.26em]"
              >
                Schedule Consultation
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
