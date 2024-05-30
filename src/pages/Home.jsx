import React from "react";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden text-center">
        <h3
          className="text-4xl font-light mb-2"
          style={{ fontFamily: "Nunito-Light" }}
        >
          👋 Hi there, I’m
        </h3>
        <h1 className="text-8xl font-bold mb-2">Davide Condoluci</h1>
        <h2 className="text-3xl font-regular">Front-end developer.</h2>
      </div>
    </Layout>
  );
};

export default Home;
