import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import projects from "../data/projects.json";
import Popup from "../components/Popup";

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col justify-center items-center px-4 pt-36 pb-16"
    >
      <div className="flex flex-col items-center space-y-8 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-6xl font-serif font-bold"
        >
          Work
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
          className="text-base font-sans font-light text-center w-full md:w-4/5 lg:w-2/3"
        >
          A selection of my best work from over the years from websites, to
          UI/UX, to logos. Each project reflects my passion for design and
          attention to detail.🧐
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center container mx-auto gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="w-full lg:w-2/5 cursor-pointer project-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: 0.1 * index,
            }}
            onClick={() => handleCardClick(project)}
          >
            <div className="relative h-96 lg:h-96">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 left-0 w-full h-full p-4 bg-gradient-to-t from-black/50 to-transparent text-white rounded-lg transition-opacity duration-300 lg:opacity-0 lg:hover:opacity-100">
                <div className="flex flex-col justify-end h-full space-y-2">
                  <h3 className="text-4xl font-serif font-bold">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.programs.map((cat, catIndex) => (
                      <button
                        key={catIndex}
                        className="w-fit text-xs bg-white bg-opacity-50 px-4 py-1 rounded-full"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedProject && (
          <Popup
            project={selectedProject}
            handleClosePopup={handleClosePopup}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Work;
