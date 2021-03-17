import React, { useRef } from "react";
import classNames from "classnames";
import { useId } from "react-id-generator";

import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import Modal from "../Modal/Modal";
import { animated, config, useTransition } from "react-spring";
import { MdClose } from "react-icons/md";

export interface AlertDialogTypes {
  headerText?: string;
  message?: string;
  children?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  loading: boolean;
  onClose?: () => void;
  isOpen?: () => () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  loadingSvgStroke?: string;
  loadingSvgFill?: string;
  modalClassName?: string;
  cancelButtonClassName?: string;
  confirmButtonClassName?: string;
}

const AlertDialog = ({
  headerText,
  message,
  children,
  cancelText = "Cancel",
  confirmText = "Confirm",
  loading = false,
  onClose,
  isOpen,
  onCancel,
  onConfirm,
  loadingSvgStroke = "rgba(255, 255, 255, 1)",
  loadingSvgFill = "rgba(59, 130, 246, 1)",
  modalClassName,
  cancelButtonClassName,
  confirmButtonClassName,
}: AlertDialogTypes): React.ReactElement => {
  const id = useId();
  const cancelRef = useRef();

  if (loading)
    return (
      <Modal
        containerClassName={classNames(
          `${!modalClassName ? "bg-black bg-opacity-50" : null}`,
          modalClassName,
        )}
      >
        <Spinner
          stroke={`${loadingSvgStroke}`}
          fill={`${loadingSvgFill}`}
        ></Spinner>
      </Modal>
    );

  const transition = useTransition(isOpen, null, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    config: config.stiff,
  });

  return (
    <>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={`alert-dialog-header-${id}`}
              aria-describedby={`alert-dialog-body-${id}`}
            >
              <Modal
                initialFocusRef={cancelRef}
                ariaProps={{ role: "alertdialog", "aria-modal": "true" }}
                onClose={onClose}
                containerClassName={classNames(
                  `${!modalClassName ? "bg-black bg-opacity-50" : null}`,
                  modalClassName,
                )}
              >
                <div className="bg-white px-7 py-5 shadow-xl max-w-lg rounded-lg relative">
                  <button
                    onClick={onClose}
                    className="absolute flex-shrink-0 top-1 right-2 text-lg text-gray-400 z-10"
                    aria-label="close"
                  >
                    <MdClose className="flex-shrink-0" />
                  </button>
                  {headerText && (
                    <header
                      id={`alert-dialog-header-${id}`}
                      className="font-bold text-xl mb-5"
                    >
                      {headerText}
                    </header>
                  )}
                  <div id={`alert-dialog-body-${id}`}>
                    {message && (
                      <p className="text-lg text-gray-700">{message}</p>
                    )}
                    <div>{children && children}</div>
                    <div className="flex justify-end mt-5">
                      <Button
                        ref={cancelRef}
                        onClick={onCancel}
                        className={classNames(
                          "mr-5 bg-blue-50 text-gray-600 font-bold text-lg rounded-lg",
                          cancelButtonClassName,
                        )}
                      >
                        {cancelText}
                      </Button>
                      <Button
                        onClick={onConfirm}
                        className={classNames(
                          "font-bold text-lg bg-red-500 rounded-lg",
                          confirmButtonClassName,
                        )}
                      >
                        {confirmText}
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal>
            </animated.div>
          ),
      )}
    </>
  );
};

export default AlertDialog;

// outline-none focus:ring-4 focus:ring-blue-300 transition-all transform
