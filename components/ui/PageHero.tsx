"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export function PageHero({
  eyebrow,
  title,
  intro,
  meta,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <section className="relative px-5 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-10 lg:pb-20 lg:pt-40">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          {eyebrow && <div className="text-caption">{eyebrow}</div>}
          <h1 className="text-h1 max-w-[18ch] font-display">{title}</h1>
          {intro && (
            <p className="max-w-[58ch] text-body">{intro}</p>
          )}
          {meta && <div className="mt-2 text-caption text-clay">{meta}</div>}
        </motion.div>
      </div>
      <div className="mx-auto mt-16 max-w-[1440px]">
        <div className="hairline" />
      </div>
    </section>
  );
}
