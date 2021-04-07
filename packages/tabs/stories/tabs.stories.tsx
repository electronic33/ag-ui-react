import React, { useState } from 'react';
import { FaAccessibleIcon, FaAccusoft, FaChrome, FaFire } from 'react-icons/fa';
import { ButtonSpinner } from '@app-garage/button-spinner';
import { Button } from '@app-garage/button';
import { Tabs } from '../src';

export default {
  title: 'DISCLOSURE/Tabs',
  component: Tabs,
};

export const Error = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Tabs
      activeIndex={currentTab}
      setActiveIndex={setCurrentTab}
      tabs={[
        { label: 'Tab 1', Icon: FaChrome, content: Button },
        { label: 'Tab 2', Icon: FaFire, content: ButtonSpinner },
        { label: 'Tab 3', Icon: FaAccessibleIcon, content: Button },
        { label: 'Tab 4', Icon: FaAccusoft, content: ButtonSpinner },
      ]}
    />
  );
};
