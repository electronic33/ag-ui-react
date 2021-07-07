import React, { useState } from 'react';
import { Select } from '../src';

export default {
  title: 'FORMS/CustomSelect',
  component: Select,
};

export const Default = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <Select
        containerClassName="max-w-sm w-64 mb-5 my-2 mr-2"
        value={value}
        onChange={(val) => setValue(val)}
        label="Select"
        placeholder="Choose..."
        options={[
          // { label: 'All', value: 0 },
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 },
          { label: 'Option 4', value: 4 },
          { label: 'Option 5', value: 5 },
          { label: 'Option 6', value: 6 },
          { label: 'Option 7', value: 7 },
          { label: 'Option 8', value: 8 },
          { label: 'Option 9', value: 9 },
        ]}
      />
      <h1>asd</h1>
    </>
  );
};
