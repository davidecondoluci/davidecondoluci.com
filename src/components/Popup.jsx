import React, { useState } from "react";
import { FaArrowLeftLong, FaLink } from "react-icons/fa6";
import { motion } from "framer-motion";

const Popup = ({ project, handleClosePopup }) => {
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
          <div className="relative w-full h-96 shadow-lg overflow-hidden rounded-lg">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
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
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center text-blue underline hover:no-underline space-x-2"
                whileHover={{ scale: 1.1 }}
              >
                Open website
                <FaLink className="ml-1" />
              </a>
            )}
            {project.figma && (
              <a
                href={project.figma}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center text-blue underline hover:no-underline"
              >
                Open project
                <FaLink className="ml-1" />
              </a>
            )}
            {project.pdf && (
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center text-blue underline hover:no-underline"
              >
                Open pdf
                <FaLink className="ml-1" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Popup;
