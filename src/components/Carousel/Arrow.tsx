import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

const Arrow = ({ direction, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className={`flex absolute top-1/2 h-12 w-12 justify-center bg-blue-700 rounded-full cursor-pointer items-center transition-transform ease-in duration-100 hover:scale-110 ${
        direction === "right" ? `right-6` : `left-6`
      }`}
    >
      {direction === "right" ? (
        <AiOutlineArrowRight
          className=" focus:outline-none text-white"
          style={{
            // translateX: `-${translate}px`,
            transform: `translate(${
              direction === "left" ? "-2" : "2"
            }px, ${0}px)`,
          }}
        />
      ) : (
        <AiOutlineArrowLeft
          className=" focus:outline-none text-white"
          style={{
            // translateX: `-${translate}px`,
            transform: `translate(${
              direction === "left" ? "-2" : "2"
            }px, ${0}px)`,
          }}
        />
      )}
    </div>
  );
};

export default Arrow;
