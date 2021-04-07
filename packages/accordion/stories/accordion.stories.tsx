/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';
import { FaChevronDown, FaChrome } from 'react-icons/fa';
import { Accordion } from '../src';

export default {
  title: 'DISCLOSURE/Accordion',
  component: Accordion,
};

export const Default = (): React.ReactNode => (
  <Accordion
    Icon={FaChrome}
    ArrowIcon={FaChevronDown}
    containerClassName="shadow-lg"
    buttonClassName="bg-gray-50 hover:bg-gray-100"
    contentClassName="text-center text-lg font-semibold bg-gray-50"
    content="Hello!"
  >
    {(isOpen) => (isOpen ? 'Close me!' : 'Open me!')}
  </Accordion>
);

export const Controlled = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (arg: boolean) => {
    setIsOpen(arg);
  };

  return (
    <Accordion
      Icon={FaChrome}
      ArrowIcon={FaChevronDown}
      onChange={handleChange}
      isControlled
      isOpen={isOpen}
      containerClassName="shadow-lg"
      buttonClassName="bg-gray-50 hover:bg-gray-100"
      contentClassName="text-center text-lg font-semibold bg-gray-50"
      content="Hello!"
    >
      {isOpen ? 'Close me!' : 'Open me!'}
    </Accordion>
  );
};
