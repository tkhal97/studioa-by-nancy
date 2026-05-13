"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useIntake } from "@/lib/intake/store";
import { StepShell } from "./StepShell";
import { StepNav } from "../StepNav";

export function StepDetails({ onSubmit }: { onSubmit: () => void }) {
  const draft = useIntake((s) => s.draft);
  const update = useIntake((s) => s.update);
  const prev = useIntake((s) => s.prev);
  const submitting = useIntake((s) => s.submitting);

  const onDrop = useCallback(
    (files: File[]) => {
      // Store file names for the email; uploads happen on submit
      const meta = files.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
      }));
      (window as unknown as { __studioFiles?: File[] }).__studioFiles = files;
      update({
        details: draft.details ?? "",
        // attach metadata via a hidden field - simple approach for now
      });
      void meta;
    },
    [draft.details, update],
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpg", ".jpeg", ".png", ".heic"],
        "application/pdf": [".pdf"],
      },
      maxFiles: 10,
      maxSize: 10 * 1024 * 1024,
    });

  return (
    <StepShell
      index={6}
      total={8}
      eyebrow="The Vision"
      title={
        <>
          Tell Nancy about your
          <br /> space and your vision.
        </>
      }
      sub="Inspirations, constraints, the feeling you want to walk into - anything you'd share with a designer in conversation."
    >
      <div className="flex flex-col gap-6">
        <label className="block">
          <span className="sr-only">Your vision</span>
          <textarea
            value={draft.details ?? ""}
            onChange={(e) => update({ details: e.target.value })}
            placeholder="A short paragraph is perfect. Mention the rooms, the lifestyle, the mood, and anything important about the space…"
            rows={6}
            className="block w-full resize-none rounded-[2px] border border-stone/60 bg-canvas/60 p-5 text-base leading-relaxed text-ink outline-none transition-colors focus:border-ink"
          />
        </label>

        <div
          {...getRootProps()}
          className={`relative cursor-pointer rounded-[2px] border border-dashed p-8 text-center transition-colors ${
            isDragActive
              ? "border-ink bg-linen"
              : "border-stone/60 bg-canvas/40"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-caption">Optional · Inspiration & Plans</p>
          <p className="mt-3 font-display text-xl text-ink">
            Drop floor plans, Pinterest screenshots, or inspiration images
          </p>
          <p className="mt-3 text-xs text-ink/55">
            Up to 10 files · JPG, PNG, HEIC, PDF · 10MB each
          </p>
          {acceptedFiles.length > 0 && (
            <p className="mt-4 text-xs text-ink/70">
              {acceptedFiles.length} file{acceptedFiles.length > 1 ? "s" : ""}{" "}
              attached
            </p>
          )}
        </div>
      </div>

      <StepNav
        onBack={prev}
        onNext={onSubmit}
        loading={submitting}
        nextLabel="Send Inquiry"
      />
    </StepShell>
  );
}
