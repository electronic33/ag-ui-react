import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import classNames from 'classnames';
import { FocusLock } from '@app-garage/focus-trap';
import { useId } from 'react-id-generator';

type MenuButtonTypes = {
  delay?: number;
  children?: React.ReactNode;
  direction?: 'top' | 'bottom' | 'right' | 'left';
  content: React.ReactNode;
  contentClassNames?: string;
  arrowClasses?: string;
  trigger?: string;
  headerText?: string;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  initialFocusRef?: { current: HTMLElement };
};

export const MenuButton = ({
  delay,
  children,
  content,
  direction = 'bottom',
  contentClassNames,
  headerText,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  initialFocusRef,
}: MenuButtonTypes): React.ReactElement => {
  let timeout: undefined | number;

  const [active, setActive] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [id] = useId();

  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 0);
  };

  // const toggleTip = () => {
  //   timeout = setTimeout(() => {
  //     setActive((prev) => !prev);
  //   }, delay || 0);
  // };

  // const delayedHideTip = () => {
  //   timeout = setTimeout(() => {
  //     hideTip();
  //   }, 1000);
  // };

  const hideTip = useCallback(() => {
    clearInterval(timeout);
    setActive(false);
  }, [timeout]);

  useEffect(() => {
    // @ts-ignore
    const handleButtonPress = (e) => {
      if (active && closeOnEsc && e.code === 'Escape') {
        hideTip();
      }
    };

    document.addEventListener('keydown', handleButtonPress);
    return () => document.removeEventListener('keydown', handleButtonPress);
  }, [active, closeOnEsc, hideTip]);

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
      'aria-haspopup': true,
      'aria-controls': `popover-content-${id}`,
      'aria-expanded': active,
    },
  });

  useEffect(() => {
    // @ts-ignore
    function handleClickOutside(event) {
      if (
        active &&
        closeOnOutsideClick &&
        popperElement &&
        !popperElement.contains(event.target) &&
        referenceElement &&
        !referenceElement.contains(event.target)
      ) {
        hideTip();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [active, closeOnOutsideClick, hideTip, popperElement, referenceElement]);

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
    <div ref={ref}>
      <div className="tooltip-wrapper" ref={setReferenceElement}>
        {childrenWithProps}
      </div>
      {active && (
        <FocusLock initialFocusRef={initialFocusRef} isDisabled={!active} restoreFocus>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="menu-button-popper-container popper-arrow-conainer"
            data-popper-placement={direction}
            role="dialog"
            aria-hidden={active}
            aria-labelledby={`popover-header-${id}`}
            aria-describedby={`popover-body-${id}`}
            id={`popover-content-${id}`}
            // tabIndex={0}
          >
            <div
              className={classNames('tooltip-content menu-button-content', {}, contentClassNames)}
            >
              {headerText && (
                <div className="menu-button-header-text" id={`popover-header-${id}`}>
                  {headerText}
                </div>
              )}

              <button
                type="button"
                onClick={hideTip}
                className="menu-button-button focus:ring-2 ring-blue-400"
                aria-label="close"
              >
                <svg
                  className="menu-button-svg"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
              <div id={`popover-body-${id}`}>{content}</div>
            </div>
          </div>
        </FocusLock>
      )}
    </div>
  );
};
