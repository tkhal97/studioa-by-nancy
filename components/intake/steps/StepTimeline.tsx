"use client";

import { useIntake } from "@/lib/intake/store";
import { StepShell } from "./StepShell";
import { PillChoice } from "./CardChoice";
import { StepNav } from "../StepNav";
import { labels, timelineOptions } from "@/lib/intake/schema";

const DESC: Record<string, string> = {
  asap: "Studio capacity permitting",
  "1-3-months": "Standard onboarding window",
  "3-6-months": "Considered planning runway",
  "planning-phase": "Researching, gathering inspiration",
};

export function StepTimeline() {
  const draft = useIntake((s) => s.draft);
  const update = useIntake((s) => s.update);
  const next = useIntake((s) => s.next);
  const prev = useIntake((s) => s.prev);

  return (
    <StepShell
      step="timeline"
      eyebrow="Timeline"
      title={
        <>
          When would you
          <br />
          like to begin?
        </>
      }
      sub="The studio takes a small number of projects each year - early planning is always welcome."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {timelineOptions.map((opt) => (
          <PillChoice
            key={opt}
            selected={draft.timeline === opt}
            onSelect={() => update({ timeline: opt })}
            label={labels.timeline[opt]}
            description={DESC[opt]}
          />
        ))}
      </div>
      <StepNav onBack={prev} onNext={next} disabled={!draft.timeline} />
    </StepShell>
  );
}
