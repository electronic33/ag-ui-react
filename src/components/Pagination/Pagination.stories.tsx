import React, { useState } from "react";
import Pagination from "./Pagination";
import "../../styles/index.css";

export default {
  title: "Pagination",
};

export const Default = (): React.ReactNode => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  return (
    <Pagination
      maxCount={12}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};
