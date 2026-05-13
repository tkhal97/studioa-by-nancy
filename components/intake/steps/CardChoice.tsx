"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ChoiceProps = {
  selected?: boolean;
  onSelect: () => void;
  title: string;
  description?: string;
  image?: string;
  children?: ReactNode;
  className?: string;
};

export function CardChoice({
  selected,
  onSelect,
  title,
  description,
  image,
  className,
}: ChoiceProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onSelect}
      className={cn(
        "group relative flex w-full overflow-hidden rounded-[2px] border bg-canvas text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        selected
          ? "border-accent shadow-[0_30px_60px_-40px_rgba(184,155,122,0.6)]"
          : "border-stone/40 hover:border-ink/30",
        className,
      )}
    >
      {image && (
        <div className="relative aspect-[5/4] w-full overflow-hidden bg-linen">
          <img
            src={image}
            alt=""
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              selected ? "scale-[1.04]" : "group-hover:scale-[1.03]",
            )}
          />
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              selected ? "bg-obsidian/15" : "bg-obsidian/0 group-hover:bg-obsidian/8",
            )}
          />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        <div className="text-canvas drop-shadow-[0_1px_8px_rgba(20,17,14,0.45)]">
          <div className="font-display text-2xl leading-tight">{title}</div>
          {description && (
            <p className="mt-1 text-xs text-canvas/85">{description}</p>
          )}
        </div>
        <span
          className={cn(
            "relative inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-500",
            selected
              ? "border-accent bg-accent text-ink"
              : "border-canvas/60 bg-canvas/20 text-canvas backdrop-blur",
          )}
        >
          {selected ? (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
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
      </div>
    </motion.button>
  );
}

export function PillChoice({
  selected,
  onSelect,
  label,
  description,
}: {
  selected?: boolean;
  onSelect: () => void;
  label: string;
  description?: string;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onSelect}
      className={cn(
        "group relative flex w-full items-center justify-between gap-6 rounded-full border px-6 py-4 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        selected
          ? "border-ink bg-ink text-canvas"
          : "border-stone/50 bg-canvas text-ink hover:border-ink/40 hover:bg-linen/50",
      )}
    >
      <span className="flex flex-col">
        <span className="font-display text-lg leading-tight">{label}</span>
        {description && (
          <span
            className={cn(
              "mt-1 text-xs",
              selected ? "text-canvas/70" : "text-ink/55",
            )}
          >
            {description}
          </span>
        )}
      </span>
      <span
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-500",
          selected
            ? "border-canvas text-canvas"
            : "border-stone/60 text-stone group-hover:border-ink/40",
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
        ) : (
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
            <circle cx="3" cy="3" r="2" stroke="currentColor" strokeWidth="1" />
          </svg>
        )}
      </span>
    </motion.button>
  );
}
