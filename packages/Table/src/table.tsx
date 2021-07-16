import React from 'react';
import classNames from 'classnames';

type TableTypes = {
  children: React.ReactNode;
  containerClassName?: string;
  tableClassName?: string;
};

export const Table = ({ children, containerClassName, tableClassName }: TableTypes) => (
  <div className={classNames('table-container', containerClassName)}>
    <table className={classNames('table', tableClassName)}>{children}</table>
  </div>
);
