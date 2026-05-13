"use client";

import { useIntake } from "@/lib/intake/store";
import { StepShell } from "./StepShell";
import { StepNav } from "../StepNav";
import { labels, scopeOptions } from "@/lib/intake/schema";
import { cn } from "@/lib/utils";

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
      index={1}
      total={8}
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
        {scopeOptions.map((opt) => {
          const selected = current.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={cn(
                "group flex w-full items-center justify-between rounded-[2px] border px-5 py-4 text-left transition-all duration-500",
                selected
                  ? "border-ink bg-ink text-canvas"
                  : "border-stone/50 bg-canvas text-ink hover:border-ink/40 hover:bg-linen/50",
              )}
            >
              <span className="font-display text-lg">{labels.scope[opt]}</span>
              <span
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-500",
                  selected
                    ? "border-canvas text-canvas"
                    : "border-stone/60 text-stone",
                )}
              >
                {selected ? (
                  <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M1 5l3.5 3.5L11 1"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
      <StepNav onBack={prev} onNext={next} disabled={current.length === 0} />
    </StepShell>
  );
}
