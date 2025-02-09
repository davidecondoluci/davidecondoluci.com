import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  VscArrowLeft,
  VscChevronLeft,
  VscChevronRight,
  VscLink,
} from "react-icons/vsc";
import { motion } from "framer-motion";

const Popup = ({ project, handleClosePopup }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateScrollButtons);
    updateScrollButtons();
  }, [emblaApi, updateScrollButtons]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const popupVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 z-20 flex items-center justify-end bg-black bg-opacity-75"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onClick={handleClosePopup}
    >
      <motion.div
        className="relative bg-white p-8 shadow-lg w-full lg:w-2/5 h-full overflow-y-auto space-y-8"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={popupVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          className="flex items-center hover:underline text-black text-2xl space-x-2"
          onClick={handleClosePopup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <VscArrowLeft />
          <span className="text-base">Go back to projects</span>
        </motion.button>
        <div className="space-y-4">
          <motion.h2
            className="text-4xl font-serif font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {project.title}
          </motion.h2>
          <div className="relative w-full shadow-lg overflow-hidden rounded-lg">
            {project.screens && project.screens.length > 0 ? (
              <div className="embla" ref={emblaRef}>
                <div className="embla__container flex">
                  {project.screens.map((screen, index) => (
                    <div
                      className="embla__slide flex-shrink-0 w-full"
                      key={index}
                    >
                      <img
                        src={screen}
                        alt={`${project.title} project img ${index + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gray-200 rounded-lg">
                <span className="text-gray-500">No images available</span>
              </div>
            )}
            {project.screens && project.screens.length > 0 && (
              <>
                <button
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white bg-black50 p-2 rounded-full ${
                    !canScrollPrev && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                >
                  <VscChevronLeft size={24} />
                </button>
                <button
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white bg-black50 p-2 rounded-full ${
                    !canScrollNext && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                >
                  <VscChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          <motion.p
            className="text-base font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {project.description}
          </motion.p>
          <div className="flex flex-wrap">
            {project.programs.map((cat, index) => (
              <button
                key={index}
                className="w-fit text-xs border border-black px-2 py-1 mr-2 mb-2 rounded-full"
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-row space-x-4">
            {project.website && (
              <motion.a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center text-blue underline hover:no-underline"
              >
                Open website
                <VscLink className="ml-1" />
              </motion.a>
            )}
            {project.figma && (
              <motion.a
                href={project.figma}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center text-blue underline hover:no-underline"
              >
                Open project
                <VscLink className="ml-1" />
              </motion.a>
            )}
            {project.pdf && (
              <motion.a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center text-blue underline hover:no-underline"
              >
                Open pdf
                <VscLink className="ml-1" />
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center text-blue underline hover:no-underline"
              >
                Open github
                <VscLink className="ml-1" />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
