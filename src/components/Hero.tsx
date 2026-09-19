"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import heroImg from "@/public/assets/images/hero.svg";
import heroImg1 from "@/public/assets/images/hero-1.png";
import heroImg2 from "@/public/assets/images/hero-2.png";
import heroImg3 from "@/public/assets/images/hero-3.png";
// import heroImg4 from "@/public/assets/images/hero-4.jpeg";

import { buildWhatsAppUrl, WHATSAPP_DEFAULT_MESSAGE } from "../lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

// Word-by-word reveal for the headline
const headlineContainer = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.35,
      staggerChildren: 0.09,
    },
  },
};

const wordUp = {
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function AnimatedWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span variants={wordUp} className="inline-block">
            {word}
            {i !== text.split(" ").length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Desktop and mobile slide arrays — keep them the same length/order.
// Add imported images to both arrays as you get more assets.
const desktopSlides: StaticImageData[] = [ heroImg1, heroImg, heroImg2, heroImg3];
// const mobileSlides: StaticImageData[] = [heroImg];

const SLIDE_INTERVAL_MS = 3000;

function HeroCarousel({
  slides,
  className,
}: {
  slides: StaticImageData[];
  className: string;
}) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (slides.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
  }, [slides.length]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoplay]);

  // Manual navigation: jump to a slide and reset the autoplay clock
  // so it doesn't advance again immediately after a click.
  const goToSlide = useCallback(
    (i: number) => {
      setIndex(i);
      startAutoplay();
    },
    [startAutoplay]
  );

  return (
    <div className={`absolute inset-0 ${className}`}>
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index]}
            alt="A Helder Bespoke client in a tailored senator-cut native attire"
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-[60%_20%]"
          />
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2 md:bottom-10">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className="pointer-events-auto p-1.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ease-couture ${
                  i === index
                    ? "w-6 bg-ivory/90"
                    : "w-1.5 bg-ivory/40 hover:bg-ivory/70"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-onyx pt-[80px] md:pt-[92px]"
    >
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <HeroCarousel slides={desktopSlides} className="" />
          {/* <HeroCarousel slides={mobileSlides} className="md:hidden" /> */}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-onyx/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx/80 via-transparent to-onyx/30" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="pointer-events-none absolute -right-24 top-1/4 hidden w-[640px] md:block"
        aria-hidden="true"
      >
        <Image src="/logo.png" alt="" width={640} height={571} />
      </motion.div>

      <div className="container-x relative z-10 w-full pb-16 pt-24 md:pb-24">
        <motion.p
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
          className="eyebrow mb-6 text-gold"
        >
          Bespoke Atelier · Est. for the modern man
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={headlineContainer}
          className="font-display text-balance text-[2.6rem] leading-[1.05] text-ivory sm:text-[3.4rem] md:max-w-3xl md:text-[4.5rem] lg:text-[5.2rem]"
        >
          <AnimatedWords text="Tailored without" />
          <br />
          <AnimatedWords text="borders." className="italic text-gold" />
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className="mt-6 max-w-md text-balance font-body text-base text-ivory/75 md:text-lg"
        >
          Helder Bespoke hand-cuts every piece to your exact measurements,
          delivering a fit that is uniquely yours.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href={buildWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 eyebrow text-onyx transition-transform duration-300 ease-couture hover:scale-[1.03] hover:bg-gold-bright"
          >
            Book a Fitting
          </a>
          <a
            href="#collections"
            className="inline-flex items-center justify-center rounded-full border border-ivory/30 px-8 py-4 eyebrow text-ivory transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            View Collections
          </a>
        </motion.div>
      </div>

      {/* Seam-line signature at the base of the hero */}
      <div className="container-x absolute inset-x-0 bottom-0 z-10">
        <div className="seam" />
      </div>
    </section>
  );
}