"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IntakeDraft } from "./schema";
import { STEPS, type StepId } from "./decisionTree";

type State = {
  stepIndex: number;
  draft: IntakeDraft;
  submitting: boolean;
  submitted: boolean;
  leadId?: string;
  error?: string;
  setStep: (n: number) => void;
  next: () => void;
  prev: () => void;
  update: (patch: Partial<IntakeDraft>) => void;
  updateContact: (patch: Partial<NonNullable<IntakeDraft["contact"]>>) => void;
  reset: () => void;
  setSubmitting: (b: boolean) => void;
  setSubmitted: (id?: string) => void;
  setError: (m?: string) => void;
};

const initialDraft: IntakeDraft = {
  source: "direct",
  intent: "inquire",
  details: "",
  website: "",
  variant: "full",
};

export const useIntake = create<State>()(
  persist(
    (set) => ({
      stepIndex: 0,
      draft: initialDraft,
      submitting: false,
      submitted: false,
      setStep: (n) =>
        set({ stepIndex: Math.max(0, Math.min(STEPS.length - 1, n)) }),
      next: () =>
        set((s) => ({
          stepIndex: Math.min(STEPS.length - 1, s.stepIndex + 1),
        })),
      prev: () =>
        set((s) => ({ stepIndex: Math.max(0, s.stepIndex - 1) })),
      update: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
      updateContact: (patch) =>
        set((s) => ({
          draft: {
            ...s.draft,
            contact: { ...(s.draft.contact ?? {}), ...patch },
          },
        })),
      reset: () =>
        set({
          stepIndex: 0,
          draft: initialDraft,
          submitting: false,
          submitted: false,
          leadId: undefined,
          error: undefined,
        }),
      setSubmitting: (b) => set({ submitting: b }),
      setSubmitted: (id) =>
        set({ submitted: true, leadId: id, submitting: false }),
      setError: (m) => set({ error: m }),
    }),
    {
      name: "studio-intake-draft-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ draft: s.draft, stepIndex: s.stepIndex }),
    },
  ),
);

export function currentStepId(idx: number): StepId {
  return STEPS[Math.max(0, Math.min(STEPS.length - 1, idx))];
}
