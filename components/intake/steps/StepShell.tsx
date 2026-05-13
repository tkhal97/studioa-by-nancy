"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StepShell({
  index,
  total,
  eyebrow,
  title,
  sub,
  children,
  className,
}: {
  index: number;
  total: number;
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex w-full flex-col gap-6", className)}
    >
      <header className="flex flex-col gap-3">
        {eyebrow && (
          <div className="text-caption text-clay">
            <span className="text-ink">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 inline-block h-px w-6 align-middle bg-stone/70" />
            {eyebrow}
            <span className="mx-2 text-ink/30">/</span>
            <span className="text-ink/40">
              {String(total).padStart(2, "0")}
            </span>
          </div>
        )}
        <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.08] max-w-[22ch] tracking-[-0.015em]">
          {title}
        </h2>
        {sub && <p className="max-w-[58ch] text-[0.95rem] leading-[1.55] text-ink/75">{sub}</p>}
      </header>
      <div>{children}</div>
    </motion.div>
  );
}
