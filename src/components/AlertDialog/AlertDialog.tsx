import React, { useRef } from "react";
import classNames from "classnames";
import { useId } from "react-id-generator";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";

export interface AlertDialogProps {
  isOpen: boolean;
  headerText?: string;
  message?: string;
  children?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  isLoading?: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  modalClassName?: string;
  cancelButtonClassName?: string;
  confirmButtonClassName?: string;
}

const AlertDialog = ({
  isOpen,
  headerText,
  message,
  children,
  cancelText = "Cancel",
  confirmText = "Confirm",
  isLoading,
  onClose,
  onCancel,
  onConfirm,
  modalClassName,
  cancelButtonClassName,
  confirmButtonClassName,
}: AlertDialogProps): React.ReactElement => {
  const id = useId();
  const cancelRef = useRef();

  return (
    <Modal
      isOpen={isOpen}
      initialFocusRef={cancelRef}
      ariaProps={{ role: "alertdialog", "aria-modal": "true" }}
      onClose={onClose}
      modalClassName={classNames(
        "bg-white px-7 py-5 shadow-xl max-w-lg rounded-lg",
        modalClassName,
      )}
    >
      {headerText && (
        <header
          id={`alert-dialog-header-${id}`}
          className="font-bold text-xl mb-5"
        >
          {headerText}
        </header>
      )}
      <div id={`alert-dialog-body-${id}`}>
        {message && <p className="text-lg text-gray-700">{message}</p>}
        {children}
        <div className="flex justify-end mt-5">
          <Button
            ref={cancelRef}
            isDisabled={isLoading}
            onClick={onCancel || onClose}
            className={classNames(
              "mr-5 bg-blue-50 text-gray-600 font-bold text-lg rounded-lg",
              cancelButtonClassName,
            )}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            isLoading={isLoading}
            className={classNames(
              "font-bold text-lg bg-red-500 rounded-lg",
              confirmButtonClassName,
            )}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertDialog;
