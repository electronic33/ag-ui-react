import React, { useState } from "react";
import Checkbox from "./Checkbox";
import "../../styles/index.css";
import { GiCheckMark } from "react-icons/gi";

export default {
  title: "Checkbox",
};

export const Default = (): React.ReactNode => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <label>
      <Checkbox checked={checked} onChange={handleCheckboxChange}>
        {/* <GiCheckMark className="text-4xl text-red-500" /> */}
      </Checkbox>
      <span className="ml-2">Label Text</span>
    </label>
  );
};
