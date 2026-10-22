"use client";

import { useIntake } from "@/lib/intake/store";
import { StepShell } from "./StepShell";
import { PillChoice } from "./CardChoice";
import { StepNav } from "../StepNav";
import { aestheticOptions, labels } from "@/lib/intake/schema";

const DESCRIPTIONS: Record<(typeof aestheticOptions)[number], string> = {
  "modern-minimal": "Spare, architectural, pared-back",
  "warm-organic": "Tactile, natural, layered",
  "luxury-contemporary": "Refined, considered, expensive",
  transitional: "Timeless, soft, livable",
  "high-end-commercial": "Branded, theatrical, signature",
};

export function StepAesthetic() {
  const draft = useIntake((s) => s.draft);
  const update = useIntake((s) => s.update);
  const next = useIntake((s) => s.next);
  const prev = useIntake((s) => s.prev);

  return (
    <StepShell
      step="aesthetic"
      eyebrow="Aesthetic"
      title={
        <>
          What direction
          <br /> speaks to you?
        </>
      }
      sub="A starting point, not a finish line - Nancy will compose the final palette with you."
    >
      <div className="grid gap-3">
        {aestheticOptions.map((opt) => (
          <PillChoice
            key={opt}
            selected={draft.aesthetic === opt}
            onSelect={() => update({ aesthetic: opt })}
            label={labels.aesthetic[opt]}
            description={DESCRIPTIONS[opt]}
          />
        ))}
      </div>
      <StepNav onBack={prev} onNext={next} disabled={!draft.aesthetic} />
    </StepShell>
  );
}
