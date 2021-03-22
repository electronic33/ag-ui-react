import React, { useState } from "react";
import { usePopper } from "react-popper";
import classNames from "classnames";
import ReactDOM from "react-dom";

type TooltipTypes = {
  delay?: number;
  children?: React.ReactNode;
  direction?: string;
  content: string;
  contentClassNames?: string;
  arrowClasses?: string;
}

export const Tooltip = ({
  delay,
  children,
  content,
  direction = "top",
  contentClassNames,
  arrowClasses,
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

  const child = React.Children.only(children) as React.ReactElement & {
    ref?: React.Ref<any>;
  };

  const trigger = React.cloneElement(child, {
    ...child.props,
    onMouseEnter: showTip,
    onMouseLeave: hideTip,
    onFocus: toggleTip,
    onBlur: hideTip,
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
    <>
      <div className="tooltip-wrapper" ref={setReferenceElement}>
        {trigger}
      </div>
      {active &&
        ReactDOM.createPortal(
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="popper-arrow-conainer"
            data-popper-placement={direction}
          >
            <p className={classNames("tooltip-content", {}, contentClassNames)}>
              {content}
            </p>
            <div
              className={classNames("bg-gray-700", arrowClasses)}
              style={styles.arrow}
              data-popper-arrow
              id="arrow"
            ></div>
          </div>,
          document.body,
        )}
    </>
  );
};

