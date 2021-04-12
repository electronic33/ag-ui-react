import React, { useState } from 'react';
import { AsyncSelect, useFetch } from '../src';

export default {
  title: 'OTHERS/AsyncSelect',
  component: AsyncSelect,
};

export const Top = (): React.ReactNode => {
  const [selected, setSelected] = useState();

  return (
    <div className="w-96">
      <AsyncSelect
        fetchHook={useFetch}
        value={selected}
        // @ts-ignore
        onChange={setSelected}
        labelKey="email"
        valueKey="cell"
      />
    </div>
  );
};
