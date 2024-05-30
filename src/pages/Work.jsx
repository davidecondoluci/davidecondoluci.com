import React from "react";
import Layout from "../components/Layout";

const Work = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
        <h1 className="text-6xl font-bold">Work</h1>
        <p
          className="text-base text-center"
          style={{ fontFamily: "Nunito-Light" }}
        >
          A selection of my best work from over the years from websites, to
          UI/UX, to logos. Each project reflects my passion for design and
          attention to detail.🧐
        </p>
      </div>
    </Layout>
  );
};

export default Work;
