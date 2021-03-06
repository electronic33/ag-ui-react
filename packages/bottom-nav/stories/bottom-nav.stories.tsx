import React from 'react';
import { Link } from '@app-garage/link';
import { IoIosAdd, IoMdAlarm } from 'react-icons/io';
import { MdChildFriendly } from 'react-icons/md';
import { BottomNav } from '../src';

export default {
  title: 'OTHERS/BottomNav',
  component: BottomNav,
};

export const Default = (): React.ReactNode => (
  <div className="h-16 w-96">
    <BottomNav
      LinkComponent={Link}
      activeClassName="text-blue-500 font-semibold"
      activeIndex={0}
      items={[
        { Icon: MdChildFriendly, label: 'Child', to: 'href' },
        { Icon: IoIosAdd, label: 'Add', to: 'href' },
        { Icon: IoMdAlarm, label: 'Alarm', to: 'href' },
      ]}
    />
  </div>
);
