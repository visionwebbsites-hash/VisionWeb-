import { useEffect } from "react";
import Lenis from "lenis";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Results } from "./components/Results";
import { Space } from "./components/Space";
import { Differentials } from "./components/Differentials";
import { Testimonials } from "./components/Testimonials";
import { Location } from "./components/Location";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const loop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="bg-[#FDFBF7] text-[#2C1810]">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Marquee />
        <About />
        <Services />
        <Results />
        <Space />
        <Differentials />
        <Testimonials />
        <Location />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
