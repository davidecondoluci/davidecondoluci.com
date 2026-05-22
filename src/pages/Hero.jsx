import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

const AnimatedRole = ({ roles }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(id);
  }, [roles]);

  const longest = roles.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <span className="relative inline-block">
      <span className="invisible" aria-hidden>
        {longest}
      </span>
      {roles.map((role, i) => (
        <motion.span
          key={role}
          initial={false}
          animate={i === active ? "active" : "inactive"}
          variants={{
            active: { opacity: 1, scale: 1 },
            inactive: { opacity: 0, scale: 0 },
          }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
        >
          {role}
        </motion.span>
      ))}
    </span>
  );
};

const ALL_ICONS = [
  "/img/icons/html.svg",
  "/img/icons/css.svg",
  "/img/icons/javascript.svg",
  "/img/icons/react.svg",
  "/img/icons/next.svg",
  "/img/icons/vite.svg",
  "/img/icons/tailwind.svg",
  "/img/icons/wordpress.svg",
  "/img/icons/gsap.svg",
  "/img/icons/framer.svg",
  "/img/icons/firebase.svg",
  "/img/icons/figma.svg",
  "/img/icons/github.svg",
  "/img/icons/mui.svg",
  "/img/icons/typescript.svg",
];

const ScatteredIcons = () => {
  const containerRef = useRef(null);
  const iconsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const iconEls = iconsRef.current.filter(Boolean);
    if (!container || iconEls.length === 0) return;

    const { width, height } = container.getBoundingClientRect();
    const iconSize = Math.min(70, Math.max(40, width * 0.05));
    const edgePad = iconSize * 1.0;
    const minDist = iconSize * 2.6;
    const maxAttempts = 150;
    const positions = [];

    // Zona centrale riservata al titolo
    const zx1 = width * 0.18;
    const zx2 = width * 0.82;
    const zy1 = height * 0.33;
    const zy2 = height * 0.67;

    iconEls.forEach((el) => {
      let x, y, attempts = 0;
      do {
        x = edgePad + Math.random() * (width - 2 * edgePad - iconSize);
        y = edgePad + Math.random() * (height - 2 * edgePad - iconSize);
        attempts++;
      } while (
        attempts < maxAttempts &&
        (
          positions.some((p) => Math.hypot(p.x - x, p.y - y) < minDist) ||
          (
            x + iconSize / 2 > zx1 && x + iconSize / 2 < zx2 &&
            y + iconSize / 2 > zy1 && y + iconSize / 2 < zy2
          )
        )
      );

      positions.push({ x, y });
      gsap.set(el, { x, y, opacity: 0, scale: 0.6 });
    });

    // Entrance
    gsap.to(iconEls, {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: "back.out(1.4)",
      stagger: { each: 0.07, from: "random" },
    });

    // Floating
    iconEls.forEach((el) => {
      const floatAmt = 7 + Math.random() * 7;
      gsap.to(el, {
        y: `+=${floatAmt}`,
        duration: 2.2 + Math.random() * 1.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 2,
      });
    });

    return () => gsap.killTweensOf(iconEls);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
      {ALL_ICONS.map((src, i) => (
        <img
          key={src}
          ref={(el) => (iconsRef.current[i] = el)}
          src={src}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "clamp(40px, 5vw, 70px)",
            height: "clamp(40px, 5vw, 70px)",
            objectFit: "contain",
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const heroTitleRef = useRef(null);
  const heroRolesRef = useRef(null);
  const heroScrollRef = useRef(null);
  const roles = [
    "Curious Traveler",
    "Vintage Lover",
    "Lego Maniac",
    "Tech Enthusiast",
    "Runner",
    "Fashion Lover",
  ];

  useEffect(() => {
    const titleEl = heroTitleRef.current;
    const rolesEl = heroRolesRef.current;
    const scrollEl = heroScrollRef.current;
    if (!titleEl || !rolesEl || !scrollEl) return;

    gsap.set([Array.from(titleEl.children), rolesEl, scrollEl], {
      opacity: 0,
    });

    const run = () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(Array.from(titleEl.children), {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        startAt: { y: 60 },
      })
        .to(
          rolesEl,
          { y: 0, opacity: 1, duration: 0.7, startAt: { y: 20 } },
          "-=0.4",
        )
        .to(scrollEl, { opacity: 1, duration: 0.6 }, "-=0.3");
    };

    window.addEventListener("site-ready", run, { once: true });
    return () => window.removeEventListener("site-ready", run);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden text-center select-none h-dvh"
    >
      <ScatteredIcons />
      <h1
        ref={heroTitleRef}
        className="z-10 flex flex-col items-center gap-0 px-4 text-center md:flex-row md:items-baseline md:gap-4 mix-blend-difference"
      >
        <span className="font-sans text-[18vw] font-medium leading-none text-white md:text-[9vw]">
          Front-End
        </span>
        <span className="font-serif text-[18vw] italic font-light leading-none text-white md:text-[9vw]">
          Developer
        </span>
      </h1>

      <div
        ref={heroRolesRef}
        className="relative z-10 flex flex-col items-center px-4 mt-4 font-sans text-2xl font-light text-white md:text-4xl mix-blend-difference"
      >
        <span className="opacity-60">and also</span>
        <AnimatedRole roles={roles} />
      </div>

      <p
        ref={heroScrollRef}
        className="absolute z-10 flex items-center gap-1 font-sans text-base font-light text-white -translate-x-1/2 bottom-10 left-1/2 mix-blend-difference"
      >
        Scroll for more
        <ArrowDownIcon className="w-[1.1em] h-[1.1em]" aria-hidden="true" />
      </p>
    </section>
  );
};

export default Hero;
