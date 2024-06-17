import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../App.css";

const PlusGrid = () => {
  const canvasRef = useRef(null);
  const signs = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const gridLength = 9;
  const mouseOver = useRef(false);
  const mouseMoved = useRef(false);

  useEffect(() => {
    const c = canvasRef.current;
    const context = c.getContext("2d");
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    class Plus {
      constructor() {
        this.x = 0;
        this.y = 0;
        this.top = 0;
        this.left = 0;
        this.height = 0;
        this.width = 0;
        this.scale = 1;
      }

      draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.setTransform(
          this.scale,
          0,
          0,
          this.scale,
          this.left + this.x,
          this.top + this.y
        );
        ctx.lineWidth = 2;
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(0, this.height / 2);
        ctx.moveTo(-this.width / 2, 0);
        ctx.lineTo(this.width / 2, 0);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    }

    for (let i = 0; i < gridLength; i++) {
      signs.current[i] = [];
      for (let j = 0; j < gridLength; j++) {
        const min = Math.min(c.width, c.height);
        signs.current[i][j] = new Plus();
        signs.current[i][j].left = (c.width / (gridLength + 1)) * (i + 1);
        signs.current[i][j].top = (c.height / (gridLength + 1)) * (j + 1);
        signs.current[i][j].width = min / 50;
        signs.current[i][j].height = min / 50;
      }
    }

    gsap.ticker.add(draw);

    function draw() {
      context.clearRect(0, 0, c.width, c.height);

      if (mouseOver.current && mouseMoved.current) {
        calculateSigns();
        mouseMoved.current = false;
      }

      for (let i = 0; i < gridLength; i++) {
        for (let j = 0; j < gridLength; j++) {
          const sign = signs.current[i][j];
          sign.draw(context);
        }
      }
    }

    function calculateSigns() {
      for (let i = 0; i < gridLength; i++) {
        for (let j = 0; j < gridLength; j++) {
          const sign = signs.current[i][j];
          const hyp = Math.min(c.width, c.height) / (gridLength + 1) / 2;
          const d = dist(
            [sign.left, sign.top],
            [mouse.current.x, mouse.current.y]
          );

          const ax = mouse.current.x - sign.left;
          const ay = mouse.current.y - sign.top;
          const angle = Math.atan2(ay, ax);
          if (d < hyp + sign.width) {
            gsap.to(sign, { scale: 2, duration: 0.3 });
          } else {
            gsap.to(sign, { scale: 1, duration: 0.3 });
          }

          gsap.to(sign, {
            x: Math.cos(angle) * hyp,
            y: Math.sin(angle) * hyp,
            duration: 0.3,
          });
        }
      }
    }

    function mouseMove(e) {
      if (e.targetTouches && e.targetTouches[0]) {
        e = e.targetTouches[0];
      }
      const rect = c.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouseMoved.current = true;
    }

    function mouseLeave() {
      mouseOver.current = false;

      for (let i = 0; i < gridLength; i++) {
        for (let j = 0; j < gridLength; j++) {
          const sign = signs.current[i][j];
          gsap.to(sign, { x: 0, y: 0, scale: 1, duration: 0.3 });
        }
      }
    }

    c.addEventListener("mousemove", mouseMove);
    c.addEventListener("touchmove", mouseMove);
    c.addEventListener("mouseenter", () => {
      mouseOver.current = true;
    });
    c.addEventListener("touchstart", (e) => {
      mouseOver.current = true;
      mouseMove(e);
    });
    c.addEventListener("mouseleave", mouseLeave);
    c.addEventListener("touchend", mouseLeave);

    window.addEventListener("resize", () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      for (let i = 0; i < gridLength; i++) {
        for (let j = 0; j < gridLength; j++) {
          const min = Math.min(c.width, c.height);
          const sign = signs.current[i][j];
          sign.left = (c.width / (gridLength + 1)) * (i + 1);
          sign.top = (c.height / (gridLength + 1)) * (j + 1);
          sign.width = min / 50;
          sign.height = min / 50;
        }
      }
    });

    function dist([x1, y1], [x2, y2]) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy) || 1;
    }

    return () => {
      gsap.ticker.remove(draw);
      c.removeEventListener("mousemove", mouseMove);
      c.removeEventListener("touchmove", mouseMove);
      c.removeEventListener("mouseenter", () => {
        mouseOver.current = true;
      });
      c.removeEventListener("touchstart", (e) => {
        mouseOver.current = true;
        mouseMove(e);
      });
      c.removeEventListener("mouseleave", mouseLeave);
      c.removeEventListener("touchend", mouseLeave);
      window.removeEventListener("resize", () => {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        for (let i = 0; i < gridLength; i++) {
          for (let j = 0; j < gridLength; j++) {
            const min = Math.min(c.width, c.height);
            const sign = signs.current[i][j];
            sign.left = (c.width / (gridLength + 1)) * (i + 1);
            sign.top = (c.height / (gridLength + 1)) * (j + 1);
            sign.width = min / 50;
            sign.height = min / 50;
          }
        }
      });
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
  );
};

export default PlusGrid;
