// src/pages/Home.js
import React from "react";
import { motion } from "framer-motion";
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
      className="flex flex-col h-screen pt-28 justify-center items-center overflow-hidden text-center space-y-2"
    >
      <StarTrail />
      <h3 className="text-3xl md:text-4xl lg:text-4xl font-sans font-light relative space-x-2">
        <motion.span
          role="img"
          aria-label="waving hand"
          animate={{ rotate: [0, 0, 20, -20, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ display: "inline-block" }}
        >
          👋
        </motion.span>
        <span>Hi there, I’m</span>
      </h3>
      <h1 className="text-6xl md:text-8xl lg:text-8xl font-serif font-bold">
        Davide Condoluci
      </h1>
      <div className="flex flex-col justify-center items-center h-10">
        <motion.h2
          key={index}
          className="w-full text-2xl md:text-3xl lg:text-3xl font-sans font-light absolute"
          initial={{ opacity: 0, y: 25, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -25, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {descriptions[index]}
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default Home;
