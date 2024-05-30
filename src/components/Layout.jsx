import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="max-h-[100lvh] overflow-hidden flex flex-col justify-between h-lvh py-8">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
