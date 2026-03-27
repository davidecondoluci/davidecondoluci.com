import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import UnderlineLink from "../components/UnderlineLink";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const REPEAT_COUNT = 6;
const TEXT = "Get in touch · ";

const BackTop = () => {
  return (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="relative grid w-20 h-20 transition-colors duration-500 ease-out border border-white rounded-full shrink-0 group place-content-center lg:border-white/30 lg:hover:border-white"
    >
      <ArrowUpIcon
        className="pointer-events-none relative z-10 w-9 h-9 text-black lg:text-white transition-all duration-500 ease-out lg:group-hover:text-black group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-0 transition-transform duration-500 ease-out scale-100 bg-white rounded-full pointer-events-none lg:scale-0 lg:group-hover:scale-100" />

      {/* Rotating circular text */}
      <motion.svg
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
        width="88"
        height="88"
        className="absolute z-10 pointer-events-none"
      >
        <path
          id="backTopCircle"
          d="M44,44 m-36,0 a36,36 0 1,0 72,0 a36,36 0 1,0 -72,0"
          fill="none"
        />
        <text>
          <textPath
            href="#backTopCircle"
            textLength="226"
            lengthAdjust="spacing"
            style={{ fontSize: 8 }}
            className="uppercase transition-all duration-500 ease-out opacity-100 lg:opacity-0 lg:group-hover:opacity-100 fill-black lg:fill-white lg:group-hover:fill-black"
          >
            {
              "Back to top\u00A0\u00A0·\u00A0\u00A0Back to top\u00A0\u00A0·\u00A0\u00A0"
            }
          </textPath>
        </text>
      </motion.svg>
    </a>
  );
};

const Contact = () => {
  const marqueeRef = useRef(null);
  const firstCopyRef = useRef(null);
  const cursorRef = useRef(null);
  const descRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const el = marqueeRef.current;
    const first = firstCopyRef.current;
    if (!el || !first) return;

    let tween;
    document.fonts.ready.then(() => {
      const singleWidth = first.getBoundingClientRect().width;
      tween = gsap.to(el, {
        x: -singleWidth,
        ease: "none",
        duration: 24,
        repeat: -1,
      });
    });

    return () => tween?.kill();
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: true,
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const desc = descRef.current;
    const footer = footerRef.current;
    if (!desc || !footer) return;

    const tweens = [
      gsap.fromTo(
        desc,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: desc, start: "top 85%", once: true },
        },
      ),
      gsap.fromTo(
        Array.from(footer.children),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: footer, start: "top 90%", once: true },
        },
      ),
    ];

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  const repeated = Array(REPEAT_COUNT).fill(TEXT).join("");

  return (
    <>
      {/* Custom cursor — desktop only */}
      <div
        ref={cursorRef}
        className="hidden lg:flex fixed top-0 left-0 z-9999 pointer-events-none items-center justify-center rounded-full bg-white text-gray-950 w-24 h-24 -ml-12 -mt-12 opacity-0 transition-opacity duration-200"
      >
        <span className="font-sans text-sm font-light leading-tight text-center">
          Write me
        </span>
      </div>

      <section id="contact" className="flex flex-col text-white bg-black h-dvh">
        {/* Marquee — centered, fills available space */}
        <div className="flex flex-col items-center justify-center flex-1 gap-8 overflow-hidden">
          <p
            ref={descRef}
            className="max-w-md px-6 font-sans text-base font-light text-center text-white shrink-0"
          >
            Have a project in mind, a question, or just want to collaborate?
            Drop me a line by clicking below.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=davide.condoluci1@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full overflow-hidden lg:cursor-none"
            onMouseEnter={() => {
              if (cursorRef.current) cursorRef.current.style.opacity = "1";
              window.dispatchEvent(
                new CustomEvent("custom-cursor-active", {
                  detail: { active: true },
                }),
              );
            }}
            onMouseLeave={() => {
              if (cursorRef.current) cursorRef.current.style.opacity = "0";
              window.dispatchEvent(
                new CustomEvent("custom-cursor-active", {
                  detail: { active: false },
                }),
              );
            }}
          >
            <p
              ref={marqueeRef}
              className="flex font-serif text-6xl italic font-light whitespace-nowrap w-max will-change-transform lg:text-9xl"
            >
              <span ref={firstCopyRef}>{repeated}</span>
              <span aria-hidden="true">{repeated}</span>
            </p>
          </a>
        </div>

        {/* Footer — anchored to bottom */}
        <div className="px-6 py-6">
          <div
            ref={footerRef}
            className="flex flex-col gap-4 lg:grid lg:items-end lg:grid-cols-3"
          >
            {/* Social */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-xs font-light tracking-widest uppercase text-white/60">
                  Social
                </span>
                <div className="flex gap-6">
                  <UnderlineLink
                    href="https://github.com/davidecondoluci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-base font-light"
                  >
                    Github
                  </UnderlineLink>
                  <UnderlineLink
                    href="https://www.linkedin.com/in/davidecondoluci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-base font-light"
                  >
                    Linkedin
                  </UnderlineLink>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-xs font-light tracking-widest uppercase text-white/60">
                  Email
                </span>
                <UnderlineLink
                  href="mailto:davide.condoluci1@gmail.com"
                  className="font-sans text-base font-light"
                >
                  davide.condoluci1@gmail.com
                </UnderlineLink>
              </div>
            </div>
            {/* Center: copyright — desktop only */}
            <span className="hidden font-sans text-base font-light text-center lg:block text-white/60">
              © 2026 Davide Condoluci
            </span>
            {/* Right: copyright (mobile) + back-to-top */}
            <div className="flex items-center justify-between lg:justify-end">
              <span className="font-sans text-sm font-light text-white/60 lg:hidden">
                © 2026 Davide Condoluci
              </span>
              <BackTop />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
