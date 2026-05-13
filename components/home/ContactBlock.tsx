"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS = [
  {
    label: "Email",
    value: "nancy@studioabynancy.com",
    href: "mailto:nancy@studioabynancy.com",
  },
  { label: "Phone", value: "(503) 573-1777", href: "tel:+15035731777" },
  { label: "Studio", value: "Portland, Oregon · By appointment" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Houzz", href: "https://houzz.com" },
];

export function ContactBlock({
  showSelfLink = true,
  showIntro = true,
}: {
  showSelfLink?: boolean;
  showIntro?: boolean;
}) {
  return (
    <section className="relative bg-canvas py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {showIntro && (
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-caption">07 · Contact</div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-h2 mt-6 max-w-[16ch] font-display">
                  Get in touch
                  <br />
                  <span className="italic font-light">with the studio.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-[44ch] text-body">
                  We take a small number of projects each year. Write to us and
                  Nancy will reply personally.
                </p>
              </Reveal>
            </div>
          )}

          <div className={showIntro ? "lg:col-span-7" : "lg:col-span-12"}>
            <Reveal delay={0.15}>
              <dl className="divide-y divide-stone/40 border-y border-stone/40">
                {ITEMS.map((i) => (
                  <div
                    key={i.label}
                    className="flex flex-col gap-2 py-5 sm:grid sm:grid-cols-12 sm:gap-6 sm:py-6"
                  >
                    <dt className="text-caption text-clay sm:col-span-4">
                      {i.label}
                    </dt>
                    <dd className="font-display text-xl text-ink sm:col-span-8 sm:text-2xl">
                      {i.href ? (
                        <a
                          href={i.href}
                          className="underline-offset-[6px] hover:underline"
                        >
                          {i.value}
                        </a>
                      ) : (
                        i.value
                      )}
                    </dd>
                  </div>
                ))}
                <div className="flex flex-col gap-2 py-5 sm:grid sm:grid-cols-12 sm:gap-6 sm:py-6">
                  <dt className="text-caption text-clay sm:col-span-4">
                    Social
                  </dt>
                  <dd className="flex flex-wrap gap-x-6 gap-y-2 font-display text-xl text-ink sm:col-span-8 sm:text-2xl">
                    {SOCIAL.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-[6px] hover:underline"
                      >
                        {s.label}
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>

            {showSelfLink && (
              <Reveal delay={0.25}>
                <Link
                  href="/contact"
                  className="group mt-10 inline-flex items-center gap-3 text-caption text-ink"
                >
                  <span className="border-b border-ink/40 pb-1">
                    Visit the contact page
                  </span>
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="none"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  >
                    <path
                      d="M1 5h16M12 1l5 4-5 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
