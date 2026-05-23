import { useEffect, useRef } from "react";
import gsap from "gsap";
import UnderlineLink from "../components/UnderlineLink";
import Marquee from "react-fast-marquee";

const Contact = () => {
  const cursorRef = useRef(null);
  const descRef = useRef(null);

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
    if (!desc) return;

    const tween = gsap.fromTo(
      desc,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: desc, start: "top 85%", once: true },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <>
      {/* Custom cursor — desktop only */}
      <div
        ref={cursorRef}
        className="hidden lg:flex fixed top-0 left-0 z-9999 pointer-events-none items-center justify-center rounded-full bg-white text-gray-950 w-20 h-20 -ml-10 -mt-10 opacity-0 transition-opacity duration-200"
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
            className="font-sans text-base font-light text-center text-white shrink-0"
          >
            Have a project in mind, a question, or just want to collaborate?
            <br />
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
                new CustomEvent("custom-cursor-active", { detail: { active: true } }),
              );
            }}
            onMouseLeave={() => {
              if (cursorRef.current) cursorRef.current.style.opacity = "0";
              window.dispatchEvent(
                new CustomEvent("custom-cursor-active", { detail: { active: false } }),
              );
            }}
          >
            <Marquee speed={80} autoFill className="font-serif text-[18vw] leading-none italic font-light">
              Get in touch&nbsp;·&nbsp;
            </Marquee>
          </a>
        </div>

        {/* Footer — anchored to bottom */}
        <div className="px-6 py-6">
          <div className="flex flex-col gap-4 lg:grid lg:items-end lg:grid-cols-3">
            {/* Social */}
            <div className="flex flex-col gap-2">
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

            {/* Center: copyright — desktop only */}
            <span className="hidden font-sans text-base font-light text-center lg:block text-white/60">
              © 2026 Davide Condoluci
            </span>

            {/* Email */}
            <div className="flex flex-col gap-1 lg:items-end">
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

            {/* Copyright — mobile only */}
            <span className="font-sans text-sm font-light text-white/60 lg:hidden">
              © 2026 Davide Condoluci
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
