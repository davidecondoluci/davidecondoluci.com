import React, { useState } from "react";
import projects from "../data/projects.json";

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [clickedText, setClickedText] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setClickedText(false);
  };

  const handleTextClick = () => {
    setClickedText(true);
  };

  return (
    <div className="flex flex-col justify-center items-center py-16">
      <div className="h1/3 flex flex-col justify-between items-center">
        <h1 className="text-6xl font-serif font-bold">Work</h1>
        <p className="text-base font-sans font-light text-center w-1/2">
          A selection of my best work from over the years from websites, to
          UI/UX, to logos. Each project reflects my passion for design and
          attention to detail.
        </p>
      </div>

      <div className="h-2/3 flex flex-row container px-4">
        <div className="w-full h-full flex flex-col items-end p-4"></div>
      </div>
    </div>
  );
};

export default Work;
