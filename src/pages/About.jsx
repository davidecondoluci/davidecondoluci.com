import React from "react";
import "../App.css";
import meImage from "../img/me.jpg";

const About = () => {
  return (
    <div className="flex flex-row items-start justify-center overflow-hidden text-[#212121]">
      <div className="w-1/2 pr-8">
        <div className="flex justify-end overflow-hidden">
          <img src={meImage} alt="Me" className="container w-3/4 rounded-lg" />
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-start justify-center pl-8">
        <h1 className="text-6xl font-serif font-bold text-left mb-4">About</h1>
        <p className="text-base font-sans font-light text-left mb-4">
          Ciao, I'm <span className="font-bold">Davide Condoluci</span> and I
          recently completed the Web Application & Apps course at Scuola Mohole,
          where I gained solid skills as a frontend developer and graphic
          designer. I love working in teams, and have strong critical thinking.
          Precision is one of my strengths, which I apply to every project.
        </p>
        <p className="text-base font-sans font-light text-left mb-12">
          My passions range from sports, like soccer, gym, and running, to
          fashion, technology, and collecting. I also love traveling and
          discovering new cultures, which inspire and enrich my creativity. This
          mix of interests allows me to bring a unique and creative perspective
          to everything I do. I am always looking for new challenges and
          opportunities to grow and learn, both professionally and personally.
        </p>
        <a
          href="download_link"
          className="text-[#536DFE] hover:underline text-2xl font-sans font-regular text-left"
        >
          ↓ My CV
        </a>
      </div>
    </div>
  );
};

export default About;
