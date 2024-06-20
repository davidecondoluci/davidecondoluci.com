import React from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import CodeEffect from "../components/CodeEffect";
import "../App.css";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col h-screen justify-center items-center overflow-hidden text-center space-y-2 relative"
    >
      <CodeEffect />
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        className="flex flex-col md:flex-row lg:flex-row justify-center items-center text-3xl md:text-4xl lg:text-4xl font-sans font-light relative space-x-2"
      >
        <span className="flex w-10 h-10">
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
      <motion.div className="flex flex-col w-full justify-center items-center">
        <h2 className="font-sans font-light text-2xl md:text-3xl lg:text-3xl">
          <ReactTyped
            strings={[
              "Front-end Developer",
              "Graphic Designer",
              "Energetic Athlete",
              "Curious Traveler",
              "Vintage Lover",
              "Lego Maniac",
            ]}
            typeSpeed={100}
            loop
          />
        </h2>
      </motion.div>
    </motion.div>
  );
};

export default Home;
