import React from 'react';
import classNames from 'classnames';

type DotsTypes = {
  activeDot: number;
  onDotClick: (index: number) => void;
  dotsArr: number[];
};

type DotTypes = {
  activeDot: number;
  onDotClick: (index: number) => void;
  index: number;
};

const Dot = ({ activeDot, index, onDotClick }: DotTypes) => (
  <button
    aria-label={`go-to-slide-${index}`}
    type="button"
    onClick={() => onDotClick(index)}
    className={classNames('dot', {
      'bg-blue-600': index === activeDot,
      'bg-blue-400': index !== activeDot,
    })}
  />
);

export const Dots = ({ activeDot, onDotClick, dotsArr }: DotsTypes) => (
  <div className="dots">
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
