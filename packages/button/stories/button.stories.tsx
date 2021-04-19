import React from 'react';
import { AiFillAudio } from 'react-icons/ai';
import { Button } from '../src';

export default {
  title: 'LERNA/Button',
  component: Button,
};

export const Default = (): React.ReactNode => (
  <Button Icon={AiFillAudio}>Button</Button>
);

export const Small = (): React.ReactNode => (
  <Button Icon={AiFillAudio} size="sm">
    Button
  </Button>
);

export const Large = (): React.ReactNode => (
  <Button Icon={AiFillAudio} size="lg">
    Button
  </Button>
);
export const ExtraLarge = (): React.ReactNode => (
  <Button Icon={AiFillAudio} size="xl">
    Button
  </Button>
);

export const Loading = (): React.ReactNode => (
  <Button Icon={AiFillAudio} isLoading>
    Button
  </Button>
);
