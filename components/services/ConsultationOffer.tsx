"use client";

import { useConcierge } from "@/components/intake/ConciergeProvider";
import { Reveal } from "@/components/ui/Reveal";
import { consultation } from "@/lib/content";

const AGENDA = [
  "Your space and how you use it day to day",
  "The look and feel you're after",
  "Budget, timeline, and priorities",
  "How we'd work together from here",
];

/** The paid first step: price, format, and how the fee is credited. */
export function ConsultationOffer() {
  const { openConcierge } = useConcierge();

  return (
    <section className="relative px-6 pb-20 lg:px-10 lg:pb-28">
      <Reveal>
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[3px] border border-stone/50 bg-linen/50 lg:grid-cols-12">
          <div className="relative flex flex-col justify-between gap-10 bg-terracotta p-8 text-canvas sm:p-10 lg:col-span-5 lg:p-14">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/80">
                Step one · Consultation
              </div>
              <div className="mt-6 font-display text-[clamp(4rem,9vw,7rem)] leading-none">
                {consultation.fee}
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/85">
                {consultation.formats} · with Nancy
              </div>
            </div>
            <p className="max-w-[36ch] text-canvas/90">{consultation.credit}</p>
          </div>

          <div className="p-8 sm:p-10 lg:col-span-7 lg:p-14">
            <h2 className="text-h2 max-w-[18ch] font-display">
              Every project begins
              <span className="italic font-light text-terracotta"> with a conversation.</span>
            </h2>
            <div className="mt-8 text-caption">What we&rsquo;ll talk through</div>
            <ul className="mt-4 divide-y divide-stone/50 border-y border-stone/50">
              {AGENDA.map((item, i) => (
                <li key={item} className="flex items-baseline gap-5 py-3.5 text-ink/85">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-clay">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() =>
                openConcierge({ source: "services", intent: "schedule" })
              }
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-canvas transition-colors duration-500 hover:bg-obsidian"
            >
              Book a consultation
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
