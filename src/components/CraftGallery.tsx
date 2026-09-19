"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { craftImages } from "../lib/content";

const frames = [
  {
    src: craftImages.fabric,
    alt: "Folded bolts of bespoke fabric",
    tag: "01 — The Cut",
    title: "Fabric first",
    note: "Aso-oke, George, and tropical wool, chosen before a hand touches shears.",
  },
  {
    src: craftImages.hands,
    alt: "A tailor's hands stitching by hand",
    tag: "02 — The Hand",
    title: "Nothing outsourced",
    note: "Every seam closed by a tailor who has done this for decades — not a machine.",
  },
  {
    src: craftImages.measuring,
    alt: "Tape measure across a shoulder seam",
    tag: "03 — The Measure",
    title: "Twenty-six points",
    note: "Taken again at every fitting, so the pattern answers to your body, not a size chart.",
  },
  {
    src: craftImages.detail,
    alt: "Close detail of embroidery thread",
    tag: "04 — The Finish",
    title: "Thread by thread",
    note: "Buttonholes worked by hand, pressed and finished before a garment ever ships.",
  },
];

export default function CraftGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollByFrame = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-frame]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="atelier" className="bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <span className="eyebrow text-gold-deep">Behind the Seams</span>
            <h2 className="mt-6 font-display text-balance text-3xl leading-tight text-onyx sm:text-4xl md:text-5xl">
              Slow work, on purpose.
            </h2>
            <p className="mt-6 text-onyx/65 md:text-lg">
              We could run faster with a machine on every step. We don&apos;t
              — the eye that sets a buttonhole by hand is the same eye that
              catches a fabric flaw before it reaches your fitting.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <button
              aria-label="Previous"
              disabled={atStart}
              onClick={() => scrollByFrame(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-onyx/15 text-onyx transition-colors duration-300 hover:border-gold-deep hover:text-gold-deep disabled:opacity-30 disabled:hover:border-onyx/15 disabled:hover:text-onyx"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              aria-label="Next"
              disabled={atEnd}
              onClick={() => scrollByFrame(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-onyx/15 text-onyx transition-colors duration-300 hover:border-gold-deep hover:text-gold-deep disabled:opacity-30 disabled:hover:border-onyx/15 disabled:hover:text-onyx"
            >
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        ref={trackRef}
        className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pl-6 pr-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:pl-12 xl:pl-20"
      >
        {frames.map((frame) => (
          <div
            key={frame.title}
            data-frame
            className="group relative w-[74vw] shrink-0 snap-start overflow-hidden rounded-sm sm:w-[46vw] md:w-[34vw] lg:w-[27vw]"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper-soft">
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                sizes="(max-width: 768px) 74vw, (max-width: 1280px) 34vw, 27vw"
                className="object-cover transition-transform duration-700 ease-couture group-hover:scale-105"
              />
            </div>
            <div className="mt-5">
              <span className="eyebrow text-gold-deep">{frame.tag}</span>
              <h3 className="mt-2 font-display text-xl text-onyx">
                {frame.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-onyx/60">
                {frame.note}
              </p>
            </div>
          </div>
        ))}
        {/* trailing spacer so the last card keeps consistent right padding when scrolled fully */}
        <div className="w-px shrink-0 md:w-6 xl:w-14" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
