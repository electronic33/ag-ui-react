import React from 'react';
import classNames from 'classnames';

type ThTypes = {
  children: React.ReactNode;
  className?: string;
};

export const Th = ({ children, className }: ThTypes) => (
  <th scope="col" className={classNames('table-th', className)}>
    {children}
  </th>
);
