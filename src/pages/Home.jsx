import React from "react";
import LayoutFixed from "../components/LayoutFixed";

const Home = () => {
  return (
    <LayoutFixed>
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden text-center">
        <h3 className="text-4xl font-sans font-light mb-2">👋 Hi there, I’m</h3>
        <h1 className="text-8xl font-serif font-bold mb-2">Davide Condoluci</h1>
        <h2 className="text-3xl font-sans font-regular">
          Front-end developer.
        </h2>
      </div>
    </LayoutFixed>
  );
};

export default Home;
