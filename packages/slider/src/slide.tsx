import React from 'react';

type slideProps = {
  height: number;
  width: number;
  children: React.ReactNode;
  onClick?: (index: number) => void;
  index: number;
};

export const Slide = ({
  height,
  width,
  children,
  onClick,
  index,
}: slideProps): React.ReactElement => (
  <div
    role="button"
    tabIndex={0}
    onClick={() => {
      if (onClick) {
        onClick(index);
      }
    }}
    onKeyDown={(event) => {
      if (onClick && (event.code === 'Space' || event.code === 'Enter')) {
        onClick(index);
      }
    }}
    className="Slide flex justify-center items-center h-auto flex-1"
    style={{ width, height }}
  >
    {children}
  </div>
);
