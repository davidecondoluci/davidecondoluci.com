import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    let classes = "text-gray hover:text-green";
    if (location.pathname === path) {
      classes += " text-green";
    }
    return classes;
  };

  return (
    <div className="absolute top-0 right-0 left-0 z-10 px-4 md:px-6 py-8 bg-white">
      <nav className="flex flex-row w-full lg:w-4/5 md:mx-auto lg:mx-auto justify-between items-center">
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
              d="M7 38H6a6 6 0 0 0-6 6c0 3 3 6 6 6h15c-6-2-11-7-14-12Z"
            />
            <path
              fill="#3B3B3B"
              d="m54 15-1-1v-1C49 5 41 0 31 0H6a6 6 0 0 0-6 6c0 4 3 7 6 7h25a13 13 0 0 1 7 2 12 12 0 0 1 0 20h16a25 25 0 0 0 0-20Z"
            />
            <path
              fill="#5DDC5B"
              d="M55 13h1a6 6 0 0 0 7-7c0-3-3-6-7-6H42c6 2 10 7 13 13Z"
            />
            <path
              fill="#5DDC5B"
              d="M56 38H31a13 13 0 0 1-7-3 12 12 0 0 1 0-20H9a25 25 0 0 0 1 23c4 7 12 12 21 12h25a6 6 0 0 0 6-6c0-4-2-6-6-6Z"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h63v50H0z" />
            </clipPath>
          </defs>
        </svg>

        <ul className="flex space-x-8 items-center font-sans font-regular">
          <li>
            <Link to="/" className={getLinkClass("/")}>
              Home
            </Link>
          </li>
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
