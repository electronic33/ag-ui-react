import React from "react";
import classNames from "classnames";

type dotTypes = {
  activeDot: number;
  onDotClick: (index: number) => void;
  dotsArr: number[];
};

const Dot = ({ activeDot, index, onDotClick }) => (
  <span
    onClick={() => onDotClick(index)}
    className={classNames("dot", {
      "bg-blue-600": index === activeDot,
      "bg-blue-400": index !== activeDot,
    })}
  />
);

export const Dots = ({
  activeDot,
  onDotClick,
  dotsArr,
}: dotTypes): React.ReactElement => {
  console.log("🚀 ~ file: Dots.tsx ~ line 42 ~ dotsArr", dotsArr);

  return (
    <div className="dots">
      {/* <div className="absolute bottom-6 w-full flex items-center justify-center "> */}
      {dotsArr.map((slide, index) => (
        <Dot
          key={slide}
          activeDot={activeDot}
          index={index}
          onDotClick={onDotClick}
        />
      ))}
    </div>
  );
};
