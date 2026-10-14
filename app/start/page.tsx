"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useConcierge } from "@/components/intake/ConciergeProvider";
import { Wordmark } from "@/components/ui/Wordmark";

export default function StartPage() {
  const { openConcierge } = useConcierge();
  useEffect(() => {
    openConcierge({ source: "direct", intent: "inquire" });
  }, [openConcierge]);

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-canvas px-6 text-center">
      <Link href="/" className="text-ink">
        <Wordmark className="text-4xl" />
      </Link>
      <p className="mt-8 max-w-[44ch] text-body">
        Opening your private intake - if it does not appear, please use the
        button below.
      </p>
      <button
        onClick={() => openConcierge({ source: "direct", intent: "inquire" })}
        className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-canvas"
      >
        Begin
      </button>
      <Link
        href="/"
        className="mt-6 text-caption text-clay underline-offset-4 hover:underline"
      >
        Return to the studio
      </Link>
    </main>
  );
}
