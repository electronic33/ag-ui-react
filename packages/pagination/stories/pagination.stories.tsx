import React, { useState } from 'react';
import { Pagination } from '../src';

export default {
  title: 'OTHERS/Pagination',
  component: Pagination,
};

export const Default = (): React.ReactNode => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  return (
    <Pagination
      maxCount={31}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};
export const WithGoToNum = (): React.ReactNode => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  return (
    <Pagination
      maxCount={31}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      initialGotoPageValue={1}
    />
  );
};
export const WithItemsPerPageSelect = (): React.ReactNode => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  return (
    <Pagination
      maxCount={31}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      selectOptions={[
        { label: '2', value: 2 },
        {
          label: '5',
          value: 5,
        },
        {
          label: '10',
          value: 10,
        },
      ]}
    />
  );
};
export const WithAll = (): React.ReactNode => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  return (
    <Pagination
      maxCount={31}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      initialGotoPageValue={1}
      selectOptions={[
        { label: '2', value: 2 },
        {
          label: '5',
          value: 5,
        },
        {
          label: '10',
          value: 10,
        },
      ]}
    />
  );
};
