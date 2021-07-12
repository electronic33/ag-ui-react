import React from 'react';
import classNames from 'classnames';

type TableTypes = {
  children: React.ReactNode;
  containerClassName?: string;
  tableClassName?: string;
};

export const Table = ({ children, containerClassName, tableClassName }: TableTypes) => (
  <div
    className={classNames(
      'shadow overflow-hidden overflow-x-auto border-b border-gray-200 rounded-md',
      containerClassName,
    )}
  >
    <table className={classNames('min-w-full divide-y rounded-md divide-gray-200', tableClassName)}>
      {children}
    </table>
  </div>
);
