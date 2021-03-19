import React, { useRef, useState, useCallback, useMemo } from "react";
import classNames from "classnames";
import { useId } from "react-id-generator";
import { animated, useSpring } from "react-spring";

type CommonProps = {
  content: React.ReactNode;
  containerClassName?: string;
  buttonClassName?: string;
  contentClassName?: string;
  Icon?: React.ComponentType<{ className?: string }>;
  ArrowIcon?: React.ComponentType<{ className?: string }>;
};

type ConditionalProps =
  | {
      isControlled?: false;
      isOpen?: never;
      onChange?: (isOpen: boolean) => void;
      children: ({ isOpen }: { isOpen: boolean }) => React.ReactNode;
    }
  | {
      isControlled: true;
      isOpen: boolean;
      onChange: (isOpen: boolean) => void;
      children: React.ReactNode;
    };

type AccordionProps = CommonProps & ConditionalProps;

const Accordion = ({
  Icon,
  ArrowIcon,
  containerClassName,
  buttonClassName,
  contentClassName,
  children,
  content,
  onChange,
  isOpen = false,
  isControlled = false,
}: AccordionProps): React.ReactElement => {
  const collapseRef = useRef<HTMLDivElement>();
  const [accordionId] = useId(1, "accordion");

  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isOpenState = useMemo(() => (isControlled ? isOpen : internalIsOpen), [
    isControlled,
    internalIsOpen,
    isOpen,
  ]);

  const [springStyles, setSpringProperties] = useSpring(() => ({
    opacity: 0,
    height: 0,
    config: {
      mass: 1,
      tension: 50,
      friction: 10,
    },
  }));

  const animateSpring = useCallback((isOpenStatus) => {
    if (isOpenStatus) {
      const height = collapseRef.current.scrollHeight;

      setSpringProperties({ opacity: 1, height });
    } else {
      setSpringProperties({ opacity: 0, height: 0 });
    }
  }, []);

  const handleAccordionButtonClick = useCallback(() => {
    animateSpring(!isOpenState);

    if (!isControlled) {
      setInternalIsOpen(!isOpenState);
    }

    if (onChange) {
      onChange(!isOpenState);
    }
  }, [isOpenState, onChange]);

  return (
    <div className={classNames("accordion-container", containerClassName)}>
      <button
        aria-expanded={isOpenState}
        aria-controls={accordionId}
        className={classNames("accordion-button", buttonClassName)}
        onClick={handleAccordionButtonClick}
      >
        {Icon && <Icon className="mr-2" />}
        {isControlled
          ? children
          : (children as ({ isOpen }: { isOpen: boolean }) => React.ReactNode)({
              isOpen: internalIsOpen,
            })}
        {ArrowIcon && (
          <ArrowIcon
            className={classNames(
              "transform transition-transform duration-300 ml-auto",
              {
                "rotate-180": !isOpenState,
                "rotate-0": isOpenState,
              },
            )}
          />
        )}
      </button>
      <animated.div
        id={accordionId}
        ref={collapseRef}
        style={springStyles}
        className={classNames("accordion-content", contentClassName)}
      >
        {content}
      </animated.div>
    </div>
  );
};

export default Accordion;
