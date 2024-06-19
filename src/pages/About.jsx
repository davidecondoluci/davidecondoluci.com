import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import skillsData from "../data/skills.json";
import "../App.css";

const createHoverEffect = (element) => {
  const image = document.createElement("img");
  image.className =
    "fixed inset-0 opacity-0 pointer-events-none select-none z-10 w-auto h-1/3 object-cover transition-opacity duration-300 ease";
  image.src = "/img/me.jpg";

  document.body.appendChild(image);

  element.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;

    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    image.style.opacity = 1;
  });

  element.addEventListener("mouseleave", () => {
    image.style.opacity = 0;
  });
};

const About = () => {
  const [skills, setSkills] = useState([]);
  const nameRef = useRef(null);

  useEffect(() => {
    setSkills(skillsData);

    if (nameRef.current) {
      createHoverEffect(nameRef.current);
    }
  }, []);

  const handleMouseEnter = (index) => {
    const newSkills = [...skills];
    newSkills[index].hovered = true;
    setSkills(newSkills);
  };

  const handleMouseLeave = (index) => {
    const newSkills = [...skills];
    newSkills[index].hovered = false;
    setSkills(newSkills);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col justify-center items-center px-4 pt-36 pb-16"
    >
      <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-6xl font-serif font-bold text-left"
        >
          About
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
          className="space-y-4"
        >
          <p className="text-base font-sans font-light text-left leading-loose">
            Ciao, I'm{" "}
            <span ref={nameRef} className="font-medium text-green">
              Davide Condoluci
            </span>{" "}
            and I recently completed the Web Application & Apps course at Scuola
            Mohole, where I gained solid skills as a frontend developer and
            graphic designer. I love working in teams, and have strong critical
            thinking. Precision is one of my strengths, which I apply to every
            project.
          </p>
          <p className="text-base font-sans font-light text-left leading-loose">
            My passions range from sports, like soccer, gym, and running, to
            fashion, technology, and collecting. I also love traveling and
            discovering new cultures, which inspire and enrich my creativity.
            This mix of interests allows me to bring a unique and creative
            perspective to everything I do. I am always looking for new
            challenges and opportunities to grow and learn, both professionally
            and personally.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-serif font-bold text-left">Skills</h2>
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  delay: 0.2 * (index + 1),
                }}
                className="border px-4 py-2 rounded-full m-1 flex justify-center items-center transition-colors duration-300 hover:border-transparent"
                style={{
                  borderColor: skill.color,
                  background: skill.hovered
                    ? `${skill.color}12`
                    : "transparent",
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {skill.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-serif font-bold text-left">Education</h2>
          <div className="border-b border-gray pb-4 space-y-2">
            <h3 className="text-2xl font-serif font-bold">
              Web Application & Apps
            </h3>
            <div className="flex flex-col md:flex-row lg:flex-row justify-between md:space-y-0 lg:space-y-0 space-y-2">
              <p className="text-base font-sans font-light">Scuola Mohole</p>
              <span className="text-base font-sans font-light">2023-2024</span>
            </div>
            <a
              href="https://scuola.mohole.it/"
              target="_blank"
              className="text-base font-sans font-light text-green hover:underline"
            >
              scuola.mohole.it
            </a>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold">Graphic Design</h3>
            <div className="flex flex-col md:flex-row lg:flex-row justify-between md:space-y-0 lg:space-y-0 space-y-2">
              <p className="text-base font-sans font-light">
                Istituto Superiore Starting Work
              </p>
              <span className="text-base font-sans font-light">2016-2022</span>
            </div>
            <a
              href="https://www.startingwork.it/"
              target="_blank"
              className="text-base font-sans font-light text-green hover:underline"
            >
              startingwork.it
            </a>
          </div>
        </motion.div>
        <a href="/path/al/tuo/file.pdf" download="nome_del_tuo_file.pdf">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="w-fit bg-gray text-white px-8 py-2 rounded-full flex justify-center items-center text-base font-sans font-regular hover:bg-green transition-colors duration-300"
          >
            My CV
          </motion.button>
        </a>
      </div>
    </motion.div>
  );
};

export default About;
