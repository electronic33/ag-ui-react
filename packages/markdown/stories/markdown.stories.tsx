import React, { useState } from 'react';
import { Markdown } from '../src';

export default {
  title: 'OTHERS/Markdown',
  component: Markdown,
};

export const Default = (props): React.ReactNode => {
  const [value, setValue] = useState('');
  return (
    <Markdown
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
};
