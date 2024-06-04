import React from "react";
import projects from "../data/projects.json";

const Work = () => {
  return (
    <div className="h-[80lvh] flex flex-col items-center overflow-hidden text-[#212121] px-32">
      <h1 className="text-6xl font-serif font-bold">Work</h1>
      <p className="text-base font-sans font-light text-center w-1/2">
        A selection of my best work from over the years from websites, to UI/UX,
        to logos. Each project reflects my passion for design and attention to
        detail.🧐
      </p>

      <div className="h-full flex flex-row container mx-auto px-4 items-start">
        <div className="w-2/3 h-full flex items-start justify-center p-4">
          <div className="w-full h-full bg-[#ebebeb] rounded-lg flex items-center justify-center">
            <p className="text-lg font-sans font-light">
              Content for the left box
            </p>
          </div>
        </div>

        <div className="w-1/3 h-full flex flex-col items-start justify-start p-4 mt-4 border-t-2 border-[#212121] overflow-y-auto">
          {projects.map((project, index) => (
            <div key={index} className="mb-4 last:mb-32 space-y-2">
              <h2 className="text-6xl font-serif font-bold">{project.title}</h2>
              <p className="font-sans font-light text-base">
                {project.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
