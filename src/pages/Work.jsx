import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import projects from "../data/projects.json";

const TITLE_LINES = ["Selected", "Work"];

const Work = () => {
  const titleRef = useRef(null);
  const cursorRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ul = titleRef.current;
    if (!ul) return;

    const letters = ul.querySelectorAll(".work-letter");

    const tween = gsap.to(letters, {
      yPercent: 100,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ul,
        start: "33.33% bottom",
        end: "100% 80%",
        scrub: 1,
      },
      stagger: {
        each: 0.05,
        from: "random",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
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
    const grid = cardsRef.current;
    if (!grid) return;
    const cards = Array.from(grid.children);
    if (!cards.length) return;
    gsap.set(cards, { opacity: 0, y: 50 });
    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: grid,
        start: "top 85%",
        once: true,
        invalidateOnRefresh: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [projects]);

  return (
    <>
      {/* Custom cursor — desktop only */}
      <div
        ref={cursorRef}
        className="hidden lg:flex fixed top-0 left-0 z-9999 pointer-events-none items-center justify-center rounded-full bg-black text-white w-20 h-20 -ml-7 -mt-7 opacity-0 transition-opacity duration-200"
      >
        <ArrowUpRightIcon className="w-9 h-9" aria-hidden="true" />
      </div>

      <section
        id="work"
        className="flex flex-col items-center justify-center px-6 pt-24 pb-24 lg:pt-60 lg:pb-60"
      >
        {/* mwg_027 title effect */}
        <ul
          ref={titleRef}
          className="flex flex-col items-center w-full mb-16 list-none lg:mb-40"
        >
          {TITLE_LINES.map((line, li) => (
            <li
              key={li}
              className="flex overflow-hidden font-sans font-medium leading-none"
              style={{ fontSize: "clamp(86px, 18vw, 300px)" }}
            >
              {line.split("").map((char, i) => (
                <span key={i} className="relative inline-block work-letter">
                  <span>{char}</span>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 bottom-full"
                  >
                    {char}
                  </span>
                </span>
              ))}
            </li>
          ))}
        </ul>

        <div
          ref={cardsRef}
          className="grid w-full grid-cols-1 gap-6 mx-auto md:grid-cols-5"
        >
          {projects.map((project, index) => {
            const total = projects.length;
            const isLastAlone = total % 2 !== 0 && index === total - 1;
            const rowIndex = Math.floor(index / 2);
            const posInRow = index % 2;
            let spanClass;
            if (isLastAlone) {
              spanClass = "md:col-span-3";
            } else if (rowIndex % 2 === 0) {
              spanClass = posInRow === 0 ? "md:col-span-3" : "md:col-span-2";
            } else {
              spanClass = posInRow === 0 ? "md:col-span-2" : "md:col-span-3";
            }
            return (
              <div key={index} className={`w-full ${spanClass}`}>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block lg:cursor-none group"
                  data-hide-cursor
                  onMouseEnter={() => {
                    if (cursorRef.current)
                      cursorRef.current.style.opacity = "1";
                    window.dispatchEvent(
                      new CustomEvent("custom-cursor-active", {
                        detail: { active: true },
                      }),
                    );
                  }}
                  onMouseLeave={() => {
                    if (cursorRef.current)
                      cursorRef.current.style.opacity = "0";
                    window.dispatchEvent(
                      new CustomEvent("custom-cursor-active", {
                        detail: { active: false },
                      }),
                    );
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square md:aspect-auto md:h-128">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                    {/* Tags always visible on mobile, hover-only on desktop */}
                    <div className="absolute inset-0 flex flex-col justify-start p-5 opacity-100 lg:bg-black/20 lg:backdrop-blur-sm lg:opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100">
                      <div className="flex flex-wrap gap-2">
                        {project.programs.map((prog, pi) => (
                          <span
                            key={pi}
                            className="px-2 py-1 font-sans text-sm font-light text-white rounded-lg bg-white/20 backdrop-blur-md"
                          >
                            {prog}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
                <div className="mt-4 space-y-2">
                  <h3 className="font-serif text-2xl italic font-light lg:text-4xl">
                    {project.title}
                  </h3>
                  <p className="font-sans text-base font-light text-black/40">
                    {project.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Work;
