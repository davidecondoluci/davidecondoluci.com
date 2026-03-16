import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Loader from "./components/Loader";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const cursorRef = useRef(null);
  const cursorWrapperRef = cursorRef;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handler = (e) => {
      if (cursorWrapperRef.current) {
        cursorWrapperRef.current.style.visibility = e.detail.active
          ? "hidden"
          : "";
      }
    };
    window.addEventListener("custom-cursor-active", handler);
    return () => window.removeEventListener("custom-cursor-active", handler);
  }, []);

  // Lenis smooth scroll — synced with GSAP ticker for ScrollTrigger compatibility
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const handler = (e) => (e.detail.stop ? lenis.stop() : lenis.start());
    window.addEventListener("lenis-toggle", handler);

    return () => {
      window.removeEventListener("lenis-toggle", handler);
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // Custom dot cursor — pointer devices only
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    const onMove = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.style.cursor = "none";
    const hideSystemCursor = () => {
      document.body.style.cursor = "none";
    };
    window.addEventListener("focus", hideSystemCursor);
    return () => {
      window.removeEventListener("focus", hideSystemCursor);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <div className="w-full bg-white text-gray">
      {loading && (
        <Loader
          onComplete={() => {
            setLoading(false);
            window.dispatchEvent(new CustomEvent("site-ready"));
          }}
        />
      )}
      {/* Custom dot cursor — desktop only */}
      <div
        ref={cursorRef}
        className="hidden lg:block fixed top-0 left-0 z-[99999] pointer-events-none w-4 h-4 rounded-full bg-white mix-blend-difference -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      />
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Contact />
    </div>
  );
};

export default App;
