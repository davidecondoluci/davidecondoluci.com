import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import descriptionsData from "../data/descriptions.json";
import "../App.css";

const Home = () => {
  const [index, setIndex] = useState(0);
  const descriptions = descriptionsData;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[85lvh] flex flex-col justify-center items-center overflow-hidden text-center">
      <h3 className="text-4xl font-sans font-light mb-2">👋 Hi there, I’m</h3>
      <h1 className="text-8xl font-serif font-bold mb-2">Davide Condoluci</h1>
      <div className="flex justify-center items-center w-full h-10">
        <AnimatePresence>
          <motion.h2
            key={index}
            className="text-3xl font-sans font-light absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {descriptions[index]}
          </motion.h2>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
