import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    let classes = "text-gray hover:text-green";
    if (location.pathname === path) {
      classes += " underline text-green";
    }
    return classes;
  };

  return (
    <div className="absolute top-0 right-0 left-0 z-10 px-4 md:px-6 py-8 bg-white">
      <nav className="flex flex-row w-full lg:w-4/5 md:mx-auto lg:mx-auto justify-between items-center">
        <Link to="/" className={`${getLinkClass("/")} logo-link`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="63"
            height="50"
            fill="none"
            viewBox="0 0 63 50"
          >
            <g clipPath="url(#a)">
              <path
                fill="#3B3B3B"
                d="M7.2 37.5h-1A6.2 6.2 0 0 0 0 43.8C.1 47.1 2.9 50 6.3 50H21A27.2 27.2 0 0 1 7.2 37.5ZM6.3 12.5h25a12.5 12.5 0 0 1 6.9 23H54a24.8 24.8 0 0 0-1.1-23A25 25 0 0 0 31.3 0h-25A6.2 6.2 0 0 0 0 6.3c0 3.4 2.8 6.2 6.3 6.2Z"
              />
              <path
                fill="#5DDC5B"
                d="M55.3 12.5h1a6.2 6.2 0 0 0 6.3-6.3C62.4 2.9 59.6 0 56.1 0H41.6a27.2 27.2 0 0 1 13.7 12.5ZM56.3 37.5h-25a12.5 12.5 0 0 1-7-23H8.5a24.8 24.8 0 0 0 1.1 23A25 25 0 0 0 31.2 50h25a6.2 6.2 0 0 0 6.3-6.3c0-3.4-2.8-6.2-6.3-6.2Z"
              />
            </g>
          </svg>
        </Link>

        <ul className="flex space-x-8 items-center font-sans font-regular">
          <li>
            <Link to="/about" className={getLinkClass("/about")}>
              About
            </Link>
          </li>
          <li>
            <Link to="/work" className={getLinkClass("/work")}>
              Work
            </Link>
          </li>
          <li>
            <Link to="/contact" className={getLinkClass("/contact")}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
