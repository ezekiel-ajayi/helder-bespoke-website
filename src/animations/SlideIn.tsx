"use client";

// src/animations/SlideIn.tsx
//
// Larger-travel directional slide, meant for whole sections, cards,
// and panels sliding in from an edge.

import { motion, type HTMLMotionProps } from "framer-motion";
import { durations, easeCouture, slideVariants } from "./variants";

export type SlideInProps = HTMLMotionProps<"div"> & {
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  repeat?: boolean;
  margin?: string;
};

export default function SlideIn({
  direction = "up",
  delay = 0,
  duration = durations.slow,
  repeat = false,
  margin = "-60px",
  children,
  ...rest
}: SlideInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, margin }}
      variants={slideVariants[direction]}
      transition={{ duration, delay, ease: easeCouture }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
