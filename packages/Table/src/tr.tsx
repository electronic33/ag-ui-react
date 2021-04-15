import React from 'react';
import classNames from 'classnames';

type TrTypes = {
  children: React.ReactNode;
  className?: string;
};

export const Tr = ({ children, className }: TrTypes) => (
  <tr className={classNames('', className)}>{children}</tr>
);
