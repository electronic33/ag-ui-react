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
      modalClassName={classNames("alert-dialog-modal ", modalClassName)}
    >
      {headerText && (
        <header
          id={`alert-dialog-header-${id}`}
          className="alert-dialog-header"
        >
          {headerText}
        </header>
      )}
      <div id={`alert-dialog-body-${id}`}>
        {message && <p className="alert-dialog-body">{message}</p>}
        {children}
        <div className="alert-dialog-buttons-container">
          <Button
            ref={cancelRef}
            isDisabled={isLoading}
            onClick={onCancel || onClose}
            className={classNames(
              "alert-dialog-cancel-button",
              cancelButtonClassName,
            )}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            isLoading={isLoading}
            className={classNames(
              "alert-dialog-confirm-button",
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
