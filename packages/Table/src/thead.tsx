import React from 'react';
import classNames from 'classnames';

type TheadTypes = {
  children: React.ReactNode;
  className?: string;
};

export const Thead = ({ children, className }: TheadTypes) => (
  <thead className={classNames('bg-gray-50', className)}>{children}</thead>
);
