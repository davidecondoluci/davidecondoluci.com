import React from "react";
import "../App.css";
import Layout from "../components/Layout";
import meImage from "../img/me.jpg";

const About = () => {
  return (
    <Layout>
      <div className="flex flex-row h-screen items-start justify-center overflow-hidden">
        <div className="w-1/2 flex pr-8">
          <div className="overflow-hidden flex items-center justify-end">
            <img
              src={meImage}
              alt="Me"
              className="container w-3/5 rounded-lg"
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-start justify-center pl-8 pr-32 text-[#212121]">
          <h1 className="text-6xl font-serif font-bold text-left mb-4">
            About
          </h1>
          <p className="text-base font-sans font-light text-left mb-4">
            Ciao, I'm Davide Condoluci and I recently completed the Web
            Application & Apps course at Scuola Mohole, where I gained solid
            skills as a frontend developer and graphic designer. I love working
            in teams, and have strong critical thinking. Precision is one of my
            strengths, which I apply to every project.
          </p>
          <p className="text-base font-sans font-light text-left mb-8">
            My passions range from sports, like soccer, gym, and running, to
            fashion, technology, and collecting. I also love traveling and
            discovering new cultures, which inspire and enrich my creativity.
            This mix of interests allows me to bring a unique and creative
            perspective to everything I do. I am always looking for new
            challenges and opportunities to grow and learn, both professionally
            and personally.
          </p>
          <a
            href="download_link"
            className="text-[#536DFE] hover:underline text-2xl font-sans font-regular text-left"
          >
            ↓ My CV
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default About;
