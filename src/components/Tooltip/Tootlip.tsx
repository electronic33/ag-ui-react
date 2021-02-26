import React, { useState, useRef } from "react";

interface TooltipTypes {
  tipClassName?: string;
  delay?: number;
  children?: React.ReactNode;
  direction?: string;
  content: string;
  containerClasses?: string;
  arrowClasses?: string;
}

const Tooltip = ({
  tipClassName,
  delay,
  children,
  direction,
  content,
  containerClasses = "bg-gray-600",
  arrowClasses = "bg-gray-600",
}: TooltipTypes): React.ReactElement => {
  let timeout;
  const [active, setActive] = useState(false);
  const tooltipRef = useRef();

  const bottomClass = "-top-1 margin-calc-x";
  const topClass = "-bottom-1 margin-calc-x";
  const leftClass = "-right-1 margin-calc-y";
  const rightClass = "-left-1 margin-calc-y";
  const bottomMargin = "-mb-5";
  const topMargin = "-mt-5";
  const leftMargin = "-ml-10";
  const rightMargin = "-mr-10";

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="tooltip-wrapper mt-40 ml-40"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div
          ref={tooltipRef}
          className={`tooltip-tip ${direction || "bottom"} ${
            tipClassName || ""
          }`}
        >
          <div
            className={`${containerClasses} p-2 rounded relative z-auto ${
              direction === "top" ? topMargin : ""
            } ${direction === "bottom" ? bottomMargin : ""} ${
              direction === "left" ? leftMargin : ""
            } ${direction === "right" ? rightMargin : ""}`}
          >
            <div
              style={{ zIndex: -1 }}
              className={`w-2 h-2 transform rotate-45 absolute ${arrowClasses} ${
                direction === "top" ? topClass : ""
              } ${direction === "bottom" ? bottomClass : ""} ${
                direction === "left" ? leftClass : ""
              } ${direction === "right" ? rightClass : ""}
               `}
            />

            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
