"use client";

import Header from "../components/Navbar";
import Hero from "../components/Hero";
import FactStrip from "../components/FactStrip";
import Marquee from "../components/Marquee";
import Heritage from "../components/Heritage";
import Collections from "../components/Collections";
import Process from "../components/Process";
import CraftGallery from "../components/CraftGallery";
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
      {/* <Heritage /> */}
      <Collections />
      {/* <Process /> */}
      {/* <CraftGallery /> */}
      <Testimonials />
      {/* <FactStrip /> */}
      <Contact />
      <Footer />
      <AboutDrawer open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </main>
  );
}
