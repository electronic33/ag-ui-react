import React, { useState } from 'react';
import { RadioGroup } from '../src';

export default {
  title: 'FORMS/RadioGroup',
  component: RadioGroup,
};

export const Default = (): React.ReactNode => {
  const [value, setValue] = useState<number | string>(0);

  return (
    <div className="flex justify-center items-center">
      <RadioGroup
        groupValue={value}
        onChange={setValue}
        items={[
          {
            value: 1,
            label: 'radio 1',
            checkedBgClassName: 'bg-red-400',
            size: 'sm',
          },
          {
            value: 2,
            label: 'radio 2',
            checkedBgClassName: 'bg-green-400',
          },
          {
            value: 3,
            label: 'radio 3',
            checkedBgClassName: 'bg-blue-400',
            size: 'lg',
          },
          {
            value: 4,
            label: 'radio 4',
            checkedBgClassName: 'bg-yellow-400',
            size: 'xl',
          },
        ]}
      />
    </div>
  );
};
