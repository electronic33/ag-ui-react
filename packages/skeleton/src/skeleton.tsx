import React from "react";
import classNames from "classnames";

type SkeletonTypes = {
  className: string;
  type: string;
  width: string | number;
  height: string | number;
};

export const Skeleton = ({
  className,
  type,
  width,
  height,
}: SkeletonTypes): React.ReactElement => (
  <div
    className={classNames(
      "bg-gray-200 animate-pulse rounded",
      {
        "rounded-full": type === "circle",
      },
      className,
    )}
    style={{ width, height }}
  />
);
