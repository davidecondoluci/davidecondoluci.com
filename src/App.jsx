import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.visibility = e.detail.active ? "hidden" : "";
      }
    };
    window.addEventListener("custom-cursor-active", handler);
    return () => window.removeEventListener("custom-cursor-active", handler);
  }, []);

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

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.style.cursor = "none";
    const hide = () => { document.body.style.cursor = "none"; };
    window.addEventListener("focus", hide);

    // GSAP owns all transform properties — no direct style.transform writes
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onMove = (e) => {
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);

    const onHover = (e) => {
      const interactive = !!e.target.closest("a, button");
      gsap.to(cursor, { scale: interactive ? 2.5 : 1, duration: 0.2, ease: "power2.out" });
    };
    document.addEventListener("mouseover", onHover);

    return () => {
      window.removeEventListener("focus", hide);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onHover);
      document.body.style.cursor = "";
    };
  }, []);

  // Dispatch site-ready immediately (no loader)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("site-ready"));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="w-full bg-white text-gray">
      <div
        ref={cursorRef}
        className="hidden lg:block fixed top-0 left-0 z-99999 pointer-events-none w-4 h-4 rounded-full bg-white mix-blend-difference"
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
