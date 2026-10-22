import {
  investmentCommercialOptions,
  investmentResidentialOptions,
  type IntakeDraft,
  type ProjectType,
} from "./schema";

export const STEPS = [
  "projectType",
  "rooms",
  "scope",
  "aesthetic",
  "investment",
  "timeline",
  "contact",
  "details",
  "confirmation",
] as const;
export type StepId = (typeof STEPS)[number];

/** Whether a step applies to this draft - room options are residential only. */
export function stepApplies(id: StepId, draft: IntakeDraft) {
  return id !== "rooms" || draft.projectType === "residential";
}

/** The steps this draft will walk through, in order. */
export function visibleSteps(draft: IntakeDraft) {
  return STEPS.filter((id) => stepApplies(id, draft));
}

export function investmentOptionsFor(branch: ProjectType) {
  return branch === "residential"
    ? investmentResidentialOptions
    : investmentCommercialOptions;
}

export function isStepComplete(id: StepId, draft: IntakeDraft): boolean {
  switch (id) {
    case "projectType":
      return !!draft.projectType;
    case "rooms":
      return !!draft.rooms && draft.rooms.length > 0;
    case "scope":
      return !!draft.scope && draft.scope.length > 0;
    case "aesthetic":
      return !!draft.aesthetic;
    case "investment":
      return !!draft.investment;
    case "timeline":
      return !!draft.timeline;
    case "contact":
      return !!(draft.contact?.name && draft.contact?.email);
    case "details":
      return true; // optional
    case "confirmation":
      return false;
  }
}

export function progressFor(idx: number) {
  return Math.min(1, idx / (STEPS.length - 1));
}

export function adaptiveConfirmationCopy(draft: IntakeDraft) {
  const big =
    draft.investment === "500k-plus" ||
    draft.investment === "250-500k" ||
    draft.investment === "150k-plus";
  const planning = draft.timeline === "planning-phase";
  const commercial = draft.projectType === "commercial";

  if (commercial && big) {
    return {
      title: "Thank you for considering Studio A.",
      body:
        "Nancy will personally review your project within 24 hours and reach out to schedule a private consultation.",
    };
  }
  if (planning) {
    return {
      title: "Thank you - beautiful spaces begin here.",
      body:
        "We'll be in touch with a tailored next-step guide for your planning phase.",
    };
  }
  if (commercial) {
    return {
      title: "Thank you for your inquiry.",
      body:
        "Nancy reviews every commercial brief personally. Expect a reply within 1–2 business days.",
    };
  }
  return {
    title: "Thank you for your inquiry.",
    body:
      "Nancy personally reviews every project request and will be in touch shortly.",
  };
}

export function adaptiveOpeningCopy(intent: "inquire" | "schedule" | "pricing") {
  switch (intent) {
    case "schedule":
      return {
        eyebrow: "Schedule a private consultation",
        title: "Book a consultation with Nancy.",
        sub: "A $250 consultation over Zoom or in your home - applied toward your design fee if we continue. Two short questions, then choose a time from Nancy's calendar.",
      };
    case "pricing":
      return {
        eyebrow: "Investment & engagement",
        title: "Considered work, transparently quoted.",
        sub: "Tell us about your space - we'll share investment tiers and process tailored to your project.",
      };
    default:
      return {
        eyebrow: "Begin a project",
        title: "Let's create something extraordinary.",
        sub: "Tell us a little about your space and your vision.",
      };
  }
}
