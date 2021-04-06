import React, { useState } from 'react';
import { ToggleButtonGroup } from '../src';

export default {
  title: 'FORMS/ToggleButtonGroup',
  component: ToggleButtonGroup,
};

export const Default = (): React.ReactNode => {
  const [value, setValue] = useState<number | string | (number | string)[]>();

  return (
    <div className="flex justify-center items-center">
      <ToggleButtonGroup
        containerClassName="flex space-x-2"
        selected={value}
        onChange={setValue}
        items={[
          {
            value: 1,
            label: 'radio 1',
          },
          {
            value: 2,
            label: 'radio 2',
          },
          {
            value: 3,
            label: 'radio 3',
          },
          {
            value: 4,
            label: 'radio 4',
          },
        ]}
      />
    </div>
  );
};
