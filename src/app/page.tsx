"use client";

import Header from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Collections from "../components/Collections";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import AboutDrawer from "../components/AboutDrawer";
import { useState } from "react";

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <main className="scroll-smooth">
      <ScrollProgress />
      <Header setAboutOpen={setAboutOpen} />
      <Hero />
      <Marquee />
      <Collections />
      <Testimonials />
      <Contact />
      <Footer />
      <AboutDrawer open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </main>
  );
}
