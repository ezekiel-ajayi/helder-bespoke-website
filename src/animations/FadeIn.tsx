"use client";

// src/animations/FadeIn.tsx
//
// Drop-in fade (optionally with a small rise or drop) for headings,
// paragraphs, and small blocks. Animates once when it enters the
// viewport by default.

import { motion, type HTMLMotionProps } from "framer-motion";
import {
  durations,
  easeCouture,
  fadeVariants,
  fadeUpVariants,
  fadeDownVariants,
} from "./variants";

type FadeDirection = "none" | "up" | "down";

export type FadeInProps = HTMLMotionProps<"div"> & {
  /** "up" (default) rises into place, "down" drops in, "none" is a plain fade. */
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  /** Replay every time it scrolls into view instead of once. */
  repeat?: boolean;
  /** How far from the viewport edge the animation should trigger. */
  margin?: string;
  as?: "div" | "span" | "section" | "article";
};

const tagMap = {
  div: motion.div,
  span: motion.span,
  section: motion.section,
  article: motion.article,
};

const variantMap = {
  none: fadeVariants,
  up: fadeUpVariants,
  down: fadeDownVariants,
};

export default function FadeIn({
  direction = "up",
  delay = 0,
  duration = durations.slow,
  repeat = false,
  margin = "-60px",
  as = "div",
  children,
  ...rest
}: FadeInProps) {
  const Component = tagMap[as];

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, margin }}
      variants={variantMap[direction]}
      transition={{ duration, delay, ease: easeCouture }}
      {...rest}
    >
      {children}
    </Component>
  );
}
