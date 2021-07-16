import React from 'react';

type ArrowProps = {
  direction: 'right' | 'left';
  onClick: () => void;
};

export const Arrow = ({ direction, onClick }: ArrowProps) => (
  <button
    type="button"
    onClick={onClick}
    className="slider-arrow-container"
    // className={`flex absolute top-1/2 h-12 w-12 just9ify-center bg-blue-700 rounded-full cursor-pointer items-center transition-transform ease-in duration-100 hover:scale-110 ${
    //   direction === "right" ? `right-6` : `left-6`
    // }`}
  >
    {direction === 'right' ? (
      <svg
        className="slider-arrow-icon"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 1024 1024"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z" />
      </svg>
    ) : (
      <svg
        className="slider-arrow-icon"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 1024 1024"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 0 0 0 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
      </svg>
    )}
  </button>
);
