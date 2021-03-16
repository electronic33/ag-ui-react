import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePopper } from "react-popper";
import classNames from "classnames";
import { MdClose } from "react-icons/md";
import FocusLock from "../FocusTrap/FocusTrap";

export interface TooltipTypes {
  delay?: number;
  children?: React.ReactNode;
  direction?: string;
  content: string;
  contentClassNames?: string;
  arrowClasses?: string;
  trigger?: string;
}

const Tooltip = ({
  delay,
  children,
  content,
  direction = "top",
  contentClassNames,
  arrowClasses,
  trigger = "hover",
}: TooltipTypes): React.ReactElement => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 0);
  };

  const toggleTip = () => {
    timeout = setTimeout(() => {
      setActive((prev) => !prev);
    }, delay || 0);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  const delayedHideTip = () => {
    timeout = setTimeout(() => {
      hideTip();
    }, delay || 1000);
  };

  useEffect(() => {
    const handleButtonPress = (e) => {
      if (active && e.code === "Escape") {
        hideTip();
      }
    };

    document.addEventListener("keydown", handleButtonPress);
    return () => document.removeEventListener("keydown", handleButtonPress);
  }, [active]);

  const child = React.Children.only(children) as React.ReactElement & {
    ref?: React.Ref<any>;
  };

  const ref = useRef();

  // useMemo(() => {
  //   function handleClickOutside(event) {
  //     if (active && ref.current && !ref.current.contains(event.target)) {
  //       console.log("should NOT hide");
  //     } else {
  //       console.log("should hide");
  //       hideTip();
  //     }
  //   }

  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [active]);

  const childrenWithProps = React.cloneElement(child, {
    ...child.props,
    onClick: trigger === "click" ? (!active ? showTip : hideTip) : null,
    onFocus: trigger === "hover" && toggleTip,

    onMouseEnter: trigger === "hover" && showTip,
    onBlur: trigger === "hover" && hideTip,
  });

  const [referenceElement, setReferenceElement] = useState(null);

  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: direction,
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  return (
    <div ref={ref}>
      <div
        className="tooltip-wrapper"
        onMouseLeave={trigger === "hover" && delayedHideTip}
        ref={setReferenceElement}
      >
        {childrenWithProps}
      </div>
      {active && trigger === "click" && (
        <FocusLock isDisabled={!active} restoreFocus={true}>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            id="tooltip"
            className="bg-white border border-gray-200 rounded z-20"
            data-popper-placement={direction}
            role="dialog"
          >
            <div
              className={classNames(
                "tooltip-content relative",
                {},
                contentClassNames,
              )}
            >
              <div className="text-gray-700 font-semibold text-lg pb-2 border-b border-gray-200 w-full mr-10">
                Header
              </div>
              <button
                onClick={hideTip}
                className="absolute flex-shrink-0 top-1 right-2 text-lg text-gray-400 z-10"
              >
                <MdClose className="flex-shrink-0" />
              </button>
              {content}
            </div>
            <div
              className={classNames(
                "arrow-base bg-white border border-gray-200",
                arrowClasses,
              )}
              style={styles.arrow}
              data-popper-arrow
              id="arrow"
            ></div>
          </div>
        </FocusLock>
      )}
      {active && trigger === "hover" && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          onMouseEnter={() => clearTimeout(timeout)}
          onMouseLeave={() => {
            hideTip();
            setShouldPreventClosing(false);
          }}
          {...attributes.popper}
          id="tooltip"
          className="bg-white border border-gray-200 rounded z-20"
          data-popper-placement={direction}
          role="tooltip"
        >
          <div
            className={classNames(
              "tooltip-content relative",
              {},
              contentClassNames,
            )}
          >
            <div className="text-gray-700 font-semibold text-lg pb-2 border-b border-gray-200 w-full mr-10">
              Header
            </div>
            <button
              onClick={hideTip}
              className="absolute flex-shrink-0 top-1 right-2 text-lg text-gray-400 z-10"
            >
              <MdClose className="flex-shrink-0" />
            </button>
            {content}
          </div>
          <div
            className={classNames(
              "arrow-base bg-white border border-gray-200",
              arrowClasses,
            )}
            style={styles.arrow}
            data-popper-arrow
            id="arrow"
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
