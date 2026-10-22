"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CardChoice } from "./steps/CardChoice";
import { StepNav } from "./StepNav";
import { CalendarEmbed } from "./CalendarEmbed";
import { formatPhone } from "@/lib/utils";
import { useConcierge } from "./ConciergeProvider";
import { consultation } from "@/lib/content";
import { sendInquiry } from "@/lib/intake/send";

const RES =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80";
const COM =
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80";

type ScheduleState = {
  projectType?: "residential" | "commercial";
  name: string;
  email: string;
  phone: string;
};

export function ScheduleFlow() {
  const { closeConcierge } = useConcierge();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ScheduleState>({
    name: "",
    email: "",
    phone: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validateContact() {
    const e: Record<string, string> = {};
    if (!form.name || form.name.trim().length < 2)
      e.name = "Please share your name";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Please share a valid email";
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submitAndAdvance() {
    if (!validateContact() || !form.projectType) return;
    setError(null);
    setSubmitting(true);
    try {
      await sendInquiry({
        source: "schedule",
        intent: "schedule",
        variant: "first-visit",
        projectType: form.projectType,
        scope: ["consultation"],
        aesthetic: "modern-minimal",
        investment: "rather-not-say",
        timeline: "planning-phase",
        contact: {
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
        },
        details: "Schedule Consultation flow - booking via calendar.",
      });
      setSubmitted(true);
      setStep(2);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const totalSteps = 3;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full flex-col gap-8"
      >
        <header className="flex flex-col gap-4">
          <div className="text-caption text-clay">
            <span className="text-ink">
              {String(step + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 inline-block h-px w-6 align-middle bg-stone/70" />
            {step === 0
              ? "Project Type"
              : step === 1
                ? "Contact"
                : "Choose a Time"}
            <span className="mx-2 text-ink/30">/</span>
            <span className="text-ink/40">
              {String(totalSteps).padStart(2, "0")}
            </span>
          </div>
          <h2 className="text-h2 max-w-[20ch] font-display leading-[1.05]">
            {step === 0 && (
              <>
                A consultation,
                <br />
                <span className="italic font-light">on your calendar.</span>
              </>
            )}
            {step === 1 && (
              <>
                Where should
                <br />
                Nancy reach you?
              </>
            )}
            {step === 2 && (
              <>
                Choose a time
                <br />
                <span className="italic font-light">that suits you.</span>
              </>
            )}
          </h2>
          {step === 0 && (
            <p className="max-w-[52ch] text-body">
              Two short questions before we open the calendar. Consultations
              are {consultation.fee} ({consultation.formats.toLowerCase()}) and
              the fee is applied toward your design fee if we continue working
              together.
            </p>
          )}
          {step === 1 && (
            <p className="max-w-[52ch] text-body">
              We&apos;ll send a confirmation and the consultation details after
              you book.
            </p>
          )}
        </header>

        {step === 0 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <CardChoice
                selected={form.projectType === "residential"}
                onSelect={() =>
                  setForm({ ...form, projectType: "residential" })
                }
                title="Residential"
                description="Homes, apartments, second residences"
                image={RES}
                className="aspect-[16/10]"
              />
              <CardChoice
                selected={form.projectType === "commercial"}
                onSelect={() => setForm({ ...form, projectType: "commercial" })}
                title="Commercial"
                description="Hospitality, retail, workspace"
                image={COM}
                className="aspect-[16/10]"
              />
            </div>
            <StepNav
              hideBack
              onNext={() => setStep(1)}
              disabled={!form.projectType}
            />
          </>
        )}

        {step === 1 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                error={fieldErrors.name}
                autoComplete="name"
                autoFocus
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                error={fieldErrors.email}
                autoComplete="email"
                inputMode="email"
              />
              <Field
                label="Phone (optional)"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: formatPhone(v) })}
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
            {error && (
              <p className="text-xs text-[color-mix(in_srgb,var(--color-accent-deep)_85%,var(--color-ink))]">
                {error}
              </p>
            )}
            <StepNav
              onBack={() => setStep(0)}
              onNext={submitAndAdvance}
              loading={submitting}
              nextLabel="Open Calendar"
            />
          </>
        )}

        {step === 2 && (
          <>
            {submitted && (
              <p className="text-caption text-clay">
                Your details are with Nancy - choose a time below to confirm.
              </p>
            )}
            <CalendarEmbed />
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="group inline-flex items-center gap-3 text-caption text-ink/70"
              >
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  className="transition-transform duration-500 group-hover:-translate-x-1"
                >
                  <path
                    d="M17 5H1M6 1L1 5l5 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
                Back
              </button>
              <button
                onClick={closeConcierge}
                className="inline-flex items-center gap-3 rounded-full border border-ink/30 px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-ink transition-all duration-500 hover:bg-ink hover:text-canvas"
              >
                Close
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  error,
  autoFocus,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  inputMode?:
    | "text"
    | "email"
    | "tel"
    | "search"
    | "url"
    | "numeric"
    | "decimal"
    | "none";
}) {
  const filled = value.length > 0;
  return (
    <label className="group relative block">
      <span
        className={`pointer-events-none absolute left-0 origin-left text-caption transition-all duration-300 ${
          filled ? "top-0 scale-90 text-clay" : "top-7 text-ink/55"
        }`}
      >
        {label}
      </span>
      <input
        type={type}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full border-b border-stone/60 bg-transparent pb-3 pt-7 text-lg text-ink outline-none transition-colors focus:border-ink"
      />
      {error && (
        <span
          className="mt-2 inline-block text-xs text-[color-mix(in_srgb,var(--color-accent-deep)_85%,var(--color-ink))]"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </label>
  );
}
