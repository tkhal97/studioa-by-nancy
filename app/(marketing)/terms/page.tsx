import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of studioabynancy.com.",
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Terms
            <span className="italic font-light"> of use.</span>
          </>
        }
        intro="The following terms govern your use of studioabynancy.com. By using the site, you agree to these terms."
        meta="Last updated: January 2026"
      />

      <article className="mx-auto max-w-[720px] space-y-8 px-6 pb-24 text-body lg:px-0">
        <section>
          <h2 className="font-display text-2xl text-ink">Site content</h2>
          <p className="mt-3">
            All photography, writing, and design work shown on this site is
            either created by Studio A by Nancy, licensed for our use, or used
            with permission from the photographer or rights-holder. Project
            photography may not be reproduced or republished without written
            permission.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">Inquiries & quotes</h2>
          <p className="mt-3">
            Information submitted through the inquiry form is used to evaluate
            project fit and to follow up personally. Submitting an inquiry does
            not create a contract or obligation on either side. Engagements
            begin only after a signed agreement.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">Third-party links</h2>
          <p className="mt-3">
            This site may link to third-party services (e.g., scheduling, social
            media). Those services are governed by their own terms and privacy
            practices. Studio A by Nancy is not responsible for their content
            or policies.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">Limitation of liability</h2>
          <p className="mt-3">
            The site is provided as-is. We make reasonable efforts to keep it
            accurate and available, but we do not warrant that the site will be
            error-free or uninterrupted. Studio A by Nancy is not liable for
            indirect or incidental losses arising from use of the site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">Changes</h2>
          <p className="mt-3">
            These terms may be updated from time to time. Continued use of the
            site after changes are posted indicates your acceptance of the
            updated terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">Contact</h2>
          <p className="mt-3">
            Questions about these terms can be sent to{" "}
            <a
              href="mailto:studio@studioabynancy.com"
              className="underline-offset-4 hover:underline"
            >
              studio@studioabynancy.com
            </a>
            .
          </p>
        </section>
      </article>
    </>
  );
}
