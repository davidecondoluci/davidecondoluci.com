import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import projects from "../data/projects.json";
import { FaAngleLeft } from "react-icons/fa6";

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

  useEffect(() => {
    const handleHover = () => {
      const cards = document.querySelectorAll(".project-card");

      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", () => {
          card.classList.remove("hovered");
        });
      });
    };

    handleHover();

    return () => {
      const cards = document.querySelectorAll(".project-card");

      cards.forEach((card) => {
        card.removeEventListener("mouseenter", () => {
          card.classList.add("hovered");
        });

        card.removeEventListener("mouseleave", () => {
          card.classList.remove("hovered");
        });
      });
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center px-4 py-16">
      <div className="flex flex-col items-center space-y-8 mb-8">
        <h1 className="text-6xl font-serif font-bold">Work</h1>
        <p className="text-base font-sans font-light text-center w-full md:w-3/4 lg:w-1/2">
          A selection of my best work from over the years from websites, to
          UI/UX, to logos. Each project reflects my passion for design and
          attention to detail.🧐
        </p>
      </div>

      <div className="flex flex-wrap justify-center container mx-auto space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="w-full lg:w-1/2 cursor-pointer project-card"
            onClick={() => handleCardClick(project)}
          >
            <div
              className={`relative h-96 lg:h-96 ${
                selectedProject === project ? "hovered" : ""
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 left-0 w-full h-full p-4 bg-gradient-to-t from-black50 to-transparent text-white rounded-lg transition-opacity duration-300">
                <div className="flex flex-col justify-end h-full space-y-2">
                  <h3 className="text-4xl font-serif font-bold">
                    {project.title}
                  </h3>
                  <p className="text-sm">{project.description}</p>
                  <div className="flex flex-wrap">
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
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto space-y-8">
            <button
              className="absolute top-4 left-4 text-black text-2xl flex items-center"
              onClick={handleClosePopup}
            >
              <FaAngleLeft />
              <span className="ml-2 text-base">Go back to projects</span>
            </button>
            <div className="space-y-4">
              <h2 className="text-4xl font-serif font-bold">
                {selectedProject.title}
              </h2>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <p className="text-base font-sans">
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap">
                {selectedProject.programs.map((cat, index) => (
                  <button
                    key={index}
                    className="w-fit text-xs border border-black px-2 py-1 mr-2 mb-2 rounded-full"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Work;
