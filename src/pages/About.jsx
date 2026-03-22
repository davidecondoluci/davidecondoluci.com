import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT_WORDS = new Set([
  "minimal",
  "functionality",
  "animations",
  "detail",
  "interactive",
]);

const ABOUT_TEXT =
  "Passionate about web and graphic design, I craft minimal experiences with a creative touch. I love designing interfaces where aesthetics meet functionality, enhanced by playful animations. Attention to detail drives me to create designs that are both memorable and dynamic, delivering smooth and interactive journeys.";

const About = () => {
  const paragraphRef = useRef(null);
  const photoMobileRef = useRef(null);
  const photoDesktopRef = useRef(null);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;

    const text = ABOUT_TEXT;

    paragraph.innerHTML = text
      .trim()
      .split(/\s+/)
      .map((word) => {
        const clean = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
        const isAccent = ACCENT_WORDS.has(clean);
        const disperse = Math.floor(Math.random() * 4);
        const paddingStyle =
          disperse === 1
            ? "padding-left:0.8em"
            : disperse === 2
              ? "padding-right:1.6em"
              : disperse === 3
                ? "padding-left:2.4em"
                : "";
        const accentStyle = isAccent
          ? "font-family:'Fraunces 72pt',serif;font-style:italic;font-weight:300"
          : "";
        const style = [paddingStyle, accentStyle].filter(Boolean).join(";");
        return `<span class="inline-block word${disperse}"${style ? ` style="${style}"` : ""}>${word}</span>`;
      })
      .join(" ");

    const tweens = [];

    paragraph.querySelectorAll(".word1, .word2, .word3").forEach((el) => {
      let fromX = 0;
      if (el.classList.contains("word1")) fromX = "-0.8em";
      else if (el.classList.contains("word2")) fromX = "1.6em";
      else if (el.classList.contains("word3")) fromX = "-2.4em";

      tweens.push(
        gsap.fromTo(
          el,
          { x: fromX },
          {
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 60%",
              scrub: 0.2,
            },
          },
        ),
      );
    });

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  useEffect(() => {
    const photoTweens = [];
    [photoMobileRef, photoDesktopRef].forEach((ref) => {
      if (!ref.current) return;
      photoTweens.push(
        gsap.fromTo(
          ref.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          },
        ),
      );
    });
    return () => {
      photoTweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section id="about" className="pt-24 lg:pt-60">
      {/* Mobile: photo centered on top */}
      <div className="flex justify-center px-6 mb-8 lg:hidden">
        <div
          ref={photoMobileRef}
          className="overflow-hidden rounded-full w-36 h-36"
        >
          <img
            src="/img/photo.jpg"
            alt="Davide Condoluci"
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>

      <div className="flex justify-between px-6">
        {/* Left: animated text */}
        <div className="w-full lg:w-[50vw] lg:pr-8">
          <p
            ref={paragraphRef}
            className="font-sans font-light leading-tight tracking-tight text-[clamp(18px,5vw,48px)] text-center lg:text-left"
          />
        </div>

        {/* Right: sticky photo — desktop only */}
        <div className="hidden shrink-0 lg:block">
          <div
            ref={photoDesktopRef}
            className="sticky top-[calc(50vh-14vw)] w-[28vw] h-[28vw] rounded-full overflow-hidden"
          >
            <img
              src="/img/photo.jpg"
              alt="Davide Condoluci"
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
