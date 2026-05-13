"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { process } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const indicatorY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-walnut py-20 text-canvas lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 85% 0%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionHeading
          index="03"
          eyebrow="Process"
          title={
            <span className="text-canvas">
              From <span className="italic font-light">first conversation</span>
              <br /> to final reveal.
            </span>
          }
          intro="Every project moves through eight stages - each one carefully planned, clearly communicated, and managed end-to-end."
          className="[&_h2]:text-canvas [&_p]:text-canvas/75 [&_.text-caption]:text-canvas/60"
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* rail */}
          <div className="relative hidden lg:col-span-1 lg:block">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-canvas/15" />
            <motion.div
              style={reduce ? undefined : { height: indicatorY }}
              className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-canvas"
            />
          </div>

          {/* steps */}
          <ol className="lg:col-span-11 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-24">
            {process.map((step, i) => (
              <motion.li
                key={step.title}
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.6 }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative border-t border-canvas/15 pt-8 transition-colors duration-700 ${
                  active === i ? "border-canvas/50" : ""
                }`}
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs tracking-[0.22em] text-canvas/55">
                    {step.n}
                  </span>
                  <h3 className="text-h3 font-display text-canvas">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-5 max-w-[42ch] text-canvas/75">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
