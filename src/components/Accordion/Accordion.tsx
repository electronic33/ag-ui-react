import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import useCollapseAnimation from "../../hooks/useCollapseAnimation";

export interface AccordionProps {
  /**
  Text to display
  */
  text?: string;
  className?: string;
  children?: React.ReactNode;
  Icon?: React.ComponentType<{ className?: string }>;
  /**
  Icon to the right of the text, that will be rotated on open
  */
  ArrowIcon?: React.ComponentType<{ className?: string }>;
  /**
  className of the dropdown
  */
  DropDownClassName?: string;

  onClick?: () => void;

  preventDefault?: boolean;
  open?: boolean;
}

const Accordion = ({
  text,
  Icon,
  ArrowIcon,
  className,
  DropDownClassName,
  children,
  open,
  onClick,
  preventDefault = false,
}: AccordionProps): React.ReactElement => {
  const collapseRef = useRef();
  const [accordionId, setAccordionId] = useState<number>();

  useEffect(() => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    setAccordionId(getRandomInt(10000));
  }, []);

  const { onToggleIsOpen, isOpen, isTransitioning } = useCollapseAnimation(
    collapseRef,
    false,
    open,
  );

  const handleClick = () => {
    if (!isTransitioning && !preventDefault) {
      onToggleIsOpen();
    }
  };

  useEffect(() => {
    function handleSpacebarPress(e) {
      if (e.code === "Space") {
        if (!isTransitioning) {
          onToggleIsOpen();
        }
      }
    }

    document.addEventListener("keydown", handleSpacebarPress);
    return () => document.removeEventListener("keydown", handleSpacebarPress);
  }, [isOpen]);

  return (
    <div className={classNames("accordion", className)}>
      <button
        aria-expanded={open ? open : isOpen}
        aria-controls={`accordion-${accordionId}`}
        className="flex justify-center items-center cursor-pointer"
        onClick={handleClick}
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
      </button>
      <div
        id={`accordion-${accordionId}`}
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
