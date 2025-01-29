import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { VscCode } from "react-icons/vsc";

const CodeEffect = () => {
  const [prevCoords, setPrevCoords] = useState({ x: 0, y: 0 });
  const [isEffectActive, setIsEffectActive] = useState(true);

  useEffect(() => {
    const lgBreakpoint = 1024;

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < lgBreakpoint) {
        setIsEffectActive(false);
      } else {
        setIsEffectActive(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isEffectActive || "ontouchstart" in window) return; // Skip if touch device or effect is disabled

    const dist_to_draw = 50;
    const delay = 1000;
    const fsize = ["text-sm", "text-lg", "text-xs", "text-xl"];
    const colors = [
      "text-gray",
      "text-lightgray",
      "text-green",
      "text-lightgreen",
      "text-white",
      "text-black",
    ];

    const rand = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const selRand = (arr) => arr[rand(0, arr.length - 1)];
    const distanceTo = (x1, y1, x2, y2) =>
      Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    const shouldDraw = (x, y) =>
      distanceTo(prevCoords.x, prevCoords.y, x, y) >= dist_to_draw;

    const addStr = (x, y) => {
      const str = document.createElement("div");
      str.className = `star absolute z-20 ${selRand(colors)} ${selRand(fsize)}`;
      str.style.top = `${y + rand(-20, 20)}px`;
      str.style.left = `${x}px`;
      document.body.appendChild(str);

      const root = createRoot(str);
      root.render(<VscCode size="2em" />);

      const fs = 10 + 5 * parseFloat(getComputedStyle(str).fontSize);

      str.animate(
        {
          transform: `translateY(${
            y + fs > window.innerHeight ? window.innerHeight - y : fs
          }px) rotateX(${rand(1, 500)}deg) rotateY(${rand(1, 500)}deg)`,
          opacity: 0,
        },
        {
          duration: delay,
          fill: "forwards",
        }
      );

      setTimeout(() => {
        root.unmount();
        str.remove();
      }, delay);
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (shouldDraw(clientX, clientY)) {
        addStr(clientX, clientY);
        setPrevCoords({ x: clientX, y: clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [prevCoords, isEffectActive]);

  return null;
};

export default CodeEffect;
