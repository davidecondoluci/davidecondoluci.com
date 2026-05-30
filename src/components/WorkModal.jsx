import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";

const WorkModal = ({ project, onClose }) => {
  const modalRef = useRef(null);
  const closingRef = useRef(false);

  const handleClose = useCallback(() => {
    if (closingRef.current || !modalRef.current) return;
    closingRef.current = true;
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 24,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    window.dispatchEvent(
      new CustomEvent("lenis-toggle", { detail: { stop: true } }),
    );

    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.38,
          ease: "power2.out",
          onComplete: () => gsap.set(modalRef.current, { clearProps: "transform,will-change" }),
        },
      );
    }

    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.style.overflow = "";
      window.dispatchEvent(
        new CustomEvent("lenis-toggle", { detail: { stop: false } }),
      );
      window.removeEventListener("keydown", onKey);
    };
  }, [handleClose]);

  const gallery = project.gallery ?? [];
  const hasGallery = gallery.length > 0;

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-200 bg-white overflow-y-auto overscroll-y-contain"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white/90 backdrop-blur-sm border-b border-black/10">
        <button
          onClick={handleClose}
          className="flex items-center gap-2 font-sans text-base font-light hover:opacity-60 transition-opacity duration-200"
        >
          <ArrowLeftIcon className="w-6 h-6" />
          Back
        </button>
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-sm font-light border border-black rounded-full px-4 py-2 hover:bg-black hover:text-white transition-colors duration-200"
            >
              GitHub
              <ArrowUpRightIcon className="w-4 h-4" />
            </a>
          )}
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-sans text-sm font-light bg-black text-white border border-black rounded-full px-4 py-2 hover:bg-white hover:text-black transition-colors duration-200"
          >
            Visit Site
            <ArrowUpRightIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-10 pb-24">
        {/* Title */}
        <h2 className="font-serif text-4xl italic font-light md:text-5xl lg:text-6xl mb-4">
          {project.title}
        </h2>

        {/* Short description */}
        <p className="font-sans text-base font-light text-black/50 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.programs.map((prog, i) => (
            <span
              key={i}
              className="px-2 py-1 font-sans text-sm font-light text-black rounded-md bg-black/10 backdrop-blur-md"
            >
              {prog}
            </span>
          ))}
        </div>

        {/* Gallery */}
        {hasGallery && (
          <div className="flex flex-col gap-4 mb-12">
            <div className="overflow-hidden rounded-xl border border-black/10">
              <img
                src={gallery[0]}
                alt={`${project.title} 1`}
                className="w-full h-auto block"
                decoding="async"
              />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {gallery.slice(1).map((img, i, arr) => {
                  const isLastAlone =
                    i === arr.length - 1 && arr.length % 2 !== 0;
                  return (
                    <div
                      key={i}
                      className={`overflow-hidden rounded-xl border border-black/10 ${isLastAlone ? "col-span-2" : ""}`}
                    >
                      <img
                        src={img}
                        alt={`${project.title} ${i + 2}`}
                        className="w-full h-auto block"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Long description */}
        {project.longDescription && (
          <p className="font-sans text-base font-light text-black/70 leading-relaxed">
            {project.longDescription}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default WorkModal;
