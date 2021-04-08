import React, { useState } from 'react';
import { MdAccessAlarm } from 'react-icons/md';
import { SelectableList } from '../src';

export default {
  title: 'FORMS/SelectableList',
  component: SelectableList,
};

export const Default = () => {
  const [value, setValue] = useState<number | string>();

  return (
    <div>
      <SelectableList
        onSelect={setValue}
        selectValue={value}
        title="Select one"
        items={[
          {
            value: 'Doar zi',
            label: 'Doar zi',
            Icon: MdAccessAlarm,
          },
          {
            value: 'Doar noapte',
            label: 'Doar noapte',
            Icon: MdAccessAlarm,
          },
          {
            value: 'Doar noapte',
            label: 'Doar noapte',
            Icon: MdAccessAlarm,
          },
          {
            value: 'All day',
            label: 'All day',
            Icon: MdAccessAlarm,
          },
          {
            value: 'Doar zi',
            label: 'Doar zi',
            Icon: MdAccessAlarm,
          },
          {
            value: 'Doar noapte',
            label: 'Doar noapte',
            Icon: MdAccessAlarm,
          },
          {
            value: 'Doar noapte',
            label: 'Doar noapte',
            Icon: MdAccessAlarm,
          },
          {
            value: 'All day',
            label: 'All day',
            Icon: MdAccessAlarm,
          },
        ]}
        containerClassName=""
        itemClassName=""
      />
      <p>Value: {value}</p>
    </div>
  );
};
