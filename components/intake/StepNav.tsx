"use client";

import { cn } from "@/lib/utils";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  hideBack?: boolean;
  className?: string;
};

export function StepNav({
  onBack,
  onNext,
  nextLabel = "Continue",
  disabled,
  loading,
  hideBack,
  className,
}: Props) {
  return (
    <div className={cn("flex items-center justify-between gap-4 pt-6", className)}>
      <button
        onClick={onBack}
        type="button"
        className={cn(
          "group inline-flex items-center gap-3 text-caption text-ink/70 transition-opacity",
          hideBack && "invisible",
        )}
      >
        <svg width="14" height="10" viewBox="0 0 18 10" fill="none" className="transition-transform duration-500 group-hover:-translate-x-1">
          <path d="M17 5H1M6 1L1 5l5 4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={disabled || loading}
        className={cn(
          "group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-canvas transition-all duration-500",
          "hover:bg-obsidian hover:tracking-[0.26em]",
          (disabled || loading) && "cursor-not-allowed opacity-40 hover:tracking-[0.22em]",
        )}
      >
        <span>{loading ? "Sending…" : nextLabel}</span>
        {!loading && (
          <svg width="16" height="10" viewBox="0 0 18 10" fill="none" className="transition-transform duration-500 group-hover:translate-x-1">
            <path d="M1 5h16M12 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        )}
      </button>
    </div>
  );
}
