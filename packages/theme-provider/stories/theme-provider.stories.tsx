import React from 'react';
import { ThemeProvider } from '../src';

export default {
  title: 'OVERLAY/ThemeProvider',
  component: ThemeProvider,
};

export const Default = () => (
  <ThemeProvider>
    <div className="w-screen h-screen flex justify-center items-center" />
  </ThemeProvider>
);
