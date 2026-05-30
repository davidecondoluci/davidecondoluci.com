import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

const AnimatedRole = ({ roles }) => {
  const activeRef = useRef(0);
  const spansRef = useRef([]);

  useEffect(() => {
    spansRef.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0 });
    });

    const id = setInterval(() => {
      const prev = activeRef.current;
      const next = (prev + 1) % roles.length;
      activeRef.current = next;

      const prevEl = spansRef.current[prev];
      const nextEl = spansRef.current[next];
      if (prevEl) gsap.to(prevEl, { opacity: 0, scale: 0, duration: 0.35, ease: "power2.inOut" });
      if (nextEl) gsap.to(nextEl, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.inOut" });
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
        <span
          key={role}
          ref={(el) => (spansRef.current[i] = el)}
          className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
        >
          {role}
        </span>
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
  "/img/icons/supabase.svg",
];

const ScatteredIcons = () => {
  const containerRef = useRef(null);
  const iconsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const iconEls = iconsRef.current.filter(Boolean);
    if (!container || iconEls.length === 0) return;

    let cancelled = false;
    let pauseTrigger = null;

    requestAnimationFrame(() => {
      if (cancelled) return;

      const { width, height } = container.getBoundingClientRect();
      const isMobile = width < 768;
      // Smaller icons on mobile so they fit in the strips above/below the text
      const iconSize = isMobile ? 36 : Math.min(70, Math.max(40, width * 0.05));
      const sidePad = iconSize;
      const topPad = iconSize;
      // Extra clearance at bottom to avoid the "Scroll for more" label
      const bottomPad = isMobile ? 100 : iconSize;
      const positions = [];

      // On mobile the title is stacked and spans full width — widen exclusion zone
      // so icons land only in the top/bottom strips, not on the text
      const zx1 = isMobile ? width * 0.03 : width * 0.17;
      const zx2 = isMobile ? width * 0.97 : width * 0.83;
      const zy1 = isMobile ? height * 0.20 : height * 0.32;
      const zy2 = isMobile ? height * 0.74 : height * 0.68;

      const inCenter = (cx, cy) =>
        cx > zx1 && cx < zx2 && cy > zy1 && cy < zy2;

      const findPos = (minD) => {
        for (let i = 0; i < 300; i++) {
          const x = sidePad + Math.random() * (width - sidePad * 2 - iconSize);
          const y = topPad + Math.random() * (height - topPad - bottomPad - iconSize);
          const cx = x + iconSize / 2, cy = y + iconSize / 2;
          if (!inCenter(cx, cy) && !positions.some((p) => Math.hypot(p.x - x, p.y - y) < minD)) {
            return { x, y };
          }
        }
        return null;
      };

      const placed = [];

      iconEls.forEach((el) => {
        if (isMobile) {
          el.style.width = `${iconSize}px`;
          el.style.height = `${iconSize}px`;
        }

        const pos =
          findPos(iconSize * 2.0) ??
          findPos(iconSize * 1.4) ??
          findPos(iconSize * 1.05);

        if (pos) {
          positions.push(pos);
          gsap.set(el, { x: pos.x, y: pos.y, opacity: 0, scale: 0.6 });
          placed.push(el);
        } else {
          gsap.set(el, { opacity: 0, scale: 0 });
        }
      });

      gsap.to(placed, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.4)",
        stagger: { each: 0.07, from: "random" },
      });

      placed.forEach((el) => {
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

      // Pause floating tweens when hero is off-screen to free up CPU
      pauseTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          placed.forEach((el) => {
            gsap.getTweensOf(el).forEach((t) => {
              if (self.isActive) t.resume();
              else t.pause();
            });
          });
        },
      });
    });

    return () => {
      cancelled = true;
      gsap.killTweensOf(iconEls);
      pauseTrigger?.kill();
    };
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
        className="z-10 flex flex-col items-center px-4 text-center md:flex-row md:items-baseline md:gap-4 mix-blend-difference"
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
        className="absolute z-10 flex items-center gap-2 font-sans text-base font-light text-white -translate-x-1/2 bottom-10 left-1/2 mix-blend-difference"
      >
        Scroll for more
        <ArrowDownIcon className="w-[1.1em] h-[1.1em]" aria-hidden="true" />
      </p>
    </section>
  );
};

export default Hero;
