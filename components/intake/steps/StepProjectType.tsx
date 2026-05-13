"use client";

import { useIntake } from "@/lib/intake/store";
import { StepShell } from "./StepShell";
import { CardChoice } from "./CardChoice";
import { StepNav } from "../StepNav";

const RES =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80";
const COM =
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80";

export function StepProjectType() {
  const draft = useIntake((s) => s.draft);
  const update = useIntake((s) => s.update);
  const next = useIntake((s) => s.next);

  const selected = draft.projectType;

  return (
    <StepShell
      index={0}
      total={8}
      eyebrow="Project Type"
      title={
        <>
          What kind of project
          <br /> are you planning?
        </>
      }
      sub="The studio works on both private homes and commercial spaces. Let us know where you'd like to start."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <CardChoice
          selected={selected === "residential"}
          onSelect={() => update({ projectType: "residential" })}
          title="Residential"
          description="Homes, apartments, second residences"
          image={RES}
          className="aspect-[16/10]"
        />
        <CardChoice
          selected={selected === "commercial"}
          onSelect={() => update({ projectType: "commercial" })}
          title="Commercial"
          description="Hospitality, retail, workspace"
          image={COM}
          className="aspect-[16/10]"
        />
      </div>
      <StepNav
        hideBack
        onNext={next}
        disabled={!selected}
        nextLabel="Continue"
      />
    </StepShell>
  );
}
