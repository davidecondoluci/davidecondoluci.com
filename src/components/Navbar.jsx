import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-center mt-12 fixed top-0 left-0 right-0 z-10">
      <ul className="flex bg-gray-800 px-8 py-4 rounded-full space-x-8">
        <li>
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:text-gray-400">
            About
          </Link>
        </li>
        <li>
          <Link to="/work" className="text-white hover:text-gray-400">
            Work
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-white hover:text-gray-400">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
