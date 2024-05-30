import React from "react";
import Navbar from "./Navbar";

const LayoutFixed = ({ children }) => {
  return (
    <div>
      <Navbar classes="fixed top-0 left-0 right-0 py-8" />
      <div>{children}</div>
    </div>
  );
};

export default LayoutFixed;
