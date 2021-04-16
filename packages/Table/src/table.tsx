import React from 'react';
import classNames from 'classnames';

type TableTypes = {
  children: React.ReactNode;
  containerClassName?: string;
  tableClassName?: string;
};

export const Table = ({
  children,
  containerClassName,
  tableClassName,
}: TableTypes) => (
  <div
    className={classNames(
      'shadow overflow-hidden border-b border-gray-200 sm:rounded-lg',
      containerClassName,
    )}
  >
    <table
      className={classNames(
        'min-w-full divide-y divide-gray-200',
        tableClassName,
      )}
    >
      {children}
    </table>
  </div>
);
