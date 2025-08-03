import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import CodeEffect from "../components/CodeEffect.jsx";
import "../App.css";

const Home = () => {
  const { t } = useTranslation();

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col h-dvh justify-center items-center overflow-hidden text-center space-y-2 relative"
    >
      <CodeEffect />
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        className="flex flex-col md:flex-row lg:flex-row justify-center items-center text-3xl md:text-4xl lg:text-4xl font-sans font-light relative space-x-2"
      >
        <span className="flex w-10 h-10">
          <img src="/img/victory-hand.png" alt="Victory Hand" />
        </span>
        <span>{t("home.hello")}</span>
      </motion.h3>
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
        className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold"
      >
        Davide Condoluci
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.6 }}
        className="font-sans font-light text-2xl md:text-3xl lg:text-3xl"
      >
        <ReactTyped
          strings={[
            t("home.roles.0"),
            t("home.roles.1"),
            t("home.roles.2"),
            t("home.roles.3"),
            t("home.roles.4"),
            t("home.roles.5"),
          ]}
          typeSpeed={100}
          loop
        />
      </motion.h2>
    </motion.div>
  );
};

export default Home;
