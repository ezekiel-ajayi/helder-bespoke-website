"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { buildWhatsAppUrl, WHATSAPP_DEFAULT_MESSAGE } from "../lib/whatsapp";
import AboutDrawer from "./AboutDrawer";

const navLinks = [
  { label: "Collections", href: "#collections" },
  { label: "Words", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  setAboutOpen: (open: boolean) => void;
};

export default function Navbar({ setAboutOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const navigatrTo = (e: any, link: string) => {
    e.preventDefault();
    const target = document.querySelector(link);
    setOpen(false);
    setTimeout(() => {
      target?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-couture ${
        scrolled || open
          ? "bg-onyx/90 backdrop-blur-md border-b border-onyx-line"
          : "bg-linear-to-b from-onyx/85 via-onyx/50 to-onyx/15 border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between md:h-23">
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt="Helder Bespoke monogram"
            width={40}
            height={36}
            className="h-8 w-auto md:h-9"
            priority
          />
          <span className="font-display text-lg tracking-wide text-ivory md:text-xl">
            Helder<span className="text-gold"> Bespoke</span>
          </span>
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group eyebrow relative text-ivory/70 transition-colors duration-300 hover:text-gold"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-couture group-hover:scale-x-100" />
            </a>
          ))}
          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            className="group eyebrow relative text-ivory/70 transition-colors duration-300 hover:text-gold"
          >
            About Us
            <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-couture group-hover:scale-x-100" />
          </button>
        </nav>

        <a
          href={buildWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full border border-gold/60 px-6 py-2.5 eyebrow text-gold transition-all duration-300 hover:bg-gold hover:text-onyx lg:inline-block"
        >
          Book a Fitting
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-ivory lg:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-onyx-line bg-onyx lg:hidden"
          >
            <div className="container-x flex flex-col items-center gap-6 py-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    navigatrTo(e, link.href);
                  }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="font-display text-2xl text-ivory/90 hover:text-gold"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setAboutOpen(true);
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                className="font-display text-2xl text-ivory/90 hover:text-gold"
              >
                About Us
              </motion.button>
              <a
                href={buildWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-fit rounded-full border border-gold px-6 py-3 eyebrow text-gold"
              >
                Book a Fitting
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
