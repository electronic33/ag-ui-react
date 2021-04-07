import React from 'react';
import { Button } from '@app-garage/button';
import { Tooltip } from '../src';

export default {
  title: 'OVERLAY/Tooltip',
  component: Tooltip,
};

export const Top = () => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Tooltip content="Hello, I'm a tooltip">
      <Button>I&apos;m a button</Button>
    </Tooltip>
  </div>
);
export const Right = () => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Tooltip content="Hello, I'm a tooltip" direction="right">
      <Button>I&apos;m a button</Button>
    </Tooltip>
  </div>
);
export const Left = () => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Tooltip content="Hello, I'm a tooltip" direction="left">
      <Button>I&apos;m a button</Button>
    </Tooltip>
  </div>
);
export const Bottom = () => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Tooltip content="Hello, I'm a tooltip" direction="bottom">
      <Button>I&apos;m a button</Button>
    </Tooltip>
  </div>
);
