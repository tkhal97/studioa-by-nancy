import { NextRequest, NextResponse } from "next/server";
import { intakeSchema } from "@/lib/intake/schema";
import { resend, EMAIL_FROM, EMAIL_TO } from "@/lib/email/resend";
import { NancyLeadEmail } from "@/emails/NancyLeadEmail";
import { ClientConfirmationEmail } from "@/emails/ClientConfirmationEmail";
import { insertLead } from "@/lib/supabase/server";
import { limit } from "@/lib/ratelimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = intakeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // honeypot
  if (data.website && data.website.trim() !== "") {
    // pretend success to fool bots
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";
  const rl = await limit(`intake:${ip}`);
  if (!rl.success) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  const firstName = data.contact.name.split(" ")[0] ?? data.contact.name;

  // persist (best-effort)
  let leadId: string | null = null;
  try {
    leadId = await insertLead({
      source: data.source ?? "direct",
      intent: data.intent ?? "inquire",
      project_type: data.projectType,
      scope: data.scope,
      aesthetic: data.aesthetic,
      investment: data.investment,
      timeline: data.timeline,
      name: data.contact.name,
      email: data.contact.email,
      phone: data.contact.phone,
      location: data.contact.location,
      details: data.details,
      variant: data.variant ?? "full",
    });
  } catch (e) {
    console.error("[intake] supabase error", e);
  }

  // emails
  if (resend) {
    try {
      await Promise.all([
        resend.emails.send({
          from: EMAIL_FROM,
          to: EMAIL_TO,
          subject: `New inquiry - ${data.contact.name} · ${data.projectType}`,
          replyTo: data.contact.email,
          react: NancyLeadEmail({ data, leadId: leadId ?? undefined }),
        }),
        resend.emails.send({
          from: EMAIL_FROM,
          to: data.contact.email,
          subject: "Thank you - Nancy will be in touch shortly.",
          react: ClientConfirmationEmail({ firstName }),
        }),
      ]);
    } catch (e) {
      console.error("[intake] email send failed", e);
      // do not fail the request - the lead is persisted
    }
  } else {
    console.info(
      "[intake] RESEND_API_KEY not configured; lead received:",
      JSON.stringify({ ...data, contact: { ...data.contact, email: data.contact.email } }, null, 2),
    );
  }

  return NextResponse.json({ ok: true, leadId });
}
