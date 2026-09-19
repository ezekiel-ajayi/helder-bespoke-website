"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import helder from "@/public/assets/images/helder.jpeg";
import { buildWhatsAppUrl, WHATSAPP_DEFAULT_MESSAGE } from "../lib/whatsapp";

export default function AboutDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-70 bg-onyx/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="About Helder Bespoke"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-71 flex w-full max-w-md flex-col overflow-y-auto bg-onyx md:max-w-lg"
          >
            <div className="relative w-full shrink-0 h-100 md:h-128">
              <Image
                src={helder}
                alt="A tailor inspecting a bespoke garment in the Helder atelier"
                fill
                sizes="(max-width: 768px) 100vw, 512px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-linear-to-t from-onyx via-onyx/1 to-onyx/2" />
              <button
                aria-label="Close"
                onClick={onClose}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 bg-onyx/50 text-ivory backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 px-8 py-10 md:px-10">
              <span className="eyebrow text-gold">About Helder</span>
              <h2 className="mt-5 font-display text-balance text-3xl leading-tight text-ivory">
                One atelier.
                <br />
                <span className="italic text-gold">Two wardrobes.</span>
              </h2>

              <p className="mt-6 text-ivory/70">
                Helder Bespoke is a Lagos-based tailoring house built on a
                simple observation: the modern Nigerian man doesn&apos;t
                live in one wardrobe. He needs an agbada that holds its
                shape through a six-hour owambe, and a suit that holds its
                shoulder through a six-hour flight — often in the same week.
              </p>
              <p className="mt-4 text-ivory/70">
                So we trained one floor of tailors in both traditions. The
                same hands that hand-embroider a fila also hand-pad a lapel
                roll. Nothing here is outsourced between &quot;native&quot;
                and &quot;international&quot; — it&apos;s one atelier, one
                standard, cut to one measure: yours.
              </p>
              <p className="mt-4 text-ivory/70">
                Fifteen years in, we still take twenty-six measurements by
                hand and fit every piece at least twice before it leaves the
                atelier — for clients across Lagos, the rest of Nigeria, and
                the diaspora.
              </p>

              <div className="mt-10 seam max-w-xs" />

              <div className="mt-8 grid grid-cols-2 gap-8">
                <div>
                  <p className="font-display text-2xl text-gold">2011</p>
                  <p className="mt-1 text-sm text-ivory/55">
                    Founded on Victoria Island, Lagos.
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl text-gold">26</p>
                  <p className="mt-1 text-sm text-ivory/55">
                    Measurements taken by hand, every visit.
                  </p>
                </div>
              </div>

              <a
                href={buildWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-gold py-4 eyebrow text-onyx transition-all duration-300 hover:bg-gold-bright sm:w-auto sm:px-10"
              >
                Book a Fitting
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
