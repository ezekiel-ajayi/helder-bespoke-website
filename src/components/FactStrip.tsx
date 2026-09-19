"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const facts = [
  { value: 15, suffix: "", label: "Years cutting for Lagos and the diaspora" },
  { value: 26, suffix: "", label: "Measurements taken by hand, not six" },
  { value: 2, suffix: "", label: "Fittings minimum, before a seam is closed" },
  { value: 1, suffix: "hr", label: "Average reply time on a fabric enquiry" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 20 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest: number) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function FactStrip() {
  return (
    <section className="border-b border-paper-line bg-paper">
      <div className="container-x grid grid-cols-2 gap-y-10 py-12 md:grid-cols-4 md:py-14">
        {facts.map((fact, i) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2 pr-4"
          >
            <span className="font-display text-3xl text-gold-deep md:text-4xl">
              <CountUp value={fact.value} suffix={fact.suffix} />
            </span>
            <span className="max-w-[180px] text-sm leading-snug text-onyx/60">
              {fact.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
