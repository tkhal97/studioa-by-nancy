"use client";

import { useIntake } from "@/lib/intake/store";
import { StepShell } from "./StepShell";
import { CardChoice } from "./CardChoice";
import { StepNav } from "../StepNav";
import { asset } from "@/lib/utils";
import { partners } from "@/lib/content";

const adams = partners[0];

// A custom home by partner Adams Architectural Designs
const RES = asset("/images/partners/adams-custom-home.jpg");
const COM = asset("/images/intake/commercial-hotel.jpg");

export function StepProjectType() {
  const draft = useIntake((s) => s.draft);
  const update = useIntake((s) => s.update);
  const next = useIntake((s) => s.next);

  const selected = draft.projectType;

  return (
    <StepShell
      step="projectType"
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
          badge={
            <span className="flex items-center rounded-full bg-obsidian/35 p-2 backdrop-blur-md">
              <img
                src={adams.logoLight}
                alt={adams.name}
                className="h-6 w-auto"
              />
            </span>
          }
          className="aspect-[16/10]"
        />
        <CardChoice
          selected={selected === "commercial"}
          onSelect={() => update({ projectType: "commercial", rooms: undefined })}
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
