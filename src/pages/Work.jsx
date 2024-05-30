import React from "react";
import Layout from "../components/Layout";
import projects from "../data/projects.json";

const Work = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-serif font-bold">Work</h1>
        <p className="text-base font-sans font-light text-center">
          A selection of my best work from over the years from websites, to
          UI/UX, to logos. Each project reflects my passion for design and
          attention to detail.🧐
        </p>
        <div className="flex flex-row container mx-auto px-4 items-start">
          <div className="w-3/5 flex items-start justify-center p-4">
            <div className="w-full h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-lg">Content for the left box</p>
            </div>
          </div>
          <div className="w-2/5 fade flex flex-col items-start justify-start p-4 mt-4 overflow-y-auto h-[600px]">
            {projects.map((project, index) => (
              <div key={index} className="mb-6 last:mb-24 space-y-2">
                <h2 className="text-6xl font-serif font-bold">
                  {project.title}
                </h2>
                <p className="font-sans font-light text-base">
                  {project.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Work;
