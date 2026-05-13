import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Studio A by Nancy collects, uses, and protects your information.",
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Privacy
            <span className="italic font-light"> policy.</span>
          </>
        }
        intro="We respect your privacy and the trust you place in us when you reach out. This page describes what we collect, why, and how it's handled."
        meta="Last updated: January 2026"
      />

      <article className="mx-auto max-w-[720px] space-y-8 px-6 pb-24 text-body lg:px-0">
        <section>
          <h2 className="font-display text-2xl text-ink">What we collect</h2>
          <p className="mt-3">
            When you submit an inquiry through our concierge intake or contact
            forms, we collect the information you choose to share — typically
            your name, email address, phone number, project location, and
            details about your space and timeline.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">How we use it</h2>
          <p className="mt-3">
            We use your information to reply to your inquiry personally,
            understand the scope of your project, and provide a thoughtful
            response. We do not sell, rent, or share your information with third
            parties for marketing.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">
            How long we keep it
          </h2>
          <p className="mt-3">
            Inquiry information is retained for as long as it&apos;s reasonably
            useful to the relationship — typically the life of the project plus
            a reasonable period after — and is deleted on request.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">
            Cookies & analytics
          </h2>
          <p className="mt-3">
            Studioabynancy.com uses minimal first-party analytics to understand
            how the site is used. No personally identifying information is
            shared with advertisers. Cookies are limited to those required for
            the site to function (e.g., remembering an in-progress intake
            draft).
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">Your rights</h2>
          <p className="mt-3">
            You may request a copy, correction, or deletion of your information
            at any time by writing to{" "}
            <a
              href="mailto:nancy@studioabynancy.com"
              className="underline-offset-4 hover:underline"
            >
              nancy@studioabynancy.com
            </a>
            . We&apos;ll respond within a reasonable time.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">Questions</h2>
          <p className="mt-3">
            If you have any questions about this policy or how your information
            is handled, please reach out directly. We&apos;re happy to clarify.
          </p>
        </section>
      </article>
    </>
  );
}
