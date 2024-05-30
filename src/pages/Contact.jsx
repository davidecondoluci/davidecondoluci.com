import React from "react";
import "../App.css";
import Layout from "../components/Layout";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-left font-serif">Contact</h1>
        <div className="w-full max-w-xl">
          <p className="text-base text-center mb-8">
            Get in touch or shoot me an email directly
            on davide.condoluci1@gmail.com
          </p>
          <div className="flex flex-col items-start w-full max-w-2xl">
            <form className="w-full">
              <div className="mb-6">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-6">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <textarea
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 h-48"
                  id="inline-message"
                  placeholder="Message"
                />
              </div>
              <div className="flex items-center mb-6">
                <button
                  className="shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                >
                  Send
                </button>
              </div>
            </form>
            <div className="flex flex-row justify-start mt-6 w-full">
              <h2 className="mr-4 text-left">Stay connected with me:</h2>
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/davidecondoluci"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub style={{ color: "#333", fontSize: "24px" }} />
                </a>
                <a
                  href="https://www.linkedin.com/in/davide-condoluci/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin style={{ color: "#0077B5", fontSize: "24px" }} />
                </a>
                <a
                  href="https://www.instagram.com/davide_condoluci/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram style={{ color: "#E4405F", fontSize: "24px" }} />
                </a>
                <a
                  href="https://x.com/davidecondoluci"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter style={{ fontSize: "24px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
