import React, { useRef } from 'react';
import { ToastProvider, useToast } from '../src';

export default {
  title: 'FEEDBACK/Toast',
  // component: Toast,
};

const DefaultContent = () => {
  const lastToastId = useRef('');

  const { showToast, closeToast, closeAllToasts } = useToast();

  const closeLastToast = () => {
    closeToast(lastToastId.current);
  };

  const closeAll = () => {
    closeAllToasts();
  };

  return (
    <div className="space-x-3">
      <button type="button" onClick={closeAll}>
        close all toasts
      </button>
      <button type="button" onClick={closeLastToast}>
        delete last toast
      </button>
      <button
        type="button"
        onClick={() => {
          lastToastId.current = showToast({
            intent: 'primary',
            text:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ',
            header: 'Header',
            position: 'top-left',
            timeout: 3000,
          });
        }}
      >
        top-left
      </button>

      <button
        type="button"
        onClick={() => {
          lastToastId.current = showToast({
            intent: 'primary',
            text:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ',
            header: 'Header',
            position: 'top-center',
            timeout: 3000,
          });
        }}
      >
        top-center
      </button>
      <button
        type="button"
        onClick={() => {
          lastToastId.current = showToast({
            intent: 'primary',
            text:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ',
            header: 'Header',
            position: 'top-right',
            timeout: 3000,
          });
        }}
      >
        top-right
      </button>
      <button
        type="button"
        onClick={() => {
          lastToastId.current = showToast({
            intent: 'primary',
            text:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ',
            header: 'Header',
            position: 'bottom-left',
            timeout: 3000,
          });
        }}
      >
        bottom-left
      </button>
      <button
        type="button"
        onClick={() => {
          lastToastId.current = showToast({
            intent: 'primary',
            text:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ',
            header: 'Header',
            position: 'bottom-center',
            timeout: 3000,
          });
        }}
      >
        bottom-center
      </button>
      <button
        type="button"
        onClick={() => {
          lastToastId.current = showToast({
            intent: 'primary',
            text:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ',
            header: 'Header',
            position: 'bottom-right',
            timeout: 3000,
          });
        }}
      >
        bottom-right
      </button>
    </div>
  );
};

export const Default = () => (
  <ToastProvider>
    <div className="h-screen bg-red-100" />
    <div className="flex justify-center items-center">
      <DefaultContent />
    </div>
    <div className="h-screen bg-yellow-100" />
    <div className="h-screen bg-blue-100" />
  </ToastProvider>
);
