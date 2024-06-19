import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StarTrail from "../components/StarTrail";
import "../App.css";

const Home = () => {
  const items = [
    "Front-end Developer",
    "Graphic Designer",
    "Energetic Athlete",
    "Curious Traveler",
    "Vintage Lover",
    "Lego Maniac",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000); // Cambia la durata qui per controllare la velocità di transizione
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col h-screen justify-center items-center overflow-hidden text-center space-y-2"
    >
      <StarTrail />
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
        {items.map((item, index) => (
          <motion.h2
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            className="text-4xl font-sans font-light"
            style={{ position: index === currentIndex ? "static" : "absolute" }}
          >
            {item}
          </motion.h2>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
