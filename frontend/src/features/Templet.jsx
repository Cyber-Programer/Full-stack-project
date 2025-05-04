import React from "react";
import Nav from "./Nav";

const Template = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <Nav />
      <div className="relative max-w-lg md:max-w-3xl lg:max-w-11/12 h-[600px] md:h-[700px] bg-white mx-auto -mt-16 z-20 p-6 rounded-xl shadow-md">
      </div>
    </div>
  );
};

export default Template;
