"use client";

import { useIntake } from "@/lib/intake/store";
import { StepShell } from "./StepShell";
import { CardChoice } from "./CardChoice";
import { StepNav } from "../StepNav";
import { aestheticOptions, labels } from "@/lib/intake/schema";

const IMAGES: Record<(typeof aestheticOptions)[number], string> = {
  "modern-minimal":
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
  "warm-organic":
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
  "luxury-contemporary":
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  transitional:
    "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
  "high-end-commercial":
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80",
};

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
      index={2}
      total={8}
      eyebrow="Aesthetic"
      title={
        <>
          What direction
          <br /> speaks to you?
        </>
      }
      sub="A starting point, not a finish line - Nancy will compose the final palette with you."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aestheticOptions.map((opt) => (
          <CardChoice
            key={opt}
            selected={draft.aesthetic === opt}
            onSelect={() => update({ aesthetic: opt })}
            title={labels.aesthetic[opt]}
            description={DESCRIPTIONS[opt]}
            image={IMAGES[opt]}
            className="aspect-[4/5]"
          />
        ))}
      </div>
      <StepNav onBack={prev} onNext={next} disabled={!draft.aesthetic} />
    </StepShell>
  );
}
