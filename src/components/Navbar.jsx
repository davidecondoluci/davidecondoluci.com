import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/Logo";

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
    <div className="fixed top-0 right-0 left-0 z-10 px-4 md:px-6 py-8 bg-white">
      <nav className="flex flex-row w-full lg:w-4/5 md:mx-auto lg:mx-auto justify-between items-center">
        <Logo></Logo>
        <ul className="flex space-x-4 md:space-x-8 lg:space-x-8 items-center font-sans font-regular text-sm md:text-base lg:text-base">
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
