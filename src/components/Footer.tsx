"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, WHATSAPP_DEFAULT_MESSAGE } from "../lib/whatsapp";
import AboutDrawer from "./AboutDrawer";
import LegalModal from "./LegalModal";
import TikTokIcon from "@/public/assets/images/tik-tok.png"
import InstagramIcon from "@/public/assets/images/instagram.png";
import { FadeIn, StaggerGroup, StaggerItem } from "@/src/animations";

type FooterLink =
  | { label: string; href: string; external?: boolean }
  | { label: string; action: "about" | "terms" | "privacy" };

const sitemap: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Atelier",
    links: [
      { label: "Collections", href: "#collections" },
      { label: "Client Words", href: "#testimonials" },
    ],
  },
  {
    heading: "Client Care",
    links: [
      {
        label: "Book a Fitting",
        href: buildWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE),
        external: true,
      },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Helder", action: "about" },
      { label: "Privacy Policy", action: "privacy" },
      { label: "Terms", action: "terms" },
    ],
  },
];

// Swap these for the brand's real handles.
const socialLinks = [
  {
    label: "Follow on Instagram",
    href: "https://www.instagram.com/helder_bespoke?stkn=MTlpcDU4ZGltY21tOA",
    Icon: "/assets/images/instagram1.png",
  },
  {
    label: "Follow on TikTok",
    href: "https://www.tiktok.com/@helder_bespoke?_r=1&_t=ZS-99rb36RPaCq",
    Icon: "/assets/images/tik-tok.png",
  },
];

export default function Footer() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState<"terms" | "privacy" | null>(null);

  return (
    <footer
      className="bg-onyx pt-20 bg-cover bg-bottom"
      style={{ backgroundImage: "url('/assets/images/dark-bg-2.png')" }}
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-12 border-b border-onyx-line pb-16 lg:grid-cols-12"
        >
          <div className="lg:col-span-4">
            <FadeIn direction="none" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Helder Bespoke monogram"
                width={36}
                height={32}
                className="h-8 w-auto"
              />
              <span className="font-display text-lg text-ivory">
                Helder<span className="text-gold"> Bespoke</span>
              </span>
            </FadeIn>
            <FadeIn
              delay={0.08}
              className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/55"
            >
              A bespoke house crafting native Nigerian attire for you, every piece
              fitted, never assumed.
            </FadeIn>
            <StaggerGroup
              staggerChildren={0.07}
              delayChildren={0.16}
              className="mt-7 flex gap-4"
            >
              {socialLinks.map(({ label, href, Icon }) => (
                <StaggerItem variant="pop" key={label}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.05 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-onyx-line text-ivory/60 transition-colors hover:border-gold hover:text-gold bg-white 
                    "
                  >
                    <Image src={Icon} alt={label} width={40} height={40} />
                  </motion.a>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {sitemap.map((col, ci) => (
              <motion.div
                key={col.heading}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + ci * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="eyebrow text-ivory/50">{col.heading}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {"action" in link ? (
                        <button
                          type="button"
                          onClick={() =>
                            link.action === "about"
                              ? setAboutOpen(true)
                              : setLegalOpen(link.action)
                          }
                          className="text-sm text-ivory/70 transition-colors hover:text-gold"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          className="text-sm text-ivory/70 transition-colors hover:text-gold"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-ivory/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Helder Bespoke. All rights reserved.
          </p>
          <p>Ikeja Lagos, Nigeria</p>
        </div>
      </div>

      <AboutDrawer open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <LegalModal type={legalOpen} onClose={() => setLegalOpen(null)} />
    </footer>
  );
}
