"use client";

// src/animations/Stagger.tsx
//
// A parent/child pair for revealing a list or grid one item after
// another. Wrap the list in <StaggerGroup>, each item in <StaggerItem>.

import { motion, type HTMLMotionProps } from "framer-motion";
import {
  durations,
  easeCouture,
  fadeUpVariants,
  popVariants,
  staggerContainer,
} from "./variants";

export type StaggerGroupProps = HTMLMotionProps<"div"> & {
  staggerChildren?: number;
  delayChildren?: number;
  repeat?: boolean;
  margin?: string;
};

export function StaggerGroup({
  staggerChildren = 0.09,
  delayChildren = 0,
  repeat = false,
  margin = "-60px",
  children,
  ...rest
}: StaggerGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, margin }}
      variants={staggerContainer(staggerChildren, delayChildren)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export type StaggerItemProps = HTMLMotionProps<"div"> & {
  /** "fade" rises gently, "pop" scales in with a springy snap. */
  variant?: "fade" | "pop";
  duration?: number;
};

export function StaggerItem({
  variant = "fade",
  duration = durations.base,
  children,
  ...rest
}: StaggerItemProps) {
  return (
    <motion.div
      variants={variant === "pop" ? popVariants : fadeUpVariants}
      transition={{ duration, ease: easeCouture }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
