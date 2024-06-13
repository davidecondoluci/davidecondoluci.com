import React from "react";
import AnimatedCursor from "react-animated-cursor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <div className="w-full bg-white text-gray">
      <AnimatedCursor
        innerSize={16}
        outerSize={32}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: "#FFFFFF",
          mixBlendMode: "difference",
        }}
        outerStyle={{
          border: "1px solid #FFFFFF",
          mixBlendMode: "difference",
        }}
      />
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
