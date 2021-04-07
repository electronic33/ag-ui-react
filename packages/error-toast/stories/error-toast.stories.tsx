import React from 'react';
import { ErrorToast } from '../src';

export default {
  title: 'FEEDBACK/ErrorToast',
  component: ErrorToast,
};

export const Default = (props): React.ReactNode => (
  <ErrorToast message="Error toast!" {...props} />
);
