import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import classNames from 'classnames';
import ReactDOM from 'react-dom';

type TooltipTypes = {
  delay?: number;
  children: React.ReactNode;
  direction?: 'top' | 'bottom' | 'right' | 'left';
  content: string | React.ReactNode;
  contentClassName?: string;
  arrowClassName?: string;
};

export const Tooltip = ({
  delay = 0,
  children,
  content,
  direction = 'top',
  contentClassName,
  arrowClassName,
}: TooltipTypes): React.ReactElement => {
  let timeout: number;

  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const toggleTip = () => {
    timeout = setTimeout(() => {
      setActive((prev) => !prev);
    }, delay);
  };

  const hideTip = () => {
    clearTimeout(timeout);
    setActive(false);
  };

  const child = React.Children.only(children) as React.ReactElement;

  const trigger = React.cloneElement(child, {
    ...child.props,
    onMouseEnter: showTip,
    onMouseLeave: hideTip,
    onFocus: toggleTip,
    onBlur: hideTip,
  });

  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: direction,
    modifiers: [
      {
        name: 'offset',
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
            <p className={classNames('tooltip-content', contentClassName)}>{content}</p>
            <div
              className={classNames('', arrowClassName)}
              style={styles.arrow}
              data-popper-arrow
              id="arrow"
            />
          </div>,
          document.body,
        )}
    </>
  );
};
