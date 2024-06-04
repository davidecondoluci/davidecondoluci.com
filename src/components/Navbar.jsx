import React from "react";
import "../App.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
  const location = useLocation();

  const getLinkClass = (path) => {
    let classes = "text-white hover:text-[#C5CAE9]";
    if (location.pathname === path) {
      classes += " underline text-[#C5CAE9]";
    }
    return classes;
  };

  return (
    <nav className={`flex justify-center py-12 ${props.classes}`}>
      <ul className="flex bg-[#3F51B5] px-8 py-4 rounded-full space-x-8 items-center font-sans font-regular">
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
  );
};

export default Navbar;
