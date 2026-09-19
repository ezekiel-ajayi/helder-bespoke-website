"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Check, X } from "lucide-react";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import { useCollectionsStore } from "@/src/store/useCollectionsStore";
import { FadeIn, PopIn, SlideIn } from "@/src/animations";

const garmentTypes = [
  "Agbada",
  "Senator / Native",
  "Kaftan",
  "Suit (2 or 3-piece)",
  "Tie / Accessories",
  "Not sure yet",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const selectedCollections = useCollectionsStore((s) => s.selected);
  const unselectCollection = useCollectionsStore((s) => s.unselect);
  const clearCollections = useCollectionsStore((s) => s.clear);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const garment = String(data.get("garment") || "").trim();
    const details = String(data.get("message") || "").trim();
    const collectionNames = selectedCollections.map((c) => c.name).join(", ");

    const lines = [
      "Hi Helder Bespoke, I'd like to book a fitting.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      collectionNames ? `Collections: ${collectionNames}` : null,
      garment ? `Garment: ${garment}` : null,
      details ? `Details: ${details}` : null,
    ].filter(Boolean);

    window.open(
      buildWhatsAppUrl(lines.join("\n")),
      "_blank",
      "noopener,noreferrer",
    );
    setSubmitted(true);
    clearCollections();
  }

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-cover bg-top
    
    "
      style={{ backgroundImage: "url('/assets/images/white-bg.png')" }}
    >
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-12">
        <SlideIn direction="left" className="col-span-1 lg:col-span-5">
          <FadeIn direction="none" as="span">
            <span className="eyebrow text-gold-deep">Book a Fitting</span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="mt-6 font-display text-balance text-3xl leading-tight text-onyx sm:text-4xl">
              Tell us what you&apos;re building. We&apos;ll take it from
              there.
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-md text-onyx/65">
              Based in Lagos, fitting clients across Nigeria and the
              diaspora. Share the occasion and garment, and a tailor will
              reply within 48 hours to schedule your measure.
            </p>
          </FadeIn>

          <FadeIn delay={0.24} className="mt-10 flex flex-col gap-5">
            <a
              href="tel:+2348000000000"
              className="flex items-center gap-4 text-onyx/75 transition-colors hover:text-gold-deep"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-deep/30 text-gold-deep">
                <Phone size={18} />
              </span>
              +234 800 000 0000
            </a>
            <a
              href="mailto:atelier@helderbespoke.com"
              className="flex items-center gap-4 text-onyx/75 transition-colors hover:text-gold-deep"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-deep/30 text-gold-deep">
                <Mail size={18} />
              </span>
              atelier@helderbespoke.com
            </a>
            <div className="flex items-center gap-4 text-onyx/75">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-deep/30 text-gold-deep">
                <MapPin size={18} />
              </span>
              Victoria Island, Lagos, Nigeria
            </div>
          </FadeIn>
        </SlideIn>

        <SlideIn
          direction="right"
          delay={0.1}
          className="col-span-1 lg:col-span-7 lg:col-start-6"
        >
          {submitted ? (
            <PopIn
              spring={false}
              className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-xl border border-gold/30 bg-onyx p-10 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-onyx">
                <Check size={26} />
              </span>
              <h3 className="mt-6 font-display text-2xl text-ivory">
                You&apos;re headed to WhatsApp.
              </h3>
              <p className="mt-3 max-w-sm text-ivory/60">
                We opened a WhatsApp chat with your details pre-filled —
                just hit send. A tailor will reply within 48 hours to
                schedule your fitting.
              </p>
            </PopIn>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-onyx-line bg-onyx p-8 md:p-10"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Phone number" name="phone" type="tel" required />
              </div>
              <div className="mt-6">
                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  required
                />
              </div>

              <fieldset className="mt-8">
                <legend className="eyebrow text-ivory/60">
                  What are we making?
                </legend>

                {/* Selected collections — populated from the Lookbook via the
                    shared zustand store. Multiple picks are supported and
                    each can be removed right here. */}
                <div className="mt-4">
                  {selectedCollections.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence initial={false}>
                        {selectedCollections.map((c) => (
                          <PopIn
                            key={c.id}
                            layout
                            className="flex items-center gap-2 rounded-full border border-gold bg-gold/10 py-2 pl-4 pr-2 text-sm text-gold-bright"
                          >
                            <span>{c.name}</span>
                            <button
                              type="button"
                              onClick={() => unselectCollection(c.id)}
                              aria-label={`Remove ${c.name}`}
                              className="flex h-5 w-5 items-center justify-center rounded-full text-gold-bright/70 transition-colors hover:bg-gold hover:text-onyx"
                            >
                              <X size={12} />
                            </button>
                          </PopIn>
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <p className="text-sm text-ivory/40">
                      No collections selected yet — tap the{" "}
                      <span className="text-gold-bright">+</span> on any
                      piece in the Lookbook to add it here.
                    </p>
                  )}
                </div>

                <p className="mt-5 text-xs text-ivory/35">
                  Or pick a garment type
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {garmentTypes.map((type) => (
                    <label
                      key={type}
                      className="cursor-pointer rounded-full border border-onyx-line px-4 py-2 text-sm text-ivory/70 transition-colors has-[:checked]:border-gold has-[:checked]:text-gold"
                    >
                      <input
                        type="radio"
                        name="garment"
                        value={type}
                        className="sr-only"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-8">
                <label
                  htmlFor="message"
                  className="eyebrow block text-ivory/60"
                >
                  Occasion or details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Wedding in October, navy agbada, need it ready by the 12th..."
                  className="mt-3 w-full rounded-sm border border-onyx-line bg-onyx-soft px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-gold py-4 eyebrow text-onyx transition-all duration-300 hover:bg-gold-bright sm:w-auto sm:px-10"
              >
                Continue on WhatsApp
              </button>
            </form>
          )}
        </SlideIn>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block text-ivory/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border-b border-onyx-line bg-transparent py-2 text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
      />
    </div>
  );
}
