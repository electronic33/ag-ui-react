/* eslint-disable no-param-reassign */
import { useLayoutEffect, useState } from "react";

const useCollapseAnimation: (
  collapseRef: { current: HTMLElement },
  initialState?: boolean,
) => {
  onToggleIsOpen: () => void;
  isOpen: boolean;
  isTransitioning: boolean;
} = (collapseRef: { current: HTMLElement }, initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useLayoutEffect(() => {
    if (initialState === false) {
      collapseRef.current.style.height = `${0}px`;
    }
  }, []);

  const handleOpen = (element) => {
    const sectionHeight = element.current.scrollHeight;

    // have the element transition to the height of its inner content
    element.current.style.height = `${sectionHeight}px`;

    const handleTransitionEnd = () => {
      element.current.removeEventListener("transitionend", handleTransitionEnd);

      // remove "height" from the element's inline styles, so it can return to its initial value
      element.current.style.height = null;
    };

    // when the next css transition finishes (which should be the one we just triggered)
    element.current.addEventListener("transitionend", handleTransitionEnd);

    // mark the section as "currently not collapsed"
    setIsOpen(true);
  };

  const handleClose = (element) => {
    // get the height of the element's inner content, regardless of its actual size
    const sectionHeight = element.current.scrollHeight;

    // temporarily disable all css transitions
    const elementTransition = element.current.style.transition;
    element.current.style.transition = "";

    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we
    // aren't transitioning out of 'auto'
    requestAnimationFrame(() => {
      element.current.style.height = `${sectionHeight}px`;
      element.current.style.transition = elementTransition;

      // on the next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0
      requestAnimationFrame(() => {
        element.current.style.height = `${0}px`;
      });
    });

    // mark the section as "currently collapsed"
    setIsOpen(false);
  };

  const onToggleIsOpen = () => {
    setIsTransitioning(true);

    if (isOpen) {
      handleClose(collapseRef);
    } else {
      handleOpen(collapseRef);
    }

    setTimeout(() => {
      setIsTransitioning(false);
      // the duration of the animation
    }, 400);
  };

  return { onToggleIsOpen, isOpen, isTransitioning };
};

export default useCollapseAnimation;
