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
    className={classNames('slider-dot', {
      'slider-dot-active': index === activeDot,
      'slider-dot-not-active': index !== activeDot,
    })}
  />
);

export const Dots = ({ activeDot, onDotClick, dotsArr }: DotsTypes) => (
  <div className="slider-dots">
    {dotsArr.map((slide, index) => (
      <Dot key={slide} activeDot={activeDot} index={index} onDotClick={onDotClick} />
    ))}
  </div>
);
