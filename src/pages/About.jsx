import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import skillsData from "../data/skills.json";
import { VscLinkExternal } from "react-icons/vsc";
import "../App.css";

const About = () => {
  const { t } = useTranslation();
  const [skills, setSkills] = useState([]);
  const nameRef = useRef(null);

  useEffect(() => {
    setSkills(skillsData);

    if (nameRef.current) {
      createHoverEffect(nameRef.current);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-6xl font-serif font-bold"
        >
          {t("about.title")}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
          className="space-y-4"
        >
          <p className="text-base font-sans font-light text-left leading-loose">
            {t("about.description.0")}
          </p>
          <p className="text-base font-sans font-light text-left leading-loose">
            {t("about.description.1")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-serif font-bold text-left">
            {t("about.skills")}
          </h2>
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  delay: 0.05 * (index + 1),
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
                <img
                  src={skill.icon}
                  alt={`${skill.name} icon`}
                  className="mr-2 w-6 h-6 object-contain"
                />
                {skill.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-serif font-bold text-left">
            {t("about.education")}
          </h2>
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
              className="w-fit text-base font-sans font-light text-green hover:underline flex flex-row items-center"
            >
              scuola.mohole.it&nbsp;
              <VscLinkExternal />
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
              className="w-fit text-base font-sans font-light text-green hover:underline flex flex-row items-center"
            >
              startingwork.it&nbsp;
              <VscLinkExternal />
            </a>
          </div>
        </motion.div>
        <a
          href="/pdf/Condoluci_Davide_cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="w-fit bg-gray text-white px-8 py-2 rounded-full flex justify-center items-center text-base font-sans font-regular hover:bg-green transition-colors duration-300"
          >
            {t("about.CV")}
          </motion.button>
        </a>
      </div>
    </motion.div>
  );
};

export default About;
