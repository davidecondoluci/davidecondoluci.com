import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    paragraph.innerHTML = ABOUT_TEXT.trim()
      .split(/\s+/)
      .map((word) => {
        const clean = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
        const isAccent = ACCENT_WORDS.has(clean);
        const trailingPunct = word.match(/[^a-zA-Z]+$/)?.[0] ?? "";
        const wordText = trailingPunct ? word.slice(0, -trailingPunct.length) : word;
        const inner = isAccent
          ? `<span style="font-family:'Fraunces 72pt',serif;font-style:italic;font-weight:300">${wordText}</span>${trailingPunct}`
          : word;
        return `<span class="inline-block">${inner}</span>`;
      })
      .join(" ");

    const words = Array.from(paragraph.querySelectorAll("span.inline-block"));
    gsap.set(words, { opacity: 0, y: 18 });

    const tween = gsap.to(words, {
      opacity: 1,
      y: 0,
      ease: "none",
      stagger: { each: 0.015 },
      scrollTrigger: {
        trigger: paragraph,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
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
            className="font-sans font-light leading-tight tracking-tight text-[clamp(18px,5vw,48px)] text-left"
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
