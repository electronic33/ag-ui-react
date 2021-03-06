import React from 'react';
import { ErrorMessage } from '../src';

export default {
  title: 'FEEDBACK/ErrorMessage',
  component: ErrorMessage,
};

export const Default = (props): React.ReactNode => (
  <ErrorMessage {...props}>
    <p>An error occured!</p>
  </ErrorMessage>
);
