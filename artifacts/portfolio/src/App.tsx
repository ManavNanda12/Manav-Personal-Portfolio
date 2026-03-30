import { useEffect, useState } from "react";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useReveal } from "./hooks/useReveal";

function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setWidth((scrolled / total) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${width}%` }}
    />
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#hero"
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "2rem",
        zIndex: 100,
        width: "44px",
        height: "44px",
        borderRadius: "8px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b",
        fontSize: "1.1rem",
        textDecoration: "none",
        transition: "all 0.3s",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = "#06b6d4";
        el.style.color = "#06b6d4";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(255,255,255,0.08)";
        el.style.color = "#64748b";
      }}
      title="Back to top"
    >
      ↑
    </a>
  );
}

function ParallaxHeroBg() {
  useEffect(() => {
    const el = document.querySelector(".hero-bg") as HTMLElement;
    const onScroll = () => {
      if (el) el.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}

export default function App() {
  useReveal();

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <div className="grid-overlay" />
      <Nav />
      <main>
        <Hero />
        <ParallaxHeroBg />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Services />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
