import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeftLong } from "react-icons/fa6";

const Popup = ({ project, handleClosePopup }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  }, [project.images.length]);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        nextImage();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [nextImage, isPaused]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-end bg-black bg-opacity-75"
      onClick={handleClosePopup}
    >
      <motion.div
        className="relative bg-white p-8 shadow-lg lg:w-2/5 h-full overflow-y-auto space-y-8"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="flex items-center hover:underline text-black text-2xl space-x-2"
          onClick={handleClosePopup}
        >
          <FaArrowLeftLong />
          <span className="text-base">Go back to projects</span>
        </button>
        <div className="space-y-4">
          <h2 className="text-4xl font-serif font-bold">{project.title}</h2>
          <div
            className="relative w-full h-96 overflow-hidden rounded-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={`${project.title} ${currentImageIndex + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>
          <p className="text-base font-sans">{project.description}</p>
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
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              Visit website
            </a>
          )}{" "}
        </div>
      </motion.div>
    </div>
  );
};

export default Popup;
