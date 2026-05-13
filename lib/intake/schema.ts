import { z } from "zod";

export const projectTypeSchema = z.enum(["residential", "commercial"]);
export type ProjectType = z.infer<typeof projectTypeSchema>;

export const scopeOptions = [
  "full-interior-design",
  "renovation",
  "furnishing-styling",
  "procurement",
  "renderings",
  "consultation",
] as const;
export const scopeSchema = z.array(z.enum(scopeOptions)).min(1);

export const aestheticOptions = [
  "modern-minimal",
  "warm-organic",
  "luxury-contemporary",
  "transitional",
  "high-end-commercial",
] as const;
export const aestheticSchema = z.enum(aestheticOptions);

export const investmentResidentialOptions = [
  "under-25k",
  "25-75k",
  "75-150k",
  "150k-plus",
  "rather-not-say",
] as const;
export const investmentCommercialOptions = [
  "under-100k",
  "100-250k",
  "250-500k",
  "500k-plus",
  "rather-not-say",
] as const;
export const investmentSchema = z.enum([
  ...investmentResidentialOptions,
  ...investmentCommercialOptions,
]);

export const timelineOptions = [
  "asap",
  "1-3-months",
  "3-6-months",
  "planning-phase",
] as const;
export const timelineSchema = z.enum(timelineOptions);

export const contactSchema = z.object({
  name: z.string().min(2, "Please share your name"),
  email: z.string().email("Please share a valid email"),
  phone: z.string().optional(),
  location: z.string().optional(),
});

export const intakeSchema = z.object({
  source: z.string().optional().default("direct"),
  intent: z.enum(["inquire", "schedule", "pricing"]).optional().default("inquire"),
  projectType: projectTypeSchema,
  scope: scopeSchema,
  aesthetic: aestheticSchema,
  investment: investmentSchema,
  timeline: timelineSchema,
  contact: contactSchema,
  details: z.string().max(2000).optional().default(""),
  // honeypot
  website: z.string().optional().default(""),
  // first-visit (small variant) flag
  variant: z.enum(["full", "first-visit"]).optional().default("full"),
});

export type IntakePayload = z.infer<typeof intakeSchema>;

export const draftSchema = intakeSchema.partial({
  projectType: true,
  scope: true,
  aesthetic: true,
  investment: true,
  timeline: true,
  contact: true,
}).extend({
  contact: contactSchema.partial().optional(),
});

export type IntakeDraft = z.infer<typeof draftSchema>;

export const labels = {
  scope: {
    "full-interior-design": "Full Interior Design",
    renovation: "Renovation",
    "furnishing-styling": "Furnishing & Styling",
    procurement: "Procurement",
    renderings: "Renderings",
    consultation: "Consultation",
  } as const,
  aesthetic: {
    "modern-minimal": "Modern Minimal",
    "warm-organic": "Warm Organic",
    "luxury-contemporary": "Luxury Contemporary",
    transitional: "Transitional",
    "high-end-commercial": "High-End Commercial",
  } as const,
  investment: {
    "under-25k": "Under $25k",
    "25-75k": "$25k - $75k",
    "75-150k": "$75k - $150k",
    "150k-plus": "$150k+",
    "under-100k": "Under $100k",
    "100-250k": "$100k - $250k",
    "250-500k": "$250k - $500k",
    "500k-plus": "$500k+",
    "rather-not-say": "Prefer not to say",
  } as const,
  timeline: {
    asap: "As soon as possible",
    "1-3-months": "1 - 3 months",
    "3-6-months": "3 - 6 months",
    "planning-phase": "Planning phase",
  } as const,
} as const;
