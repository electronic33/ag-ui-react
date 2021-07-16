import React from 'react';
import classNames from 'classnames';

type TdTypes = {
  children: React.ReactNode;
  className?: string;
};

export const Td = ({ children, className }: TdTypes) => (
  <td className={classNames('table-td', className)}>{children}</td>
);
