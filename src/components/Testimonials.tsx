"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../lib/content";
import { FadeIn, StaggerGroup, StaggerItem } from "@/src/animations";
import Avatar from "react-avatar";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 60;

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="flex h-full flex-col rounded-sm border border-onyx-line bg-onyx-soft p-6">
      <Quote className="shrink-0 text-gold" size={18} />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ivory line-clamp-4">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gold/40">
          <Avatar name={t.name} size="40" round="50%" color="#0B1220" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ivory">{t.name}</p>
          <p className="truncate text-xs text-ivory/60">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  // Mobile-only carousel state — the desktop layout below is a static grid.
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const count = testimonials.length;

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + count) % count);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index]);

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  };

  const t = testimonials[index];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section id="testimonials" className="bg-onyx py-14 md:py-16 h-130">
      <div className="container-x">
        <div>
          <FadeIn direction="down" as="span">
            <span className="eyebrow text-gold">Client Words</span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="mt-3 max-w-xl font-display text-balance text-2xl leading-tight text-ivory sm:text-3xl">
              Said better by the people who wore it.
            </h2>
          </FadeIn>
        </div>

        {/* Desktop / tablet: static grid, entrance-only motion, no autoplay */}
        <StaggerGroup
          staggerChildren={0.1}
          className="mt-8 hidden gap-5 md:grid md:grid-cols-3"
        >
          {testimonials.map((item) => (
            <StaggerItem key={item.name} variant="fade">
              <TestimonialCard t={item} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Mobile: swipeable single-card carousel */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mt-8 overflow-hidden md:hidden"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={onDragEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              <TestimonialCard t={t} />
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-onyx-line text-ivory/70"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className="p-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-5 bg-gold" : "w-1.5 bg-ivory/25"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-onyx-line text-ivory/70"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
