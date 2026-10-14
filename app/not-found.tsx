import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-canvas px-6 text-center">
      <Wordmark className="text-4xl text-ink" asLink />
      <div className="mt-12 text-caption text-clay">Error · 404</div>
      <h1 className="text-h1 mt-6 max-w-[18ch] font-display">
        The page you&rsquo;re looking for{" "}
        <span className="italic font-light">isn&rsquo;t here.</span>
      </h1>
      <p className="mt-6 max-w-[44ch] text-body">
        It may have been moved, or perhaps it was never composed. Return to the
        studio at the link below.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-canvas"
      >
        Return to the studio
      </Link>
    </main>
  );
}
