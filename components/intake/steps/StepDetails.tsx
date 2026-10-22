"use client";

import { useIntake } from "@/lib/intake/store";
import { StepShell } from "./StepShell";
import { StepNav } from "../StepNav";

export function StepDetails({ onSubmit }: { onSubmit: () => void }) {
  const draft = useIntake((s) => s.draft);
  const update = useIntake((s) => s.update);
  const prev = useIntake((s) => s.prev);
  const submitting = useIntake((s) => s.submitting);
  const error = useIntake((s) => s.error);

  return (
    <StepShell
      step="details"
      eyebrow="The Vision"
      title={
        <>
          Tell Nancy about your
          <br /> space and your vision.
        </>
      }
      sub="Inspirations, constraints, the feeling you want to walk into - anything you'd share with a designer in conversation."
    >
      <div className="flex flex-col gap-6">
        <label className="block">
          <span className="sr-only">Your vision</span>
          <textarea
            value={draft.details ?? ""}
            onChange={(e) => update({ details: e.target.value })}
            placeholder="A short paragraph is perfect. Mention the rooms, the lifestyle, the mood, and anything important about the space…"
            rows={6}
            className="block w-full resize-none rounded-[2px] border border-stone/60 bg-canvas/60 p-5 text-base leading-relaxed text-ink outline-none transition-colors focus:border-ink"
          />
        </label>

        <div className="rounded-[2px] border border-dashed border-stone/60 bg-canvas/40 p-6">
          <p className="text-caption">Optional · Inspiration & Plans</p>
          <p className="mt-3 text-sm leading-relaxed text-ink/75">
            Have floor plans, photos of the space, or Pinterest boards? Reply
            to Nancy&rsquo;s email with them attached - she&rsquo;ll be in touch
            once your inquiry comes through.
          </p>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-[2px] border border-terracotta/40 bg-terracotta/5 px-4 py-3 text-sm text-terracotta-deep"
        >
          {error}
        </p>
      )}

      <StepNav
        onBack={prev}
        onNext={onSubmit}
        loading={submitting}
        nextLabel="Send Inquiry"
      />
    </StepShell>
  );
}
