import React, { FC } from "react";
import classNames from "classnames";

export interface SpinnerProps {
  /**
   use width and height modifying classes for size changing, and text coloring classes for color changing. 
  */
  className?: string;
}

const ButtonSpinner: FC<SpinnerProps> = ({
  className,
  stroke = "rgba(59, 130, 246, 1)",
  fill = "rgba(59, 130, 246, 1)",
}) => {
  return (
    <svg
      className={classNames("btn-spinner", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={`${stroke}`}
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill={`${fill}`}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default ButtonSpinner;
