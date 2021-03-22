import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";

type RateTypes = {
  numberOfStars: number;
  StarIcon: React.ComponentType<{ className: string }>;
  activeClassName: string;
  disabledClassName: string;
  /**
   Array of strings representing the labels of the stars at the same indexes.
  */
  labels: string[];
}

export const Rate = ({
  numberOfStars,
  StarIcon,
  activeClassName,
  disabledClassName,
  labels,
}: RateTypes): React.ReactElement => {
  const [numbersArray, setNumbersArray] = useState<number[]>([]);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>();
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  // const [mouseX, setMouseX] = useState<number>(-1);
  // const [starWidth, setStarWidth] = useState<number>(-1);

  const ref = useRef<HTMLDivElement>();
  const starRef = useRef<HTMLDivElement>();

  useEffect(() => {
    let i;
    const array = [];
    for (i = 0; i < numberOfStars; i++) array.push(i);
    return setNumbersArray(array);
  }, []);

  // useLayoutEffect(() => {
  //   const containerSpecs = ref?.current?.getBoundingClientRect();
  //   if (containerSpecs) {
  //     console.log(containerSpecs);
  //   }
  //   const starSpecs = starRef?.current?.getBoundingClientRect();
  //   if (starSpecs) {
  //     setStarWidth(starSpecs.width);
  //   }
  // }, [activeIndex, hoveredIndex]);
  // const onMouseMove = (e) => {
  //   setMouseX(e.nativeEvent.offsetX);
  // };

  return (
    <div className="main-div-rate">
      <div
        ref={ref}
        // onMouseMove={(e) => onMouseMove(e)}
        className="main-div-rate"
      >
        {/* <div
          ref={starRef}
          onMouseEnter={() => {
            setHoveredIndex(0 + 1);
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setHoveredIndex(0);
            setIsHovering(false);
          }}
          onClick={() => setActiveIndex(i)}
        >
          <StarIcon
            className={classNames("icon-rate transform ", {
              [`${disabledClassName}`]: isHovering
                ? 0 > hoveredIndex - 1
                : 0 > activeIndex,
              [`${activeClassName}`]: isHovering
                ? 0 < hoveredIndex
                : 0 < activeIndex + 1,
              // "text-red-500": 0 === hoveredIndex - 1 && mouseX > starWidth / 2,
              // "text-green-500":
              //   0 === hoveredIndex - 1 && mouseX < starWidth / 2,
              "scale-125 ": 0 === hoveredIndex - 1,
            })}
          />
        </div> */}

        {/* {numbersArray.slice(1).map((i) => ( */}
        {numbersArray.map((i) => (
          <div
            onMouseEnter={() => {
              setHoveredIndex(i + 1);
              setIsHovering(true);
            }}
            onMouseLeave={() => {
              setHoveredIndex(0);
              setIsHovering(false);
            }}
            onClick={() => setActiveIndex(i)}
            key={i}
          >
            <StarIcon
              className={classNames("icon-rate transform ", {
                [`${disabledClassName}`]: isHovering
                  ? i > hoveredIndex - 1
                  : i > activeIndex,
                [`${activeClassName}`]: isHovering
                  ? i < hoveredIndex
                  : i < activeIndex + 1,
                // "text-red-500":
                //   i === hoveredIndex - 1 && mouseX > starWidth / 2,
                // "text-green-500":
                //   i === hoveredIndex - 1 && mouseX < starWidth / 2,
                "scale-125 ": i === hoveredIndex - 1,
              })}
            />
          </div>
        ))}
      </div>
      <div className="rate-text-container">
        <p className="rate-text">
          {hoveredIndex > 0 ? labels[hoveredIndex - 1] : labels[activeIndex]}
        </p>
      </div>
    </div>
  );
};


