"use client";

import { useIntake } from "@/lib/intake/store";
import { StepShell } from "./StepShell";
import { PillChoice } from "./CardChoice";
import { StepNav } from "../StepNav";
import { investmentOptionsFor } from "@/lib/intake/decisionTree";
import { labels } from "@/lib/intake/schema";

const DESC: Record<string, string> = {
  "under-25k": "Furnishing-led, single room or styling",
  "25-75k": "Multiple rooms, light renovation",
  "75-150k": "Full home, architectural detailing",
  "150k-plus": "Full home, bespoke millwork and procurement",
  "under-100k": "Pop-up, branded interior styling",
  "100-250k": "Single floor or boutique commercial",
  "250-500k": "Flagship retail, hospitality concept",
  "500k-plus": "Multi-site, signature commercial design",
  "rather-not-say": "We'll discuss on the consultation",
};

export function StepInvestment() {
  const draft = useIntake((s) => s.draft);
  const update = useIntake((s) => s.update);
  const next = useIntake((s) => s.next);
  const prev = useIntake((s) => s.prev);

  if (!draft.projectType) return null;
  const options = investmentOptionsFor(draft.projectType);

  return (
    <StepShell
      index={3}
      total={8}
      eyebrow="Investment"
      title={
        <>
          What level of investment are
          <br /> you planning for the space?
        </>
      }
      sub={
        draft.projectType === "commercial"
          ? "Commercial engagements scale with footprint, finish level, and procurement complexity."
          : "Residential engagements scale with home size, scope, and finish level."
      }
    >
      <div className="grid gap-3">
        {options.map((opt) => (
          <PillChoice
            key={opt}
            selected={draft.investment === opt}
            onSelect={() => update({ investment: opt })}
            label={labels.investment[opt as keyof typeof labels.investment]}
            description={DESC[opt]}
          />
        ))}
      </div>
      <StepNav onBack={prev} onNext={next} disabled={!draft.investment} />
    </StepShell>
  );
}
