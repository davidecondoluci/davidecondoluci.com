import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import {
  Bars2Icon,
  XMarkIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import FlipLink from "./FlipLink";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const dotSpacerRef = useRef(null);
  const menuRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const [dotStyle, setDotStyle] = useState(null);

  const cvPath = "/pdf/Condoluci_Davide_cv_EN.pdf";

  const updateDotPos = useCallback(() => {
    if (!dotSpacerRef.current) return;
    const r = dotSpacerRef.current.getBoundingClientRect();
    setDotStyle({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, []);

  useEffect(() => {
    const onReady = () => setTimeout(updateDotPos, 900);
    window.addEventListener("site-ready", onReady, { once: true });
    window.addEventListener("resize", updateDotPos);
    return () => {
      window.removeEventListener("site-ready", onReady);
      window.removeEventListener("resize", updateDotPos);
    };
  }, [updateDotPos]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    gsap.set(nav, { opacity: 0, y: -20 });
    const run = () => {
      gsap.to(nav, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
    };
    window.addEventListener("site-ready", run, { once: true });
    return () => window.removeEventListener("site-ready", run);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
    window.dispatchEvent(
      new CustomEvent("lenis-toggle", { detail: { stop: menuOpen } }),
    );
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  // Animate in when menu mounts
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;
    isAnimatingRef.current = false;
    const items = Array.from(menuRef.current.querySelectorAll("li"));
    gsap.set(menuRef.current, { opacity: 0, y: -10 });
    gsap.set(items, { opacity: 0, y: 30 });
    const tl = gsap.timeline();
    tl.to(menuRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
      .to(items, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out" }, "-=0.15");
  }, [menuOpen]);

  const animateClose = (onDone) => {
    if (isAnimatingRef.current || !menuRef.current) {
      onDone();
      return;
    }
    isAnimatingRef.current = true;
    const items = Array.from(menuRef.current.querySelectorAll("li"));
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        onDone();
      },
    });
    tl.to([...items].reverse(), {
      opacity: 0,
      y: 20,
      duration: 0.2,
      stagger: 0.03,
      ease: "power2.in",
    }).to(menuRef.current, { opacity: 0, y: -10, duration: 0.25 }, "-=0.1");
  };

  const handleToggleMenu = () => {
    if (isAnimatingRef.current) return;
    if (menuOpen) {
      animateClose(() => setMenuOpen(false));
    } else {
      setMenuOpen(true);
    }
  };

  const handleAnchorClick = (e, sectionId) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    if (menuOpen) {
      animateClose(() => setMenuOpen(false));
    }
  };

  return (
    <>
      {/* Dot verde — fuori dal container mix-blend via portal */}
      {dotStyle &&
        createPortal(
          <span
            aria-hidden="true"
            className="pointer-events-none"
            style={{ position: "fixed", zIndex: 51, ...dotStyle }}
          >
            <span className="relative flex h-full w-full">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-green-500" />
            </span>
          </span>,
          document.body,
        )}

      {/* Navbar — mix-blend-difference sul container, il dot è escluso via portal */}
      <div
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference"
      >
        <nav className="grid grid-cols-3 items-center w-full max-w-400 mx-auto">
          {/* Left: Name */}
          <a
            href="#hero"
            onClick={(e) => handleAnchorClick(e, "hero")}
            className="font-sans text-base font-light text-white whitespace-nowrap"
          >
            <span className="lg:hidden">DC</span>
            <span className="hidden lg:inline">Davide Condoluci</span>
          </a>

          {/* Center: spacer dot + testo */}
          <div className="flex items-center justify-center gap-2">
            <span
              ref={dotSpacerRef}
              className="h-2 w-2 shrink-0 invisible"
              aria-hidden="true"
            />
            <span className="font-sans text-base font-light text-white whitespace-nowrap">
              Open to collaborate
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center justify-end">
            {/* Mobile hamburger */}
            <button
              className="text-white lg:hidden"
              onClick={handleToggleMenu}
            >
              {menuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars2Icon className="w-6 h-6" />
              )}
            </button>

            {/* Desktop links */}
            <ul className="items-center hidden gap-8 font-sans text-base font-light text-white lg:flex">
              <li>
                <FlipLink
                  href="#about"
                  onClick={(e) => handleAnchorClick(e, "about")}
                  className="font-sans text-base font-light text-white"
                >
                  About
                </FlipLink>
              </li>
              <li>
                <FlipLink
                  href="#work"
                  onClick={(e) => handleAnchorClick(e, "work")}
                  className="font-sans text-base font-light text-white"
                >
                  Work
                </FlipLink>
              </li>
              <li>
                <FlipLink
                  href="#contact"
                  onClick={(e) => handleAnchorClick(e, "contact")}
                  className="font-sans text-base font-light text-white"
                >
                  Contact
                </FlipLink>
              </li>
              <li>
                <a
                  href={cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 pl-2 pr-4 transition-all duration-300 ease-in-out border border-white rounded-full group h-9 hover:bg-white hover:pl-1"
                >
                  <span className="p-1 transition-colors duration-300 bg-white rounded-full group-hover:bg-black">
                    <ArrowUpRightIcon
                      className="block w-0 h-0 translate-x-[200%] transition-all duration-300 group-hover:translate-x-0 group-hover:w-5 group-hover:h-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="font-sans text-base font-light text-white transition-colors duration-300 group-hover:text-black">
                    Resume
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white lg:hidden"
        >
          <ul className="flex flex-col items-center gap-8">
            <li>
              <FlipLink
                href="#about"
                onClick={(e) => handleAnchorClick(e, "about")}
                className="font-sans text-4xl font-light text-black"
              >
                About
              </FlipLink>
            </li>
            <li>
              <FlipLink
                href="#work"
                onClick={(e) => handleAnchorClick(e, "work")}
                className="font-sans text-4xl font-light text-black"
              >
                Work
              </FlipLink>
            </li>
            <li>
              <FlipLink
                href="#contact"
                onClick={(e) => handleAnchorClick(e, "contact")}
                className="font-sans text-4xl font-light text-black"
              >
                Contact
              </FlipLink>
            </li>
            <li>
              <a
                href={cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center h-16 gap-4 pl-4 pr-6 transition-all duration-300 ease-in-out border border-black rounded-full group hover:bg-black hover:pl-3"
              >
                <span className="flex items-center justify-center w-4 h-4 transition-colors duration-300 bg-black rounded-full shrink-0 group-hover:bg-white">
                  <ArrowUpRightIcon
                    className="block w-3 h-3 -translate-x-[200%] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-black"
                    aria-hidden="true"
                  />
                </span>
                <span className="font-sans text-4xl font-light text-black transition-colors duration-300 group-hover:text-white">
                  Resume
                </span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
