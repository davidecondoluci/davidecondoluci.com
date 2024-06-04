import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";

const descriptions = [
  "Sviluppatore front-end.",
  "Graphic Designer.",
  "Atleta energico.",
  "Viaggiatore curioso.",
  "Amante del vintage.",
  "Maniaco dei Lego.",
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
    <div className="h-[85lvh] flex flex-col items-center justify-center overflow-hidden text-center text-[#212121]">
      <h3 className="text-4xl font-sans font-light mb-2">👋 Hi there, I’m</h3>
      <h1 className="text-8xl font-serif font-bold mb-2">Davide Condoluci</h1>
      <div className="relative flex justify-center items-center w-full h-10">
        <AnimatePresence>
          <motion.h2
            key={index}
            className="text-3xl font-sans font-regular absolute"
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
