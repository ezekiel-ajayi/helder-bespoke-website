"use client";

// src/animations/PopIn.tsx
//
// Springy "popup" scale-in for badges, pills, checkmarks, and icons —
// anything that should feel like it snaps into existence rather than
// gliding in. Works great inside <AnimatePresence> for items that
// mount/unmount (e.g. a selected-collection chip).

import { motion, type HTMLMotionProps } from "framer-motion";
import { popVariants, popSpring } from "./variants";

export type PopInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Use a spring (default, bouncier) or the standard couture ease-tween. */
  spring?: boolean;
};

export default function PopIn({
  delay = 0,
  spring = true,
  children,
  ...rest
}: PopInProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={popVariants}
      transition={spring ? { ...popSpring, delay } : { duration: 0.35, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
