/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Button } from '@app-garage/button';
import {
  Md3DRotation,
  MdAccessAlarm,
  MdSearch,
  MdZoomOutMap,
} from 'react-icons/md';
import { Menu } from '../src/menu';

export default {
  title: 'OVERLAY/MenuItem',
  component: Menu,
};

export const Default = (): React.ReactNode => {
  const trigger = 'click';
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className=" flex justify-center items-center space-x-3">
      <Button className="bg-yellow-400">I&apos;m a button</Button>
      <Menu
        active={active}
        setActive={setActive}
        trigger="click"
        contentClassNames=""
        containterFocus={false}
        content={[
          {
            type: 'item',
            label: 'Item',
            onClick: () => alert('Item'),
            Icon: MdSearch,
          },
          {
            type: 'item',
            label: 'Item2',
            onClick: () => alert('Item2'),
          },
          {
            type: 'divider',
          },
          {
            type: 'group',
            label: 'Group 1',
            items: [
              { label: 'Op', onClick: () => alert('1'), Icon: MdAccessAlarm },
              { label: 'Op1', onClick: () => alert('11'), Icon: MdZoomOutMap },
              { label: 'Op2', onClick: () => alert('111'), Icon: Md3DRotation },
            ],
          },
          {
            type: 'divider',
          },
          {
            type: 'group',
            label: 'Group 2',
            items: [
              { label: 'Ha', onClick: () => alert('2') },
              { label: 'Hdsa', onClick: () => alert('22') },
              { label: 'dfasd', onClick: () => alert('222') },
            ],
          },
        ]}
      >
        <Button className="bg-green-500">{trigger} me</Button>
      </Menu>
      <Button className="bg-yellow-400">I&apos;m a button</Button>
    </div>
  );
};
