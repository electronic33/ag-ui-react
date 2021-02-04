import React, { useCallback, useLayoutEffect } from "react";
import { IoIosClose } from "react-icons/io";
import ScrollLock from "react-scrolllock";

const ESC_KEYCODE = 27;

const Modal = ({ onClose, children }) => {
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
      <div className="modal" onClick={onClose}>
        <div
          className="rounded-md flex items-center justify-center max-h-almost-screen w-full"
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
