import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    if (!formState.name || !formState.email || !formState.message) {
      setLoading(false);
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: JSON.stringify({
          accessKey: "4e32a4ad-ff35-4d56-b95d-ea3129bad48c",
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        setError(data.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      className="flex flex-col items-center px-4 pt-36 pb-16 space-y-4"
    >
      <div className="flex flex-col justify-center items-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-6xl font-bold text-left font-serif"
        >
          Contact
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
          className="text-base font-sans font-light text-center"
        >
          Get in touch or shoot me an email directly on{" "}
          <a
            href="mailto:davide.condoluci1@gmail.com"
            className="underline hover:no-underline"
          >
            davide.condoluci1@gmail.com
          </a>
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
        className="flex flex-col justify-center items-start w-full max-w-2xl"
      >
        <form className="w-full space-y-4 pb-4" onSubmit={handleSubmit}>
          <input
            className="appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none font-sans font-light border-lightgray focus:border-green bg-white hover:bg-white"
            id="inline-full-name"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formState.name}
            onChange={handleChange}
          />
          <input
            className="appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none font-sans font-light border-lightgray focus:border-green bg-white hover:bg-white"
            id="inline-email"
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
          />
          <textarea
            className="resize-none appearance-none border rounded w-full h-48 py-2 px-4 leading-tight focus:outline-none font-sans font-light border-lightgray focus:border-green bg-white hover:bg-white"
            id="inline-message"
            placeholder="Message"
            name="message"
            value={formState.message}
            onChange={handleChange}
          />
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`shadow bg-lightgray hover:bg-green text-white focus:shadow-outline focus:outline-none py-2 px-6 rounded font-sans font-medium ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              Send
            </motion.button>
            {success && (
              <span className="text-sm font-sans font-italic text-green">
                Message sent successfully!
              </span>
            )}
            {error && (
              <span className="text-sm font-sans font-light italic text-red">
                {error}
              </span>
            )}
          </div>
        </form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.6 }}
        className="flex flex-col md:flex-row lg:flex-row w-full max-w-2xl justify-start md:items-center lg:items-center space-y-2 md:space-x-2 lg:space-x-2"
      >
        <h2 className="font-sans font-light text-left lg:items-center md:mr-4 lg:mr-4">
          Stay connected with me:
        </h2>
        <div className="flex flex-row lg:items-center space-x-4">
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://github.com/davidecondoluci"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/icons/github.svg" alt="GitHub" className="h-8" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://www.linkedin.com/in/davide-condoluci/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/icons/linkedin.svg" alt="LinkedIn" className="h-8" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://www.instagram.com/davide_condoluci/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/img/icons/instagram.svg"
              alt="Instagram"
              className="h-8"
            />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://x.com/davidecondoluci"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/icons/x.svg" alt="X" className="h-8" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
