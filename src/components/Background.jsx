import React from "react";
import { motion } from "framer-motion";

const ParallaxBackground = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [-100, 100, -100], // Effetto parallasse verticale
      }}
      transition={{
        duration: 20, // Durata dell'animazione
        repeat: Infinity, // Ripetizione infinita
        repeatType: "loop", // Tipo di ripetizione
        ease: "linear", // Tipo di animazione
      }}
      className="absolute inset-0 z-[-1] bg-cover bg-center"
      style={{
        backgroundImage: `url('https://www.example.com/your-background-image.jpg')`, // URL dell'immagine di sfondo
      }}
    />
  );
};

export default ParallaxBackground;
