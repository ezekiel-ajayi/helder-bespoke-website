// src/animations/index.ts
//
// Reusable, drop-in scroll/mount animations for the site. Import from
// "@/src/animations" anywhere you need a section, text block, or badge
// to fade, slide, or pop into view. Tune shared timing in variants.ts.

export { default as FadeIn } from "./FadeIn";
export { default as SlideIn } from "./SlideIn";
export { default as PopIn } from "./PopIn";
export { StaggerGroup, StaggerItem } from "./Stagger";
export * from "./variants";
