import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null); // Ref per la navbar
  const [navHeight, setNavHeight] = useState(0); // Stato per l'altezza della navbar

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Misura l'altezza della navbar quando il componente viene montato
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  // Aggiungi o rimuovi la classe Tailwind `overflow-hidden` al body
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Pulizia: rimuovi la classe quando il componente viene smontato
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  const getLinkClass = (path) => {
    let classes = "text-gray hover:text-green";
    if (location.pathname === path) {
      classes += " text-green";
    }
    return classes;
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div
      className="absolute top-0 right-0 left-0 z-10 px-4 md:px-6 py-8"
      ref={navRef}
    >
      <nav className="flex justify-between items-center w-full lg:w-4/5 mx-auto">
        <a href="/">
          <Logo />
        </a>
        {/* Hamburger Icon */}
        <button className="lg:hidden text-gray" onClick={toggleMenu}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 items-center font-sans font-regular text-xl">
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
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden fixed left-0 w-full bg-white shadow-md flex flex-col items-center justify-center z-20"
            style={{ top: `${navHeight}px` }} // Imposta il top dinamicamente
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Menu Content */}
            <ul className="relative flex flex-col items-center space-y-6 font-sans font-regular text-3xl z-10 p-4">
              <li>
                <Link
                  to="/about"
                  className={getLinkClass("/about")}
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/work"
                  className={getLinkClass("/work")}
                  onClick={toggleMenu}
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={getLinkClass("/contact")}
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
