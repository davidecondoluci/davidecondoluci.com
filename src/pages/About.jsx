import React, { useState, useEffect } from "react";
import meImage from "../img/me.jpg";
import skillsData from "../data/skills.json";
import "../App.css";

const About = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    setSkills(skillsData);
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
    <div className="flex flex-row py-16">
      <div className="w-1/2 flex flex-col space-y-8">
        <h1 className="text-6xl font-serif font-bold text-left">About</h1>
        <div className="space-y-4">
          <p className="text-base font-sans font-light text-left">
            Ciao, I'm <span className="font-medium">Davide Condoluci</span> and
            I recently completed the Web Application & Apps course at Scuola
            Mohole, where I gained solid skills as a frontend developer and
            graphic designer. I love working in teams, and have strong critical
            thinking. Precision is one of my strengths, which I apply to every
            project.
          </p>
          <p className="text-base font-sans font-light text-left">
            My passions range from sports, like soccer, gym, and running, to
            fashion, technology, and collecting. I also love traveling and
            discovering new cultures, which inspire and enrich my creativity.
            This mix of interests allows me to bring a unique and creative
            perspective to everything I do. I am always looking for new
            challenges and opportunities to grow and learn, both professionally
            and personally.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-serif font-bold text-left">Skills</h2>
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <button
                key={index}
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
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-serif font-bold text-left">Education</h2>
          <div className="border-b border-gray-300 pb-4">
            <h3 className="text-2xl font-serif font-bold mb-2">
              Graphic Design
            </h3>
            <div className="flex flex-row justify-between">
              <p className="text-base font-sans font-light">
                Istituto Superiore Starting Work
              </p>
              <span className="text-base font-sans font-light">2016-2022</span>
            </div>
            <a
              href="https://www.startingwork.it/"
              className="text-base font-sans font-light text-[#5DDC5B] hover:underline"
            >
              www.startingwork.it
            </a>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold">
              Web Application & Apps
            </h3>
            <div className="flex flex-row justify-between">
              <p className="text-base font-sans font-light">Scuola Mohole</p>
              <span className="text-base font-sans font-light">2023-2024</span>
            </div>
            <a
              href="https://scuola.mohole.it/"
              className="text-base font-sans font-light text-[#5DDC5B] hover:underline"
            >
              scuola.mohole.it
            </a>
          </div>
        </div>
        <a href="">
          <button className="bg-black text-white px-8 py-2 rounded-full flex justify-center items-center w-fit text-base font-sans font-regular">
            My CV
          </button>
        </a>
      </div>
      <div className="w-1/2 flex justify-end items-start">
        <img src={meImage} alt="Me" className="container w-3/4 rounded-lg" />
      </div>
    </div>
  );
};

export default About;
