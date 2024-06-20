import React from "react";
import { motion } from "framer-motion";

const ParticleBackground = () => {
  // Numero di particelle da mostrare
  const numParticles = 50;

  // Funzione per generare numeri casuali
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // Array di particelle
  const particles = Array.from({ length: numParticles }).map((_, index) => ({
    id: index,
    x: getRandomNumber(0, window.innerWidth),
    y: getRandomNumber(0, window.innerHeight),
    size: getRandomNumber(1, 4),
    opacity: getRandomNumber(0.3, 0.9),
    delay: getRandomNumber(0, 5),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-600" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Mappiamo le particelle */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="w-1 h-1 bg-white rounded-full"
              style={{
                position: "absolute",
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
              }}
              initial={{
                scale: 0,
                opacity: 0,
                x: getRandomNumber(-100, 100),
                y: getRandomNumber(-100, 100),
              }}
              animate={{
                scale: 1,
                opacity: particle.opacity,
                transition: {
                  duration: getRandomNumber(1, 3),
                  delay: particle.delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: getRandomNumber(0, 5),
                },
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticleBackground;
