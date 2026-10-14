"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { useConcierge } from "./ConciergeProvider";
import { useIntake, currentStepId } from "@/lib/intake/store";
import { adaptiveOpeningCopy } from "@/lib/intake/decisionTree";
import { ProgressRail } from "./ProgressRail";
import { StepProjectType } from "./steps/StepProjectType";
import { StepScope } from "./steps/StepScope";
import { StepAesthetic } from "./steps/StepAesthetic";
import { StepInvestment } from "./steps/StepInvestment";
import { StepTimeline } from "./steps/StepTimeline";
import { StepContact } from "./steps/StepContact";
import { StepDetails } from "./steps/StepDetails";
import { StepConfirmation } from "./steps/StepConfirmation";
import { ScheduleFlow } from "./ScheduleFlow";
import { Wordmark } from "@/components/ui/Wordmark";
import { intakeSchema } from "@/lib/intake/schema";

export function ConciergeShell() {
  const { open, source, intent, closeConcierge } = useConcierge();
  const reduce = useReducedMotion();
  const stepIndex = useIntake((s) => s.stepIndex);
  const draft = useIntake((s) => s.draft);
  const update = useIntake((s) => s.update);
  const setStep = useIntake((s) => s.setStep);
  const setSubmitting = useIntake((s) => s.setSubmitting);
  const setSubmitted = useIntake((s) => s.setSubmitted);
  const setError = useIntake((s) => s.setError);

  // pass source / intent into draft when opening
  useEffect(() => {
    if (open) {
      update({ source, intent });
    }
  }, [open, source, intent, update]);

  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  const stepId = currentStepId(stepIndex);
  const copy = useMemo(() => adaptiveOpeningCopy(intent), [intent]);

  async function submit() {
    setError(undefined);
    setSubmitting(true);
    try {
      const payload = intakeSchema.parse({
        ...draft,
        source,
        intent,
        variant: "full",
      });
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok: boolean;
        leadId?: string;
        error?: string;
      };
      if (!res.ok || !data.ok)
        throw new Error(data.error ?? "Submission failed");
      setSubmitted(data.leadId);
      setStep(7); // confirmation
    } catch (e) {
      setSubmitting(false);
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="concierge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100]"
          aria-modal
          role="dialog"
          aria-label="Begin a project"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={closeConcierge}
            className="absolute inset-0 bg-obsidian/55 backdrop-blur-xl"
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            initial={
              reduce ? { opacity: 0 } : { y: "8%", opacity: 0, scale: 0.98 }
            }
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={
              reduce ? { opacity: 0 } : { y: "8%", opacity: 0, scale: 0.98 }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="glass-deep absolute inset-x-0 bottom-0 top-4 mx-auto flex w-full max-w-[1280px] flex-col overflow-hidden rounded-t-[14px] pt-[env(safe-area-inset-top)] sm:inset-6 sm:rounded-[12px] sm:pt-0"
          >
            {/* Decorative point-light gradient */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 88% 0%, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent 60%)",
              }}
            />

            {/* Header bar */}
            <div className="relative flex items-center justify-between border-b border-stone/40 px-6 py-5 sm:px-10">
              <Wordmark variant="mark" className="text-lg text-ink" />
              <div className="hidden text-caption text-clay md:block">
                {copy.eyebrow}
              </div>
              <button
                ref={closeRef}
                aria-label="Close"
                onClick={closeConcierge}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone/60 text-ink transition-colors hover:bg-canvas/80"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="relative grid min-h-0 flex-1 grid-cols-12 gap-0 overflow-hidden">
              <aside className="hidden border-r border-stone/40 px-10 py-12 lg:col-span-4 lg:flex lg:flex-col">
                <div className="text-caption text-clay">
                  A bespoke concierge
                </div>
                <h3 className="text-h3 mt-6 font-display leading-[1.1]">
                  {copy.title}
                </h3>
                <p className="mt-5 max-w-[40ch] text-body">{copy.sub}</p>

                {intent !== "schedule" && (
                  <div className="mt-auto pt-12">
                    <ProgressRail index={stepIndex} />
                  </div>
                )}
              </aside>

              <section
                data-lenis-prevent
                className="col-span-12 min-h-0 overflow-y-auto overscroll-contain px-6 py-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-10 sm:py-10 lg:col-span-8"
              >
                {/* Mobile progress strip - visible only < lg */}
                {intent !== "schedule" && (
                  <div className="mb-8 flex items-center gap-3 text-caption text-clay lg:hidden">
                    <span className="text-ink">
                      {String(stepIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="relative h-px flex-1 overflow-hidden bg-stone/50">
                      <span
                        className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{ width: `${((stepIndex + 1) / 8) * 100}%` }}
                      />
                    </span>
                    <span>08</span>
                  </div>
                )}

                {intent === "schedule" ? (
                  <ScheduleFlow />
                ) : (
                  <AnimatePresence mode="wait">
                    <div key={stepId}>
                      {stepId === "projectType" && <StepProjectType />}
                      {stepId === "scope" && <StepScope />}
                      {stepId === "aesthetic" && <StepAesthetic />}
                      {stepId === "investment" && <StepInvestment />}
                      {stepId === "timeline" && <StepTimeline />}
                      {stepId === "contact" && <StepContact />}
                      {stepId === "details" && (
                        <StepDetails onSubmit={submit} />
                      )}
                      {stepId === "confirmation" && <StepConfirmation />}
                    </div>
                  </AnimatePresence>
                )}
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
