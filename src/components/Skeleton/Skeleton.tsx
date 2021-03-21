import React from "react";
import classNames from "classnames";

export interface SkeletonTypes {
  className: string;
  type: string;
  width: string | number;
  height: string | number;
}

const Skeleton = ({
  className,
  type,
  width,
  height,
}: SkeletonTypes): React.ReactElement => {
  return (
    <div
      className={classNames(
        "bg-gray-200 animate-pulse rounded",
        {
          "rounded-full": type === "circle",
        },
        className,
      )}
      style={{ width: width, height: height }}
    ></div>
  );
};

export default Skeleton;
