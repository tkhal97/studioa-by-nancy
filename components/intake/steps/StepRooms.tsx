"use client";

import { useIntake } from "@/lib/intake/store";
import { StepShell } from "./StepShell";
import { CheckChoice } from "./CardChoice";
import { StepNav } from "../StepNav";
import { labels, roomOptions } from "@/lib/intake/schema";

export function StepRooms() {
  const draft = useIntake((s) => s.draft);
  const update = useIntake((s) => s.update);
  const next = useIntake((s) => s.next);
  const prev = useIntake((s) => s.prev);

  const current = draft.rooms ?? [];

  function toggle(v: (typeof roomOptions)[number]) {
    const set = new Set(current);
    if (set.has(v)) set.delete(v);
    else set.add(v);
    update({ rooms: Array.from(set) });
  }

  return (
    <StepShell
      step="rooms"
      eyebrow="Rooms"
      title={
        <>
          Which rooms are
          <br /> we designing?
        </>
      }
      sub="Pick every space that's part of the project."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {roomOptions.map((opt) => (
          <CheckChoice
            key={opt}
            selected={current.includes(opt)}
            onToggle={() => toggle(opt)}
            label={labels.rooms[opt]}
          />
        ))}
      </div>
      <StepNav onBack={prev} onNext={next} disabled={current.length === 0} />
    </StepShell>
  );
}
