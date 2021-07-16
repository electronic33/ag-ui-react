import React, { useCallback, useEffect } from 'react';
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
                  className={classNames('modal-overlay', overlayClassName)}
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
                  <Button onClick={onClose} className="modal-button">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z" />
                    </svg>
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
