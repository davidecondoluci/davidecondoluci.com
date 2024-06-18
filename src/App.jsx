import React, { useEffect, useState } from "react";
import AnimatedCursor from "react-animated-cursor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";

const App = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Funzione per controllare la dimensione dello schermo
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg: in Tailwind è 1024px
    };

    checkScreenSize(); // Controlla immediatamente alla prima esecuzione
    window.addEventListener("resize", checkScreenSize); // Aggiungi l'evento resize

    // Pulizia dell'evento quando il componente viene smontato
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="w-full bg-white text-gray">
      {isLargeScreen && (
        <AnimatedCursor
          innerSize={8}
          outerSize={32}
          color="#ffffff"
          outerAlpha={0.5}
          innerScale={0.75}
          outerScale={2}
          outerStyle={{
            backgroundColor: "#ffffff20",
            mixBlendMode: "exclusion",
          }}
          innerStyle={{
            backgroundColor: "#ffffff",
            mixBlendMode: "exclusion",
          }}
        />
      )}
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
