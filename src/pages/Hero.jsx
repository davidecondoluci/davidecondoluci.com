import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

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
  "/img/icons/sass.svg",
  "/img/icons/bootstrap.svg",
  "/img/icons/php.svg",
  "/img/icons/wordpress.svg",
  "/img/icons/npm.svg",
  "/img/icons/gsap.svg",
  "/img/icons/framer.svg",
  "/img/icons/threejs.svg",
  "/img/icons/firebase.svg",
  "/img/icons/figma.svg",
  "/img/icons/illustrator.svg",
  "/img/icons/vscode.svg",
  "/img/icons/github.svg",
  "/img/icons/gitlab.svg",
  "/img/icons/mui.svg",
  "/img/icons/alpine.svg",
  "/img/icons/filezilla.svg",
  "/img/icons/xml.svg",
];

const Hero = () => {
  const containerRef = useRef(null);
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
    const container = containerRef.current;
    if (!container) return;

    const icons = ALL_ICONS;
    let incr = 0,
      oldIncr = 0,
      firstMove = true,
      indexImg = 0;
    const resetDist = window.innerWidth / 15;

    function spawnIcon(x, y) {
      const img = document.createElement("img");
      img.src = icons[indexImg];
      img.style.cssText =
        "width:clamp(40px,7vw,80px);height:clamp(40px,7vw,80px);object-fit:contain;position:absolute;top:0;left:0;z-index:5;pointer-events:none;";
      container.appendChild(img);

      const tl = gsap.timeline({
        onComplete: () => {
          if (container.contains(img)) container.removeChild(img);
          tl.kill();
        },
      });

      tl.fromTo(
        img,
        {
          x,
          y,
          yPercent: -50 + (Math.random() - 0.5) * 10,
          xPercent: -50 + (Math.random() - 0.5) * 80,
          rotation: (Math.random() - 0.5) * 20,
          scaleX: 1.3,
          scaleY: 1.3,
        },
        {
          scaleX: 1,
          scaleY: 1,
          ease: "elastic.out(2, 0.6)",
          duration: 0.6,
        },
      ).to(img, {
        duration: 0.3,
        scale: 0.5,
        delay: 0.1,
        ease: "back.in(1.5)",
      });

      indexImg = (indexImg + 1) % icons.length;
    }

    function onMouseMove(e) {
      const val = e.clientX;
      if (firstMove) {
        firstMove = false;
        oldIncr = val;
        return;
      }
      incr += Math.abs(val - oldIncr);
      oldIncr = val;
      if (incr > resetDist) {
        incr = 0;
        spawnIcon(e.clientX, e.clientY - container.getBoundingClientRect().top);
      }
    }

    function onTouchStart(e) {
      const touch = e.touches[0];
      spawnIcon(
        touch.clientX,
        touch.clientY - container.getBoundingClientRect().top,
      );
    }

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

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
      ref={containerRef}
      className="relative flex flex-col items-center justify-center overflow-hidden text-center select-none h-dvh"
    >
      <h1
        ref={heroTitleRef}
        className="z-10 flex flex-col items-center gap-0 px-4 text-center md:flex-row md:items-baseline md:gap-4 mix-blend-difference"
      >
        <span className="font-sans text-6xl font-medium text-white md:text-9xl">
          Frontend
        </span>
        <span className="font-serif text-6xl italic font-light text-white md:text-9xl">
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
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "1.1em" }}
        >
          arrow_downward
        </span>
      </p>
    </section>
  );
};

export default Hero;
