import React, { useState } from 'react';
import { FaChrome } from 'react-icons/fa';
import { MultiSelect } from '../src';

export default {
  title: 'FORMS/MultiSelect',
  component: MultiSelect,
};

export const Default = (): React.ReactNode => {
  const [value, setValue] = useState<number[] | string[]>([0]);
  return (
    <MultiSelect
      containerClassName="max-w-lg mb-5 my-2 mr-2"
      onChange={setValue}
      selected={value}
      label="MultiSelect"
      withFilter
      options={[
        { label: 'None', value: 0, Icon: <FaChrome /> },
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
        { label: 'Option 4', value: 4 },
        { label: 'Option 5', value: 5 },
        { label: 'Option 6', value: 6 },
        { label: 'Option 7', value: 7 },
        { label: 'Option 8', value: 8 },
      ]}
    />
  );
};
