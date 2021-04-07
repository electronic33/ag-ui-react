import React, { useState } from 'react';
import { Button } from '@app-garage/button';
import { Popover } from '../src';

export default {
  title: 'OVERLAY/Popover',
  component: Popover,
};

export const Default = (): React.ReactNode => {
  const trigger = 'click';
  const [active, setActive] = useState(false);
  return (
    <div className="w-screen h-screen flex justify-center items-center space-x-3">
      <Button className="bg-yellow-400">I&apos;m a button</Button>
      <Popover
        active={active}
        setActive={setActive}
        headerText="Header"
        trigger={`${trigger}`}
        content={
          <div className="flex space-x-3">
            <Button className="my-5 bg-gray-500">button 1</Button>
            <Button className="my-5 bg-gray-500">button 2 </Button>
            <Button className="my-5 bg-gray-500">button 3</Button>
          </div>
        }
      >
        <Button className="bg-green-500">{trigger} </Button>
      </Popover>
      <Button className="bg-yellow-400">I&apos;m a button</Button>
    </div>
  );
};
