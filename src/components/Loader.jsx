import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const countEl = countRef.current;
    const bar = barRef.current;
    const label = labelRef.current;

    const obj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(bar, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.to(loader, {
              clipPath: "inset(0 0 100% 0)",
              duration: 0.9,
              ease: "power4.inOut",
              onComplete: () => {
                if (onComplete) onComplete();
              },
            });
          },
        });
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.floor(obj.val);
        countEl.textContent = `${v}%`;
        bar.style.transform = `scaleX(${obj.val / 100})`;
      },
    })
      .to(
        label,
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.1",
      )
      .to(
        countEl,
        {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.in",
        },
        "<",
      );

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-999999 flex flex-col items-center justify-center bg-white"
    >
      {/* Percentage */}
      <span
        ref={countRef}
        className="font-sans text-6xl font-medium text-black md:text-9xl"
      >
        0%
      </span>

      {/* Label */}
      <span
        ref={labelRef}
        className="mt-4 font-serif text-base italic font-light md:text-2xl text-black/60"
      >
        Loading...
      </span>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2">
        <div
          ref={barRef}
          className="h-full origin-left bg-black"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
};

export default Loader;
