import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { Bars2Icon, XMarkIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import FlipLink from "./FlipLink";

const menuVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.25 } },
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const [time, setTime] = useState("");

  const cvPath = "/pdf/Condoluci_Davide_cv_EN.pdf";

  // Live clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

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

  const handleAnchorClick = (e, sectionId) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navbar — mix-blend-difference always; menu bg below handles color inversion */}
      <div
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 mix-blend-difference"
      >
        <nav className="grid grid-cols-3 items-center w-full max-w-[1600px] mx-auto">
          {/* Left: Name */}
          <a
            href="#hero"
            onClick={(e) => handleAnchorClick(e, "hero")}
            className="font-sans text-base font-light text-white whitespace-nowrap"
          >
            <span className="lg:hidden">DC</span>
            <span className="hidden lg:inline">Davide Condoluci</span>
          </a>

          {/* Center: Live clock */}
          <span className="font-sans text-base font-light text-center text-white tabular-nums">
            {time}
          </span>

          {/* Right */}
          <div className="flex items-center justify-end">
            {/* Mobile hamburger */}
            <button
              className="text-white lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <XMarkIcon className="w-[22px] h-[22px]" />
              ) : (
                <Bars2Icon className="w-[22px] h-[22px]" />
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
                      className="block w-5 h-5 -translate-x-[200%] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-white"
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

      {/* Mobile menu — outside blend-mode container */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.ul
              className="flex flex-col items-center gap-8"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.li variants={itemVariants}>
                <FlipLink
                  href="#about"
                  onClick={(e) => handleAnchorClick(e, "about")}
                  className="font-sans text-4xl font-light text-black"
                >
                  About
                </FlipLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <FlipLink
                  href="#work"
                  onClick={(e) => handleAnchorClick(e, "work")}
                  className="font-sans text-4xl font-light text-black"
                >
                  Work
                </FlipLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <FlipLink
                  href="#contact"
                  onClick={(e) => handleAnchorClick(e, "contact")}
                  className="font-sans text-4xl font-light text-black"
                >
                  Contact
                </FlipLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a
                  href={cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center h-16 gap-3 pl-3 pr-6 transition-all duration-300 ease-in-out border border-black rounded-full group hover:bg-black hover:pl-2"
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
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
