import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
    <div className="h-[80lvh] flex flex-col items-center justify-center overflow-hidden text-center text-[#212121] px-32">
      <h3 className="text-4xl font-sans font-light mb-2">👋 Hi there, I’m</h3>
      <h1 className="text-8xl font-serif font-bold mb-2">Davide Condoluci</h1>
      <div className="flex justify-center items-center">
        <TransitionGroup component={null}>
          <CSSTransition
            key={descriptions[index]}
            timeout={{ enter: 500, exit: 500 }}
            classNames="fade"
          >
            <h2 className="text-3xl font-sans font-regular">
              {descriptions[index]}
            </h2>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Home;
