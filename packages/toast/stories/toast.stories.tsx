import React from 'react';
import { ToastProvider, useToast } from '../src';

export default {
  title: 'FEEDBACK/Toast',
  // component: Toast,
};

const DefaultContent = () => {
  const addToast = useToast();

  return (
    <button
      type="button"
      onClick={() => {
        addToast({
          intent: 'primary',
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ',
          header: 'Header',
          position: 'top-center',
        });
      }}
    >
      Click me
    </button>
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
