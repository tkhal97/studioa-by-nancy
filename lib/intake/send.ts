import { intakeSchema, labels, type IntakePayload } from "./schema";

/**
 * The site is a static export (GitHub Pages), so there is no server route to
 * post to. Inquiries are relayed as an email by FormSubmit. The very first
 * submission makes FormSubmit send Nancy a one-time activation email; until
 * she confirms it, submissions are held and the visitor sees an error.
 */
const INQUIRY_EMAIL =
  process.env.NEXT_PUBLIC_INQUIRY_EMAIL ?? "nancy@studioabynancy.com";
const ENDPOINT = `https://formsubmit.co/ajax/${INQUIRY_EMAIL}`;

const FORM_NAMES: Record<string, string> = {
  full: "Project inquiry",
  "first-visit": "Quick introduction",
};

/** Validates the inquiry and emails it to the studio as a readable table. */
export async function sendInquiry(input: unknown) {
  const p: IntakePayload = intakeSchema.parse(input);
  const full = p.variant === "full";
  const list = <K extends string>(values: readonly K[] | undefined, map: Record<K, string>) =>
    values?.map((v) => map[v]).join(", ");

  const type = p.projectType === "residential" ? "Residential" : "Commercial";
  const fields: Record<string, string | undefined> = {
    _subject: `New inquiry - ${p.contact.name} · ${type}`,
    _template: "table",
    _captcha: "false",
    _replyto: p.contact.email,
    // FormSubmit's honeypot: bots that fill it are silently dropped
    _honey: p.website,
    Form: p.source === "schedule" ? "Consultation booking" : FORM_NAMES[p.variant],
    Name: p.contact.name,
    Email: p.contact.email,
    Phone: p.contact.phone,
    Location: p.contact.location,
    "Project type": type,
    Rooms: list(p.rooms, labels.rooms),
    // the short forms fill the survey fields with placeholders - leave them out
    Scope: full || p.source === "first-visit" ? list(p.scope, labels.scope) : undefined,
    Aesthetic: full ? labels.aesthetic[p.aesthetic] : undefined,
    Investment: full ? labels.investment[p.investment] : undefined,
    Timeline: full ? labels.timeline[p.timeline] : undefined,
    Details: p.details || undefined,
    "Came from": p.source,
  };
  const body = Object.fromEntries(
    Object.entries(fields).filter(([, v]) => v !== undefined && v !== ""),
  );

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(
      "We couldn't reach the studio just now. Please try again, or email nancy@studioabynancy.com.",
    );
  }
  const data = (await res.json().catch(() => ({}))) as {
    success?: string | boolean;
    message?: string;
  };
  if (!res.ok || String(data.success) !== "true") {
    throw new Error(
      data.message ??
        "Your inquiry didn't go through. Please try again, or email nancy@studioabynancy.com.",
    );
  }
}
