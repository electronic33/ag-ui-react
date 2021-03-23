/* eslint-disable react/display-name */
import React, { useLayoutEffect, useState } from "react";
import classNames from "classnames";

export const useScrollBelowElementHook = (
  ref: any,
  initialState: boolean,
): boolean => {
  const [showScroll, setShowScroll] = useState(initialState);
  const [scroll, setScroll] = useState(window.pageYOffset);

  useLayoutEffect(() => {
    const handleResize = () => {
      setScroll(window.pageYOffset);
    };

    window.addEventListener("scroll", handleResize);
    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  });

  useLayoutEffect(() => {
    if (ref.current.getBoundingClientRect().top > -0.00001) {
      setShowScroll(false);
    } else {
      setShowScroll(true);
    }
  }, [scroll]);

  return showScroll;
};

type ScrollToProps = {
  className: string;
  /**
   Scroll offset in pixels.
  */
  offset: number;
  Icon: React.ComponentType<{ className: string }>;
  /**
   When to show the scrollTo component.
  */
  showScroll: boolean;
  scrollToRef: { current: HTMLElement };
};

export const ScrollTo = ({
  className,
  offset = 0,
  Icon,
  showScroll = false,
  scrollToRef,
}: ScrollToProps) => {
  const executeScroll = () => {
    const offsetTop =
      scrollToRef.current.getBoundingClientRect().top + window.pageYOffset;

    window.scroll({
      top: offsetTop - offset,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={executeScroll}
      className={classNames(
        "main-div-scroll",
        {
          "opacity-0 pointer-events-none": showScroll === false,
          "opacity-1": showScroll === true,
        },
        className,
      )}
    >
      {Icon}
    </button>
  );
};
