import React from "react";

const Slide = ({ content }) => (
  <div className="h-24 w-full font-bold">
    <img src={`${content}`} alt="lol" />
  </div>
);

export default Slide;
