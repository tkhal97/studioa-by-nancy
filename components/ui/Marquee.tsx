"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  speed = 40,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <motion.div
        className="flex w-max gap-16 whitespace-nowrap"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <div className="flex gap-16 pr-16">{children}</div>
        <div aria-hidden className="flex gap-16 pr-16">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
