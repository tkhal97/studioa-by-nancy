"use client";

import { useState } from "react";
import { useIntake } from "@/lib/intake/store";
import { StepShell } from "./StepShell";
import { StepNav } from "../StepNav";
import { formatPhone } from "@/lib/utils";

export function StepContact() {
  const draft = useIntake((s) => s.draft);
  const update = useIntake((s) => s.updateContact);
  const next = useIntake((s) => s.next);
  const prev = useIntake((s) => s.prev);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const contact = draft.contact ?? {};

  function validate() {
    const e: Record<string, string> = {};
    if (!contact.name || contact.name.trim().length < 2) e.name = "Please share your name";
    if (!contact.email || !/^\S+@\S+\.\S+$/.test(contact.email))
      e.email = "Please share a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <StepShell
      index={5}
      total={8}
      eyebrow="Contact"
      title={
        <>
          Where should
          <br />
          Nancy reach you?
        </>
      }
      sub="We treat every inquiry privately. Your details are never shared and never added to a marketing list."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full Name"
          value={contact.name ?? ""}
          onChange={(v) => update({ name: v })}
          error={errors.name}
          autoComplete="name"
          autoFocus
        />
        <Field
          label="Email"
          type="email"
          value={contact.email ?? ""}
          onChange={(v) => update({ email: v })}
          error={errors.email}
          autoComplete="email"
          inputMode="email"
        />
        <Field
          label="Phone (optional)"
          value={contact.phone ?? ""}
          onChange={(v) => update({ phone: formatPhone(v) })}
          autoComplete="tel"
          inputMode="tel"
        />
        <Field
          label="City / Location (optional)"
          value={contact.location ?? ""}
          onChange={(v) => update({ location: v })}
          autoComplete="address-level2"
        />
      </div>
      <StepNav
        onBack={prev}
        onNext={() => {
          if (validate()) next();
        }}
        disabled={false}
      />
    </StepShell>
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
  inputMode?: "text" | "email" | "tel" | "search" | "url" | "numeric" | "decimal" | "none";
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
        <span className="mt-2 inline-block text-xs text-[color-mix(in_srgb,var(--color-accent-deep)_85%,var(--color-ink))]" aria-live="polite">
          {error}
        </span>
      )}
    </label>
  );
}
