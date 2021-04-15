import React from 'react';
import classNames from 'classnames';

type TdTypes = {
  children: React.ReactNode;
  className?: string;
};

export const Td = ({ children, className }: TdTypes) => (
  <td className={classNames('px-6 py-4 whitespace-nowrap"', className)}>
    {children}
  </td>
);
