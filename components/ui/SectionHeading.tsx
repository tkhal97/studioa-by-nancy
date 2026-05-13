"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SectionHeading({
  eyebrow,
  index,
  title,
  intro,
  align = "left",
  className,
}: Props) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "flex flex-col gap-7",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {(eyebrow || index) && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
          }}
          className={cn(
            "flex items-center gap-4 text-caption",
            align === "center" && "justify-center",
          )}
        >
          {index && (
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: EASE },
                },
              }}
              className="text-clay/80"
            >
              {index}
            </motion.span>
          )}
          {index && eyebrow && (
            <motion.span
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: { duration: 0.9, ease: EASE },
                },
              }}
              style={{ transformOrigin: "left center" }}
              className="h-px w-10 bg-stone/70"
              aria-hidden
            />
          )}
          {eyebrow && (
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: EASE },
                },
              }}
            >
              {eyebrow}
            </motion.span>
          )}
        </motion.div>
      )}

      {/* Title with clip-path wipe — feels like a curtain rising */}
      <motion.h2
        initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
        whileInView={
          reduce
            ? { opacity: 1 }
            : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
        }
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        className={cn("text-h2 max-w-[24ch]", align === "center" && "mx-auto")}
      >
        {title}
      </motion.h2>

      {intro && (
        <Reveal delay={0.35}>
          <p
            className={cn(
              "text-body max-w-[52ch]",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
