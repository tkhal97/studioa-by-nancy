"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useIntake, useStepPosition } from "@/lib/intake/store";
import { adaptiveConfirmationCopy } from "@/lib/intake/decisionTree";
import { useConcierge } from "../ConciergeProvider";
import { CalendarEmbed } from "../CalendarEmbed";

export function StepConfirmation() {
  const draft = useIntake((s) => s.draft);
  const reset = useIntake((s) => s.reset);
  const { intent, closeConcierge } = useConcierge();
  const copy = adaptiveConfirmationCopy(draft);
  const position = useStepPosition("confirmation");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full flex-col items-start gap-10"
    >
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <svg viewBox="0 0 64 64" className="h-16 w-16 text-accent">
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
          />
          <motion.path
            d="M19 33 L29 43 L46 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
          />
        </svg>
      </motion.div>

      <div>
        <div className="text-caption text-clay">
          {String(position.total).padStart(2, "0")} · Sent
        </div>
        <h2 className="text-h2 mt-4 max-w-[16ch] font-display leading-[1.05]">
          {copy.title}
        </h2>
        <p className="mt-6 max-w-[52ch] text-body">{copy.body}</p>
      </div>

      {intent === "schedule" && (
        <div className="w-full">
          <p className="text-caption text-clay">Or - choose a time directly</p>
          <div className="mt-4">
            <CalendarEmbed />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/portfolio"
          onClick={closeConcierge}
          className="inline-flex items-center gap-3 rounded-full border border-ink/30 px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-ink transition-all duration-500 hover:bg-ink hover:text-canvas"
        >
          Browse Portfolio
        </Link>
        <button
          onClick={() => {
            reset();
            closeConcierge();
          }}
          className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-canvas transition-all duration-500 hover:bg-obsidian"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}
