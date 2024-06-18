import React, { useState, useEffect, useCallback } from "react";
import { FaArrowLeftLong, FaLink } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

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
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [nextImage, isPaused]);

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const popupVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-end bg-black bg-opacity-75"
      onClick={handleClosePopup}
    >
      <motion.div
        className="relative bg-white p-8 shadow-lg lg:w-2/5 h-full overflow-y-auto space-y-8"
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
          <FaArrowLeftLong />
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
          <div
            className="relative w-full h-96 overflow-hidden rounded-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence initial={false} mode="await">
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={`${project.title} ${currentImageIndex + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={imageVariants}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </AnimatePresence>
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
              <motion.button
                key={index}
                className="w-fit text-xs border border-black px-2 py-1 mr-2 mb-2 rounded-full"
                whileHover={{ scale: 1.1 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
          <div className="flex flex-row space-x-4">
            {project.website && (
              <motion.a
                href={project.website}
                target="_blank"
                className="flex flex-row items-center text-blue-500 underline hover:no-underline space-x-2"
                whileHover={{ scale: 1.1 }}
              >
                Visit website
                <FaLink className="ml-1" />
              </motion.a>
            )}
            {project.figma && (
              <motion.a
                href={project.figma}
                target="_blank"
                className="flex flex-row items-center text-blue-500 underline hover:no-underline"
                whileHover={{ scale: 1.1 }}
              >
                Visit project
                <FaLink className="ml-1" />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Popup;
