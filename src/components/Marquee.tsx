"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/src/animations";

const items = [
  "Bespoke Tailoring",
  "Hand-Cut in Lagos",
  "Native Attire",
  "International Suiting",
  "One Measure — Yours",
];

function Track() {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <div key={i} className="flex items-center">
          <span className="font-display text-2xl italic text-ivory/80 sm:text-3xl md:text-4xl">
            {item}
          </span>
          <span className="mx-6 h-2 w-2 rounded-full bg-gold sm:mx-10" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <FadeIn
      as="section"
      direction="none"
      duration={1}
      aria-hidden="true"
      className="overflow-hidden border-y border-onyx-line bg-onyx py-8 md:py-10"
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 26,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <Track />
        <Track />
      </motion.div>
    </FadeIn>
  );
}
