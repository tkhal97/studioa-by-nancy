"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatPhone } from "@/lib/utils";

const STORAGE_KEY = "studio-prompt-shown-at-v1";
const SUPPRESS_DAYS = 14;

export function FirstVisitPrompt() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "" as "" | "residential" | "commercial",
    scope: "" as
      | ""
      | "full-interior-design"
      | "renovation"
      | "furnishing-styling"
      | "consultation",
    aesthetic: "" as
      | ""
      | "modern-minimal"
      | "warm-organic"
      | "luxury-contemporary"
      | "transitional",
    details: "",
    website: "", // honeypot
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const last = localStorage.getItem(STORAGE_KEY);
    if (last) {
      const days = (Date.now() - Number(last)) / (1000 * 60 * 60 * 24);
      if (days < SUPPRESS_DAYS) return;
    }

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setOpen(true);
    };

    const timer = window.setTimeout(trigger, 35_000);
    const onScroll = () => {
      const ratio =
        (window.scrollY + window.innerHeight) /
        (document.documentElement.scrollHeight || 1);
      if (ratio > 0.7) trigger();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function close(remember = true) {
    setOpen(false);
    if (remember && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.email || !form.projectType) {
      setError("Please share name, email, and project type.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "first-visit",
          intent: "inquire",
          variant: "first-visit",
          projectType: form.projectType,
          scope: form.scope ? [form.scope] : ["consultation"],
          aesthetic: form.aesthetic || "modern-minimal",
          investment: "rather-not-say",
          timeline: "planning-phase",
          contact: {
            name: form.name,
            email: form.email,
            phone: form.phone || undefined,
          },
          details: form.details,
          website: form.website,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok)
        throw new Error(data.error ?? "Submission failed");
      setSent(true);
      close(true);
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && !sent && (
        <motion.aside
          key="first-visit"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-deep fixed inset-x-0 bottom-0 z-[80] w-full overflow-hidden rounded-t-[16px] p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:bottom-6 sm:right-6 sm:inset-x-auto sm:max-w-[420px] sm:rounded-[12px] sm:p-7"
          role="dialog"
          aria-label="Begin a conversation with Nancy"
        >
          <button
            aria-label="Dismiss"
            onClick={() => close(true)}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone/60 text-ink/70 transition-colors hover:text-ink"
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
          </button>

          <div className="text-caption text-clay">A private introduction</div>
          <h3 className="mt-3 font-display text-2xl leading-tight">
            Begin a conversation
            <br />
            <span className="italic font-light">with the studio.</span>
          </h3>
          <p className="mt-2 max-w-[34ch] text-sm text-ink/70">
            Leave a few details - Nancy will reply personally within two
            business days.
          </p>

          <form onSubmit={submit} className="mt-5 grid gap-3">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden
            />
            <MiniField
              label="Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              autoComplete="name"
            />
            <MiniField
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              autoComplete="email"
              inputMode="email"
            />
            <MiniField
              label="Phone (optional)"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: formatPhone(v) })}
              autoComplete="tel"
              inputMode="tel"
            />
            <div className="grid grid-cols-2 gap-2">
              <PillToggle
                label="Residential"
                selected={form.projectType === "residential"}
                onClick={() => setForm({ ...form, projectType: "residential" })}
              />
              <PillToggle
                label="Commercial"
                selected={form.projectType === "commercial"}
                onClick={() => setForm({ ...form, projectType: "commercial" })}
              />
            </div>
            <textarea
              placeholder="A note about your space or vision (optional)"
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              rows={2}
              className="resize-none rounded-[2px] border border-stone/50 bg-canvas/60 p-3 text-sm outline-none focus:border-ink"
            />

            {error && (
              <p className="text-xs text-[color-mix(in_srgb,var(--color-accent-deep)_85%,var(--color-ink))]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-canvas transition-all hover:bg-obsidian disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Begin"}
            </button>
            <button
              type="button"
              onClick={() => close(true)}
              className="text-center text-xs text-ink/55 underline-offset-4 hover:underline"
            >
              Not right now
            </button>
          </form>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function MiniField({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
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
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.22em] text-clay">
        {label}
      </span>
      <input
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border-b border-stone/60 bg-transparent pb-1.5 text-sm text-ink outline-none transition-colors focus:border-ink"
      />
    </label>
  );
}

function PillToggle({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
        selected
          ? "border-ink bg-ink text-canvas"
          : "border-stone/60 bg-canvas/40 text-ink/80 hover:border-ink/40"
      }`}
    >
      {label}
    </button>
  );
}
