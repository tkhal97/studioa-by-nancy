"use client";

import { CAL_LINK } from "@/lib/utils";

export function CalendarEmbed() {
  if (!CAL_LINK) {
    return (
      <div className="rounded-[2px] border border-stone/50 bg-linen/50 p-6 text-sm text-ink/75">
        Scheduling will be enabled when Nancy connects her calendar. For now,
        we&apos;ll reach out personally with proposed times.
      </div>
    );
  }
  const src = `https://cal.com/${CAL_LINK}?theme=light&hideEventTypeDetails=false&layout=month_view`;
  return (
    <div className="overflow-hidden rounded-[2px] border border-stone/50 bg-canvas">
      <iframe
        title="Schedule a consultation"
        src={src}
        className="h-[640px] w-full"
        loading="lazy"
      />
    </div>
  );
}
