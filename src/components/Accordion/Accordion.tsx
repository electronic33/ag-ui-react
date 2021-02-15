import React, { FC, useRef } from "react";
import classNames from "classnames";
import useCollapseAnimation from "../../hooks/useCollapseAnimation";

interface AccordionProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
  Icon?: React.ComponentType<{ className: string }>;
  ArrowIcon?: React.ComponentType<{ className: string }>;
  DropDownClassName: string;
}

const Accordion: FC<AccordionProps> = ({
  text,
  Icon,
  ArrowIcon,
  className,
  DropDownClassName,
  children,
}) => {
  const collapseRef = useRef();

  const { onToggleIsOpen, isOpen, isTransitioning } = useCollapseAnimation(
    collapseRef,
    false,
  );

  return (
    <div className={classNames("accordion", className)}>
      <div
        className="flex justify-center items-center cursor-pointer"
        onClick={isTransitioning ? undefined : onToggleIsOpen}
      >
        <h2 className="flex text-xl text-gray-900 relative">
          {Icon && (
            <Icon
              className={classNames(
                "text-gray-900 absolute inset-y-0 -left-6 h-full",
              )}
            />
          )}
          {text && text}
          {ArrowIcon && (
            <ArrowIcon
              className={classNames(
                "text-gray-900 transform transition-transform duration-300 absolute inset-y-0 -right-8 h-full",
                {
                  "rotate-180": !isOpen,
                  "rotate-0": isOpen,
                },
              )}
            />
          )}
        </h2>
      </div>
      <div
        ref={collapseRef}
        className={classNames("drop-down", {}, DropDownClassName)}
        // style={{ transition: "height 0.3s ease-out" }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
