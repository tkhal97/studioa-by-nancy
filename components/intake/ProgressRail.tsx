"use client";

import { motion } from "framer-motion";
import { STEPS, visibleSteps } from "@/lib/intake/decisionTree";
import { useIntake } from "@/lib/intake/store";
import { cn } from "@/lib/utils";

export function ProgressRail({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const labels: Record<(typeof STEPS)[number], string> = {
    projectType: "Project",
    rooms: "Rooms",
    scope: "Scope",
    aesthetic: "Aesthetic",
    investment: "Investment",
    timeline: "Timeline",
    contact: "Contact",
    details: "Details",
    confirmation: "Sent",
  };

  const draft = useIntake((s) => s.draft);
  const steps = visibleSteps(draft);
  // position of the current step among the steps that apply to this draft
  const at = steps.indexOf(STEPS[index]);
  const pct = (at / (steps.length - 1)) * 100;

  return (
    <div
      className={cn(
        "relative flex flex-col items-start gap-6 pl-4",
        className,
      )}
      aria-label="Progress"
    >
      <div className="absolute left-[7px] top-1 bottom-1 w-px bg-ink/15" />
      <motion.div
        className="absolute left-[7px] top-1 w-px bg-ink"
        animate={{ height: `${pct}%` }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: 0 }}
      />
      {steps.map((s, i) => {
        const done = i < at;
        const active = i === at;
        return (
          <div key={s} className="relative flex items-center gap-4 text-caption">
            <span
              className={cn(
                "relative -ml-[5px] inline-block h-[7px] w-[7px] rounded-full border transition-all duration-500",
                active
                  ? "scale-150 border-ink bg-ink"
                  : done
                  ? "border-ink bg-ink"
                  : "border-ink/40 bg-canvas",
              )}
            />
            <span
              className={cn(
                "transition-colors duration-500",
                active ? "text-ink" : done ? "text-ink/70" : "text-ink/35",
              )}
            >
              {String(i + 1).padStart(2, "0")} · {labels[s]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
