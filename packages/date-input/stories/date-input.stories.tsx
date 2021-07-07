import React, { useState } from 'react';
// import { MdLabelOutline } from 'react-icons/md';
import { DateInput } from '../src/date-input';

export default {
  title: 'LERNA/DateInput',
  component: DateInput,
};

export const Default = () => {
  const [value, setValue] = useState<string | Date>('');

  return (
    <DateInput
      label="DateInput"
      placeholder="This is a date input"
      value={value}
      onChange={(val) => setValue(val)}
    />
  );
};
