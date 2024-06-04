import React from "react";
import "../App.css";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="h-[80lvh] flex flex-col items-center overflow-hidden text-[#212121] px-32">
      <h1 className="text-6xl font-bold text-left font-serif">Contact</h1>
      <div className="w-full max-w-xl">
        <p className="text-base font-sans font-light text-center mb-4">
          Get in touch or shoot me an email directly on
          davide.condoluci1@gmail.com
        </p>
        <div className="flex flex-col items-start w-full max-w-2xl ">
          <form
            className="w-full"
            action="https://api.staticforms.xyz/submit"
            method="post"
          >
            <input
              type="hidden"
              name="accessKey"
              value="4e32a4ad-ff35-4d56-b95d-ea3129bad48c"
            />
            <input type="text" name="honeypot" className="hidden" />
            <div className="mb-6">
              <input
                className="bg-[#ebebeb] border-[#dbdbdb] focus:bg-white focus:border-[#536DFE] appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none font-sans font-light"
                id="inline-full-name"
                type="text"
                name="name"
                placeholder="Full Name"
              />
            </div>
            <div className="mb-6">
              <input
                className="bg-[#ebebeb] border-[#dbdbdb] focus:bg-white focus:border-[#536DFE] appearance-none border-2  rounded w-full py-2 px-4 leading-tight focus:outline-none font-sans font-light"
                id="inline-email"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <textarea
                className="bg-[#ebebeb] border-[#dbdbdb] focus:bg-white focus:border-[#536DFE] appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none h-48 font-sans font-light"
                id="inline-message"
                placeholder="Message"
                name="message"
              />
            </div>
            <div className="flex items-center mb-6">
              <button
                className="shadow bg-[#3F51B5] hover:bg-[#536DFE] focus:shadow-outline focus:outline-none text-white py-2 px-6 rounded font-sans font-bold"
                type="submit"
                value="Submit"
              >
                Send
              </button>
            </div>
          </form>
          <div className="flex flex-row justify-start mt-6 w-full">
            <h2 className="mr-4 font-sans font-light text-left">
              Stay connected with me:
            </h2>
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
  );
};

export default Contact;
