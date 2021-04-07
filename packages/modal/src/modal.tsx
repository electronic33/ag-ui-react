import React, { useCallback, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import ScrollLock from 'react-scrolllock';
import classNames from 'classnames';
import { useTransition, animated } from 'react-spring';
import ReactDOM from 'react-dom';
import { FocusLock } from '@app-garage/focus-trap';
import { Button } from '@app-garage/button';

const ESC_KEYCODE = 27;

type ModalProps = {
  isOpen: boolean;
  ariaProps?: Record<string, string>;
  onClose: () => void;
  children?: React.ReactNode;
  overlayClassName?: string;
  modalClassName?: string;
  initialFocusRef?: React.RefObject<HTMLButtonElement>;
};

export const Modal = ({
  initialFocusRef,
  ariaProps,
  overlayClassName,
  modalClassName,
  onClose,
  children,
  isOpen,
}: ModalProps): React.ReactElement => {
  const handleKeydown = useCallback(
    (event) => {
      if (event.keyCode === ESC_KEYCODE) {
        onClose();
      }
    },
    [onClose],
  );

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'translateY(10px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(10px)' },
  });

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  const stopPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item &&
          ReactDOM.createPortal(
            <FocusLock restoreFocus initialFocusRef={initialFocusRef}>
              <ScrollLock>
                <animated.div
                  key={key}
                  {...ariaProps}
                  className={classNames('overlay', overlayClassName)}
                  onClick={onClose}
                  style={{ opacity: props.opacity }}
                >
                  <animated.div
                    className={classNames('modal', modalClassName)}
                    onClick={stopPropagation}
                    style={{ transform: props.transform }}
                  >
                    {children}
                  </animated.div>
                  <Button
                    onClick={onClose}
                    className="fixed top-4 right-4 z-50 text-5xl text-gray-50"
                  >
                    <IoIosClose />
                  </Button>
                </animated.div>
              </ScrollLock>
            </FocusLock>,
            document.body,
          ),
      )}
    </>
  );
};
