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
];

const OrbitIcons = () => {
  const containerRef = useRef(null);
  const iconsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const iconEls = iconsRef.current.filter(Boolean);
    const count = iconEls.length;
    if (!container || count === 0) return;

    const progress = { value: 0 };

    const updatePositions = () => {
      const { width, height } = container.getBoundingClientRect();
      const isMobile = width < 768;
      const rx = width * (isMobile ? 0.50 : 0.42);
      const ry = isMobile ? Math.min(height * 0.36, rx) : height * 0.35;
      const cx = width / 2;
      const cy = height / 2;

      iconEls.forEach((el, i) => {
        const baseAngle = (i / count) * Math.PI * 2;
        const angle = baseAngle + progress.value * Math.PI * 2;
        const x = cx + rx * Math.cos(angle) - el.offsetWidth / 2;
        const y = cy + ry * Math.sin(angle) - el.offsetHeight / 2;
        gsap.set(el, { x, y });
      });
    };

    updatePositions();

    // Entrance — simple fade, no scale pop
    gsap.fromTo(
      iconEls,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out", stagger: { each: 0.06, from: "random" } }
    );

    const tween = gsap.to(progress, {
      value: 1,
      duration: 45,
      ease: "none",
      repeat: -1,
      onUpdate: updatePositions,
    });

    window.addEventListener("resize", updatePositions);
    return () => {
      tween.kill();
      window.removeEventListener("resize", updatePositions);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
      {ALL_ICONS.map((src, i) => (
        <div
          key={src}
          ref={(el) => (iconsRef.current[i] = el)}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <img
            src={src}
            alt=""
            style={{
              width: "clamp(52px, 6vw, 80px)",
              height: "clamp(52px, 6vw, 80px)",
              objectFit: "contain",
            }}
          />
        </div>
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

    // Hide immediately so nothing flashes before the loader finishes
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
      <OrbitIcons />
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

      {/* Animated roles */}
      <div
        ref={heroRolesRef}
        className="relative z-10 flex flex-col items-center px-4 mt-4 font-sans text-xl font-light text-white md:text-4xl mix-blend-difference"
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
