import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LayoutFixed from "../components/LayoutFixed";
import "../App.css";

const descriptions = [
  "Front-end developer.",
  "Graphic Designer.",
  "Energetic athlete.",
  "Curious traveler.",
  "Vintage lover.",
  "Lego maniac.",
];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LayoutFixed>
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden text-center">
        <h3 className="text-4xl font-sans font-light mb-2">👋 Hi there, I’m</h3>
        <h1 className="text-8xl font-serif font-bold mb-2">Davide Condoluci</h1>
        <div className="flex justify-center items-center">
          <TransitionGroup component={null}>
            <CSSTransition
              key={descriptions[index]}
              timeout={{ enter: 500, exit: 500 }}
              classNames="fade"
            >
              <h2 className="text-3xl font-sans font-regular absolute mt-8">
                {descriptions[index]}
              </h2>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </LayoutFixed>
  );
};

export default Home;
