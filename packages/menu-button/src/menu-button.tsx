import React, { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import classNames from "classnames";
import { MdClose } from "react-icons/md";
import { FocusLock } from "@app-garage/focus-trap";
import { useId } from "react-id-generator";

type MenuButtonTypes = {
  delay?: number;
  children?: React.ReactNode;
  direction?: string;
  content: string;
  contentClassNames?: string;
  arrowClasses?: string;
  trigger?: string;
  headerText?: string;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
};

export const MenuButton = ({
  delay,
  children,
  content,
  direction = "bottom",
  contentClassNames,
  headerText,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  initialFocusRef,
}: MenuButtonTypes): React.ReactElement => {
  let timeout;

  const [active, setActive] = useState(false);

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
    if (!active) {
      return showTip();
    }
    if (active) {
      return hideTip();
    }
  };

  const childrenWithProps = React.cloneElement(child, {
    ...child.props,
    onClick: handleClick,
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

  return (
    <div ref={ref}>
      <div className="tooltip-wrapper" ref={setReferenceElement}>
        {childrenWithProps}
      </div>
      {active && (
        <FocusLock
          initialFocusRef={initialFocusRef}
          isDisabled={!active}
          restoreFocus
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
            tabIndex={1}
          >
            <div
              className={classNames(
                "tooltip-content relative",
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
          </div>
        </FocusLock>
      )}
    </div>
  );
};
