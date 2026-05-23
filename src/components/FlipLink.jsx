import { useRef, useEffect } from "react";
import gsap from "gsap";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href, onClick, target, rel, className = "" }) => {
  const containerRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const letters = String(children).split("");

  useEffect(() => {
    const container = containerRef.current;
    const topLetters = topRef.current?.querySelectorAll("span");
    const bottomLetters = bottomRef.current?.querySelectorAll("span");
    if (!container || !topLetters || !bottomLetters) return;

    gsap.set(bottomLetters, { y: "100%" });

    const onEnter = () => {
      gsap.to(topLetters, { y: "-100%", duration: DURATION, ease: "power2.inOut", stagger: STAGGER });
      gsap.to(bottomLetters, { y: 0, duration: DURATION, ease: "power2.inOut", stagger: STAGGER });
    };
    const onLeave = () => {
      gsap.to(topLetters, { y: 0, duration: DURATION, ease: "power2.inOut", stagger: STAGGER });
      gsap.to(bottomLetters, { y: "100%", duration: DURATION, ease: "power2.inOut", stagger: STAGGER });
    };

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(topLetters);
      gsap.killTweensOf(bottomLetters);
    };
  }, []);

  return (
    <a
      ref={containerRef}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`relative block overflow-hidden whitespace-nowrap leading-[1.2] ${className}`}
    >
      <div ref={topRef}>
        {letters.map((l, i) => (
          <span key={i} className="inline-block">
            {l === " " ? " " : l}
          </span>
        ))}
      </div>
      <div ref={bottomRef} className="absolute inset-0">
        {letters.map((l, i) => (
          <span key={i} className="inline-block">
            {l === " " ? " " : l}
          </span>
        ))}
      </div>
    </a>
  );
};

export default FlipLink;
