import React, { useState } from "react";
import Checkbox from "./Checkbox";
import "../../styles/index.css";
import { GiCheckMark } from "react-icons/gi";

export default {
  title: "FORMS/Checkbox",
  component: Checkbox,
};

export const Default = (props): React.ReactNode => {
  return (
    <label>
      <Checkbox {...props}>
        {/* <GiCheckMark className="text-4xl text-red-500" /> */}
      </Checkbox>
      <span className="ml-2">Label Text</span>
    </label>
  );
};
