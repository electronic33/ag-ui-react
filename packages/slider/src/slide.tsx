import React from "react";

type slideProps = {
  height: number;
  width: number;
  children: React.ReactNode;
  setterFn?: (index: number) => void;
  index: number;
}

export const Slide = ({
  height,
  width,
  children,
  setterFn,
  index,
}: slideProps): React.ReactElement => {
  return (
    <div
      onClick={() => setterFn(index)}
      className="Slide flex justify-center items-center h-auto flex-1"
      style={{ width: `${width}`, height: `${height}` }}
    >
      {children}
    </div>
  );
};


