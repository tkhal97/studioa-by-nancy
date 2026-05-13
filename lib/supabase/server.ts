// Lightweight Supabase REST wrapper.
// Avoids adding @supabase/supabase-js to keep bundle small for v1.
// All calls run server-side only.

type LeadRow = {
  id?: string;
  source: string;
  intent: string;
  project_type: string;
  scope: string[];
  aesthetic: string;
  investment: string;
  timeline: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  details?: string;
  variant: string;
  created_at?: string;
};

export function supabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export async function insertLead(row: LeadRow): Promise<string | null> {
  if (!supabaseConfigured()) return null;
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    console.error("Supabase insert failed", await res.text());
    return null;
  }
  const data = (await res.json()) as { id: string }[];
  return data[0]?.id ?? null;
}
