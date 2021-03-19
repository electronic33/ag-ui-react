import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePopper } from "react-popper";
import classNames from "classnames";
import { MdClose } from "react-icons/md";
import FocusLock from "../FocusTrap/FocusTrap";
import { useId } from "react-id-generator";

export interface TooltipTypes {
  delay?: number;
  children?: React.ReactNode;
  direction?: string;
  content?: unknown;
  contentClassNames?: string;
  arrowClasses?: string;
  trigger?: string;
  headerText?: string;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  withCloseButton?: boolean;
  withArrow?: boolean;
  containterFocus?: boolean;
  active: boolean;
  setActive: (prevState?: boolean) => void;
}

const Tooltip = ({
  delay,
  children,
  content,
  direction = "top",
  contentClassNames,
  arrowClasses,
  trigger = "click",
  headerText,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  initialFocusRef,
  withCloseButton = false,
  withArrow = false,
  containterFocus = true,
  active,
  setActive,
}: TooltipTypes): React.ReactElement => {
  let timeout;

  const ref = useRef();

  const [id] = useId();

  const [referenceElement, setReferenceElement] = useState(null);

  const [popperElement, setPopperElement] = useState(null);

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
    }, 1000);
  };

  if (closeOnEsc) {
    useEffect(() => {
      const handleButtonPress = (e) => {
        if (active && e.code === "Escape") {
          hideTip();
        }
      };

      document.addEventListener("keydown", handleButtonPress);
      return () => document.removeEventListener("keydown", handleButtonPress);
    }, [active]);
  }

  const child = React.Children.only(children) as React.ReactElement & {
    ref?: React.Ref<any>;
  };

  const handleClick = () => {
    if (trigger === "hover") {
      return null;
    } else if (trigger === "click") {
      if (!active) {
        return showTip();
      } else if (active) {
        return hideTip();
      }
    }
  };

  const childrenWithProps = React.cloneElement(child, {
    ...child.props,
    onClick: handleClick,
    onFocus: trigger === "hover" ? toggleTip : undefined,
    onMouseEnter: trigger === "hover" ? showTip : undefined,
    onMouseLeave: trigger === "hover" ? delayedHideTip : undefined,
    onBlur: trigger === "hover" ? hideTip : undefined,
    ariaProps: {
      "aria-haspopup": true,
      "aria-controls": `popover-content-${id}`,
      "aria-expanded": active,
    },
  });

  if (closeOnOutsideClick) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          active &&
          popperElement &&
          !popperElement.contains(event.target) &&
          referenceElement &&
          !referenceElement.contains(event.target)
        ) {
          hideTip();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [active, popperElement]);
  }

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

  let tabbable;
  if (containterFocus) {
    tabbable = { tabIndex: 1 };
  }
  return (
    <div ref={ref}>
      <div className="popover-wrapper" ref={setReferenceElement}>
        {childrenWithProps}
      </div>
      {active && trigger === "click" && (
        <FocusLock
          initialFocusRef={initialFocusRef}
          isDisabled={!active}
          restoreFocus={true}
        >
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="bg-white border border-gray-200 rounded z-20 focus:border-transparent popper-arrow-conainer"
            data-popper-placement={direction}
            role="dialog"
            aria-hidden={active}
            aria-labelledby={`popover-header-${id}`}
            aria-describedby={`popover-body-${id}`}
            id={`popover-content-${id}`}
            {...tabbable}
          >
            <div
              className={classNames(
                "popover-content relative",
                {},
                contentClassNames,
              )}
            >
              {headerText && (
                <div
                  className="text-gray-700 font-semibold text-lg pb-2 border-b border-gray-200 w-full mr-10"
                  id={`popover-header-${id}`}
                >
                  {headerText}
                </div>
              )}

              {withCloseButton && (
                <button
                  onClick={hideTip}
                  className="absolute flex-shrink-0 top-1 right-2 text-lg text-gray-400 z-10"
                  aria-label="close"
                >
                  <MdClose className="flex-shrink-0" />
                </button>
              )}

              <div id={`popover-body-${id}`}>{content}</div>
            </div>
            {withArrow && (
              <div
                className={classNames(
                  "arrow-base bg-red-400 border border-gray-200 ",
                  arrowClasses,
                )}
                style={styles.arrow}
                data-popper-arrow
                id="arrow"
              ></div>
            )}
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
          }}
          {...attributes.popper}
          className="bg-white border border-gray-200 rounded z-20"
          data-popper-placement={direction}
          role="tooltip"
          aria-hidden={active}
          aria-labelledby={`popover-header-${id}`}
          aria-describedby={`popover-body-${id}`}
          id={`popover-content-${id}`}
          tabIndex={1}
        >
          <div
            className={classNames(
              "popover-content relative",
              {},
              contentClassNames,
            )}
          >
            {headerText && (
              <div
                className="text-gray-700 font-semibold text-lg pb-2 border-b border-gray-200 w-full mr-10"
                id={`popover-header-${id}`}
              >
                {headerText}
              </div>
            )}
            <button
              onClick={hideTip}
              className="absolute flex-shrink-0 top-1 right-2 text-lg text-gray-400 z-10"
              aria-label="close"
            >
              <MdClose className="flex-shrink-0" />
            </button>
            <div id={`popover-body-${id}`}>{content}</div>
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