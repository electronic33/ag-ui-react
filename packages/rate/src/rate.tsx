import React, { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

type RateTypes = {
  numberOfStars: number;
  StarIcon: React.ComponentType<{ className: string }>;
  activeClassName: string;
  disabledClassName: string;
  labels: string[];
};

export const Rate = ({
  numberOfStars,
  StarIcon,
  activeClassName,
  disabledClassName,
  labels,
}: RateTypes): React.ReactElement => {
  const numbersArray = useMemo(() => {
    const array = [];

    for (let i = 0; i < numberOfStars; i += 1) {
      array.push(i);
    }

    return array;
  }, [numberOfStars]);

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="main-div-rate">
      <div ref={ref} className="main-div-rate">
        {numbersArray.map((i) => (
          <button
            type="button"
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
              className={classNames('icon-rate transform ', {
                [`${disabledClassName}`]: isHovering ? i > hoveredIndex - 1 : i > activeIndex,
                [`${activeClassName}`]: isHovering ? i < hoveredIndex : i < activeIndex + 1,
                'scale-125 ': i === hoveredIndex - 1,
              })}
            />
          </button>
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
