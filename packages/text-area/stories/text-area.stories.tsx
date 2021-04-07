import React from 'react';
import { MdLabelOutline } from 'react-icons/md';
import { TextArea } from '../src';

export default {
  title: 'FORMS/TextArea',
  component: TextArea,
};

export const Default = () => (
  <TextArea label="TextArea" placeholder="This is a textarea" value="" />
);

export const WithIcon = () => (
  <TextArea
    label="TextArea"
    Icon={MdLabelOutline}
    placeholder="This is a textarea"
    value="Such a nice textarea"
  />
);

export const Error = () => (
  <TextArea
    label="TextArea"
    Icon={MdLabelOutline}
    placeholder="This is a textarea"
    error="Error"
  />
);

export const ErrorInLabel = () => (
  <TextArea
    label="TextArea"
    Icon={MdLabelOutline}
    placeholder="This is a textarea"
    error="Error"
    withErrorInLabel
  />
);
