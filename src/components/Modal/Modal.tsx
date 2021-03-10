import React, { useCallback, useLayoutEffect } from "react";
import { IoIosClose } from "react-icons/io";
import ScrollLock from "react-scrolllock";
import classNames from "classnames";

const ESC_KEYCODE = 27;

const Modal = ({
  containerClassName,
  className,
  onClose,
  children,
}: {
  onClose?: () => void;
  children?: React.ReactNode;
  containerClassName?: string;
  className?: string;
}): React.ReactElement => {
  const handleKeydown = useCallback((event) => {
    if (event.keyCode === ESC_KEYCODE) {
      onClose();
    }
  }, []);

  useLayoutEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const stopPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <ScrollLock>
      <div
        className={classNames("modal", containerClassName)}
        onClick={onClose}
      >
        <div
          className={classNames(
            "rounded-md flex items-center justify-center max-h-almost-screen w-full",
            className,
          )}
          onClick={stopPropagation}
        >
          {children}
        </div>
        <button
          onClick={onClose}
          className="flex fixed top-4 right-4 z-50 text-5xl text-gray-50 cursor-pointer"
        >
          <IoIosClose />
        </button>
      </div>
    </ScrollLock>
  );
};

export default Modal;
