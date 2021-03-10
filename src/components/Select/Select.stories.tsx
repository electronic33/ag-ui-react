import React from "react";
import Select from "./Select";
import "../../styles/index.css";

export default {
  title: "Select",
  component: Select,
};

export const Default = (props): React.ReactNode => (
  <Select
    className="max-w-sm w-64 mb-5 my-2 mr-2"
    // onChange={}
    selected={null}
    label="Select"
    options={[
      { label: "All", value: null },
      { label: "Option 1", value: null },
      { label: "Option 2", value: null },
      { label: "Option 3", value: null },
    ]}
    {...props}
  />
);
