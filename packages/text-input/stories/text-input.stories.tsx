import React, { useState } from 'react';
import { MdLabelOutline } from 'react-icons/md';
import { TextInput } from '../src/text-input';

export default {
  title: 'LERNA/TextInput',
  component: TextInput,
};

export const Default = () => {
  const [value, setValue] = useState('');

  return (
    <TextInput
      label="Textinput"
      placeholder="This is a textinput"
      withButton
      buttonText="Search"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const WithIcon = () => (
  <TextInput
    label="Textinput"
    Icon={MdLabelOutline}
    placeholder="This is a textinput"
    value=""
  />
);

export const Error = () => (
  <TextInput
    label="Textinput"
    Icon={MdLabelOutline}
    placeholder="This is a textinput"
    error="Error"
  />
);

export const ErrorInLabel = () => (
  <TextInput
    label="Textinput"
    Icon={MdLabelOutline}
    placeholder="This is a textinput"
    error="Error"
    withErrorInLabel
  />
);
