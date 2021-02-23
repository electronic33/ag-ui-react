import React from "react";

interface slideProps {
  height: number;
  width: number;
  children: React.ReactNode;
  setterFn?: (index: number) => void;
  index: number;
}

const Slide = ({
  height,
  width,
  children,
  setterFn,
  index,
}: slideProps): React.ReactElement => {
  return (
    <div
      onClick={() => setterFn(index)}
      className="Slide flex  h-auto flex-1"
      style={{ width: `${width}`, height: `${height}` }}
    >
      {children}
    </div>
  );
};

export default Slide;
