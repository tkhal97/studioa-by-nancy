"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { ease } from "@/lib/motion/variants";

type Props = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  delay = 0,
  y = 28,
  once = true,
  amount = 0.2,
  ...rest
}: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduce ? 0.2 : 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
