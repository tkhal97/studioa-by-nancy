"use client";

import { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  index,
  title,
  intro,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {(eyebrow || index) && (
        <Reveal>
          <div
            className={cn(
              "flex items-center gap-4 text-caption",
              align === "center" && "justify-center",
            )}
          >
            {index && <span className="text-clay/80">{index}</span>}
            {index && eyebrow && (
              <span className="h-px w-10 bg-stone/70" aria-hidden />
            )}
            {eyebrow && <span>{eyebrow}</span>}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={cn("text-h2 max-w-[24ch]", align === "center" && "mx-auto")}>
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className={cn("text-body max-w-[52ch]", align === "center" && "mx-auto")}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
