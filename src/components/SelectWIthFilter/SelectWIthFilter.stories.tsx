import React, { useState } from "react";
import SelectWIthFilter from "./SelectWIthFilter";
import "../../styles/index.css";

export default {
  title: "SelectWIthFilter",
  component: SelectWIthFilter,
};

export const Default = (): React.ReactNode => {
  return (
    <SelectWIthFilter
      className="max-w-sm w-64 mb-5 my-2 mr-2"
      label="SelectWIthFilter"
      options={[
        { label: "Afghanistan", value: 1 },
        { label: "Albania", value: 2 },
        { label: "Algeria", value: 3 },
        { label: "American Samoa", value: 4 },
        { label: "Andorra", value: 5 },
        { label: "Angola", value: 6 },
        { label: "Anguilla", value: 7 },
        { label: "Antarctica", value: 8 },
        { label: "Argentina", value: 9 },
        { label: "Australia", value: 10 },
        { label: "Austria", value: 11 },
        { label: "Azerbaijan", value: 12 },
      ]}
    />
  );
};
