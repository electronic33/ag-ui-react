import React from 'react';
import classNames from 'classnames';

type TbodyTypes = {
  children: React.ReactNode;
  className?: string;
};

export const Tbody = ({ children, className }: TbodyTypes) => (
  <tbody className={classNames('bg-white divide-y divide-gray-200', className)}>{children}</tbody>
);
