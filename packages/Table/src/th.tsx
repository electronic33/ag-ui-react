import React from 'react';
import classNames from 'classnames';

type ThTypes = {
  children: React.ReactNode;
  className?: string;
};

export const Th = ({ children, className }: ThTypes) => (
  <th
    scope="col"
    className={classNames(
      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
      className,
    )}
  >
    {children}
  </th>
);
