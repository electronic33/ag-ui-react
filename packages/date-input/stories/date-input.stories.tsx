import React, { useState } from 'react';
// import { MdLabelOutline } from 'react-icons/md';
import { DateInput } from '../src/date-input';

export default {
  title: 'LERNA/DateInput',
  component: DateInput,
};

export const Default = (): React.ReactNode => {
  const [value, setValue] = useState<string | Date>('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <DateInput
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      label="DateInput"
      placeholder="This is a date input"
      value={value}
      setValue={setValue}
      onChange={(event) => handleChange(event)}
    />
  );
};
