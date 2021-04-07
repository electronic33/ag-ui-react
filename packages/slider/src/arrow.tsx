import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

type ArrowProps = {
  direction: 'right' | 'left';
  onClick: () => void;
};

export const Arrow = ({ direction, onClick }: ArrowProps) => (
  <button
    type="button"
    onClick={onClick}
    className="arrow-container"
    // className={`flex absolute top-1/2 h-12 w-12 just9ify-center bg-blue-700 rounded-full cursor-pointer items-center transition-transform ease-in duration-100 hover:scale-110 ${
    //   direction === "right" ? `right-6` : `left-6`
    // }`}
  >
    {direction === 'right' ? (
      <AiOutlineArrowRight
        className="arrow-icon"
        // style={{
        //   transform: `translate(${
        //     direction === "left" ? "-2" : "2"
        //   }px, ${0}px)`,
        // }}
      />
    ) : (
      <AiOutlineArrowLeft
        className="arrow-icon"
        // style={{
        //   transform: `translate(${
        //     direction === "left" ? "-2" : "2"
        //   }px, ${0}px)`,
        // }}
      />
    )}
  </button>
);
