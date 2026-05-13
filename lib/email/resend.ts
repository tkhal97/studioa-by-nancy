import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

export const EMAIL_FROM =
  process.env.RESEND_FROM_EMAIL ?? "Studio A by Nancy <studio@studioabynancy.com>";
export const EMAIL_TO = process.env.RESEND_TO_EMAIL ?? "nancy@studioabynancy.com";
