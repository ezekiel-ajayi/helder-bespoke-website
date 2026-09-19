// src/animations/variants.ts
//
// Single source of truth for motion timing across the site.
// Change an ease curve, a distance, or a duration here and every
// component using the <FadeIn>, <SlideIn>, <PopIn>, and <Stagger>
// primitives in this folder picks it up automatically.

import type { Transition, Variants } from "framer-motion";

/** The brand's signature "couture" ease — matches globals.css --ease-couture */
export const easeCouture = [0.16, 1, 0.3, 1] as const;

export const durations = {
  fast: 0.35,
  base: 0.6,
  slow: 0.8,
  slower: 1.1,
};

export const distances = {
  sm: 16,
  md: 28,
  lg: 48,
};

export function transition(overrides: Partial<Transition> = {}): Transition {
  return {
    duration: durations.base,
    ease: easeCouture,
    ...overrides,
  };
}

// ---- Fade ----------------------------------------------------------------

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: distances.md },
  show: { opacity: 1, y: 0 },
};

export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -distances.md },
  show: { opacity: 1, y: 0 },
};

// ---- Slide (larger travel, for whole sections / panels) ------------------

export const slideVariants = {
  left: {
    hidden: { opacity: 0, x: -distances.lg },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: distances.lg },
    show: { opacity: 1, x: 0 },
  },
  up: {
    hidden: { opacity: 0, y: distances.lg },
    show: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -distances.lg },
    show: { opacity: 1, y: 0 },
  },
} satisfies Record<string, Variants>;

// ---- Pop / popup (for badges, chips, buttons, icons) ----------------------

export const popVariants: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  show: { opacity: 1, scale: 1 },
};

export const popSpring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 26,
  mass: 0.6,
};

// ---- Stagger container ----------------------------------------------------

export function staggerContainer(
  staggerChildren = 0.09,
  delayChildren = 0
): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren, delayChildren },
    },
  };
}
