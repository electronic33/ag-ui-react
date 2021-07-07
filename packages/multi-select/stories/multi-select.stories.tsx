import React, { useState } from 'react';
import { FaChrome } from 'react-icons/fa';
import { MultiSelect } from '../src';

export default {
  title: 'FORMS/MultiSelect',
  component: MultiSelect,
};

export const Default = () => {
  const [value, setValue] = useState<number[]>([]);

  return (
    <>
      <MultiSelect
        containerClassName="max-w-lg mb-5 my-2 mr-2"
        onChange={(val) => setValue(val)}
        value={value}
        label="MultiSelect"
        placeholder="Choose..."
        withFilter
        options={[
          { label: 'Option 1', value: 1, Icon: <FaChrome /> },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 },
          { label: 'Option 4', value: 4 },
          { label: 'Option 5', value: 5 },
          { label: 'Option 6', value: 6 },
          { label: 'Option 7', value: 7 },
          { label: 'Option 8', value: 8 },
        ]}
      />
      <h1>asd</h1>
    </>
  );
};
