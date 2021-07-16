import React, { ReactElement, useLayoutEffect, useState } from 'react';
import classNames from 'classnames';

export const useScrollBelowElement = (
  ref: React.RefObject<HTMLElement>,
  initialState: boolean,
): boolean => {
  const [showScroll, setShowScroll] = useState(initialState);
  const [scroll, setScroll] = useState(window.pageYOffset);

  useLayoutEffect(() => {
    const handleResize = () => {
      setScroll(window.pageYOffset);
    };

    window.addEventListener('scroll', handleResize);
    return () => {
      window.removeEventListener('scroll', handleResize);
    };
  });

  useLayoutEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().top > -0.00001) {
      setShowScroll(false);
    } else {
      setShowScroll(true);
    }
  }, [scroll, ref]);

  return showScroll;
};

type ScrollToProps = {
  className?: string;
  offset?: number;
  Icon: ReactElement<{ className?: string }>;
  showScroll?: boolean;
  scrollToRef: React.RefObject<HTMLElement>;
};

export const ScrollTo = ({
  className,
  offset = 0,
  Icon,
  showScroll = false,
  scrollToRef,
}: ScrollToProps) => {
  const executeScroll = () => {
    if (scrollToRef.current) {
      const offsetTop = scrollToRef.current.getBoundingClientRect().top + window.pageYOffset;

      window.scroll({
        top: offsetTop - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      type="button"
      onClick={executeScroll}
      className={classNames(
        'scroll-to-main-div',
        {
          'scroll-to-hide-scroll': showScroll === false,
          'scroll-to-show-scroll': showScroll === true,
        },
        className,
      )}
    >
      {Icon}
    </button>
  );
};
