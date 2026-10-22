"use client";

import { useIntake } from "@/lib/intake/store";
import { StepShell } from "./StepShell";
import { StepNav } from "../StepNav";
import { labels, scopeOptions } from "@/lib/intake/schema";
import { CheckChoice } from "./CardChoice";

export function StepScope() {
  const draft = useIntake((s) => s.draft);
  const update = useIntake((s) => s.update);
  const next = useIntake((s) => s.next);
  const prev = useIntake((s) => s.prev);

  const current = draft.scope ?? [];

  function toggle(v: (typeof scopeOptions)[number]) {
    const set = new Set(current);
    if (set.has(v)) set.delete(v);
    else set.add(v);
    update({ scope: Array.from(set) });
  }

  return (
    <StepShell
      step="scope"
      eyebrow="Scope"
      title={
        <>
          What are you looking
          <br />
          for help with?
        </>
      }
      sub="Choose as many as feel right - Nancy will refine the engagement with you on the consultation."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {scopeOptions.map((opt) => (
          <CheckChoice
            key={opt}
            selected={current.includes(opt)}
            onToggle={() => toggle(opt)}
            label={labels.scope[opt]}
          />
        ))}
      </div>
      <StepNav onBack={prev} onNext={next} disabled={current.length === 0} />
    </StepShell>
  );
}
