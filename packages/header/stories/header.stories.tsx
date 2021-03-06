import React, { useState } from 'react';
import { MdLabelOutline } from 'react-icons/md';
import { TextInput } from '@app-garage/text-input';

export default {
  title: 'LERNA/TextInput',
  component: TextInput,
};

export const Default = (): React.ReactNode => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <TextInput
      label="Textinput"
      placeholder="This is a textinput"
      value={value}
      onChange={(event) => handleChange(event)}
    />
  );
};

export const WithIcon = (): React.ReactNode => (
  <TextInput label="Textinput" Icon={MdLabelOutline} placeholder="This is a textinput" value="" />
);

export const Error = (): React.ReactNode => (
  <TextInput
    label="Textinput"
    Icon={MdLabelOutline}
    placeholder="This is a textinput"
    error="Error"
  />
);

export const ErrorInLabel = (): React.ReactNode => (
  <TextInput
    label="Textinput"
    Icon={MdLabelOutline}
    placeholder="This is a textinput"
    error="Error"
    withErrorInLabel
  />
);
