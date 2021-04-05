import React, { useState } from 'react';
import { Select } from '../src';

export default {
  title: 'FORMS/CustomSelect',
  component: Select,
};

export const Default = () => {
  const [value, setValue] = useState(0);

  return (
    <Select
      containerClassName="max-w-sm w-64 mb-5 my-2 mr-2"
      value={value}
      onChange={(val) => setValue(val)}
      label="Select"
      options={[
        { label: 'All', value: 0 },
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ]}
    />
  );
};
