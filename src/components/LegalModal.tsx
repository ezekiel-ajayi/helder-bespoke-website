"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type LegalDoc = {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
};

const docs: Record<"terms" | "privacy", LegalDoc> = {
  terms: {
    title: "Terms & Conditions",
    updated: "Last updated September 2026",
    sections: [
      {
        heading: "Orders & Deposits",
        body: "A non-refundable deposit of 50% is required to begin cutting any bespoke garment. The balance is due at collection or before final delivery, whichever comes first.",
      },
      {
        heading: "Measurements & Fittings",
        body: "Every order includes a minimum of two fittings. Measurements are taken by hand at the atelier or, where distance requires it, by a tailor Helder dispatches to you. We are not able to guarantee fit on measurements submitted without a fitting.",
      },
      {
        heading: "Production Timelines",
        body: "Standard turnaround is 2–4 weeks from final fitting, depending on garment complexity and fabric availability. Rush orders may be accommodated for an additional fee, subject to atelier capacity.",
      },
      {
        heading: "Cancellations & Alterations",
        body: "Orders may be cancelled before cutting begins for a full refund less the deposit. Once fabric has been cut, orders are final. Minor alterations within 14 days of collection are complimentary.",
      },
      {
        heading: "Delivery",
        body: "Garments are available for collection at our Victoria Island atelier, or may be shipped within Nigeria and internationally at the client's cost. Helder is not responsible for delays caused by couriers or customs.",
      },
      {
        heading: "Limitation of Liability",
        body: "Helder Bespoke's liability for any order is limited to the value paid for that order. We are not liable for indirect or consequential loss arising from delivery delays or fit adjustments.",
      },
      {
        heading: "Governing Law",
        body: "These terms are governed by the laws of the Federal Republic of Nigeria.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated September 2026",
    sections: [
      {
        heading: "Information We Collect",
        body: "We collect the information you provide when booking a fitting or contacting us — name, phone number, email address, and any garment or measurement details you choose to share.",
      },
      {
        heading: "How We Use It",
        body: "Your information is used to schedule fittings, produce and deliver your garments, and communicate with you about your order. We do not sell client information to third parties.",
      },
      {
        heading: "WhatsApp & Communication",
        body: "Booking requests submitted through this site are sent via WhatsApp, which is operated by Meta and subject to its own privacy terms. Messages sent this way are visible to Helder Bespoke's client care team.",
      },
      {
        heading: "Data Retention",
        body: "Measurement and order records are retained for as long as needed to serve you on future orders, or until you request their deletion.",
      },
      {
        heading: "Third Parties",
        body: "We share information only with the couriers or payment processors required to fulfil your order, and only to the extent necessary.",
      },
      {
        heading: "Your Rights",
        body: "You may request a copy of the information we hold about you, or request that it be corrected or deleted, at any time by contacting us.",
      },
      {
        heading: "Contact",
        body: "Questions about this policy can be sent to atelier@helderbespoke.com or +234 800 000 0000.",
      },
    ],
  },
};

export default function LegalModal({
  type,
  onClose,
}: {
  type: "terms" | "privacy" | null;
  onClose: () => void;
}) {
  const open = type !== null;
  const doc = type ? docs[type] : null;

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
      {open && doc && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-onyx/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-[71] flex items-center justify-center p-4 md:p-8">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={doc.title}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-sm border border-onyx-line bg-onyx"
            >
              <div className="flex items-start justify-between border-b border-onyx-line px-8 py-6">
                <div>
                  <h2 className="font-display text-2xl text-ivory">
                    {doc.title}
                  </h2>
                  <p className="mt-1 text-xs text-ivory/45">{doc.updated}</p>
                </div>
                <button
                  aria-label="Close"
                  onClick={onClose}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-onyx-line text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-y-auto px-8 py-8">
                <div className="flex flex-col gap-7">
                  {doc.sections.map((section) => (
                    <div key={section.heading}>
                      <h3 className="eyebrow text-gold">{section.heading}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
