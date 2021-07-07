import React, { useState } from 'react';
import { MdLabelOutline } from 'react-icons/md';
import { NumericInput } from '../src';

export default {
  title: 'LERNA/NumericInput',
  component: NumericInput,
};

export const Default = () => {
  const [value, setValue] = useState('');

  return (
    <NumericInput
      containerClassName="w-56"
      label="NumericInput"
      placeholder="This is a NumericInput"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const WithIcon = () => (
  <NumericInput
    label="NumericInput"
    Icon={MdLabelOutline}
    placeholder="This is a NumericInput"
    value=""
  />
);

export const Error = () => (
  <NumericInput
    label="NumericInput"
    Icon={MdLabelOutline}
    placeholder="This is a NumericInput"
    error="Error"
  />
);

export const ErrorInLabel = () => (
  <NumericInput
    label="NumericInput"
    Icon={MdLabelOutline}
    placeholder="This is a NumericInput"
    error="Error"
    withErrorInLabel
  />
);
