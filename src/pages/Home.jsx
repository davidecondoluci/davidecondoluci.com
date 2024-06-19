import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarTrail from "../components/StarTrail";
import descriptionsData from "../data/descriptions.json";
import "../App.css";

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const descriptions = descriptionsData;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [descriptions.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col h-screen t-28 justify-center items-center overflow-hidden text-center space-y-2"
    >
      <StarTrail />
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        className="flex flex-row text-3xl md:text-4xl lg:text-4xl font-sans font-light relative space-x-2"
      >
        <span className="flex h-10">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png"
            alt="Waving Hand"
          />
        </span>
        <span>Hi there, I’m</span>
      </motion.h3>
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
        className="text-6xl md:text-8xl lg:text-8xl font-serif font-bold"
      >
        Davide Condoluci
      </motion.h1>
      <div className="flex flex-col justify-center items-center h-10">
        <AnimatePresence>
          <motion.h2
            key={index}
            className="w-full text-2xl md:text-3xl lg:text-3xl font-sans font-light"
            style={{ position: "absolute" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, display: "none" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {descriptions[index]}
          </motion.h2>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Home;
