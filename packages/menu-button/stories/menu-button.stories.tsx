import React from 'react';
import { Button } from '@app-garage/button';
import { MenuButton } from '../src';

export default {
  title: 'OTHERS/MenuButton',
  component: MenuButton,
};

export const Default = (): React.ReactNode => (
  <div className="w-screen h-48 flex justify-center items-center space-x-3">
    <Button className="bg-yellow-400">I&apos;m a button</Button>
    <MenuButton
      headerText="Header"
      content={
        <div className="flex space-x-3">
          <Button className="my-5 bg-gray-500">button 1</Button>
          <Button className="my-5 bg-gray-500">button 2</Button>
          <Button className="my-5 bg-gray-500">button 3</Button>
        </div>
      }
    >
      <Button className="bg-green-500">Menu</Button>
    </MenuButton>
    <Button className="bg-yellow-400">I&apos;m a button</Button>
  </div>
);
