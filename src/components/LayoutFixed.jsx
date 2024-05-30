import React from "react";
import Navbar from "./Navbar";

const LayoutFixed = ({ children }) => {
  return (
    <div>
      <Navbar classes="fixed top-8 left-0 right-0" />
      <div>{children}</div>
    </div>
  );
};

export default LayoutFixed;
