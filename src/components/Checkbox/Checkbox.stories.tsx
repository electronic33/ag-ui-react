import React, { useState } from "react";
import Checkbox from "./Checkbox";

import "../../styles/index.css";

export default {
  title: "FORMS/Checkbox",
  component: Checkbox,
};

export const Default = (): React.ReactNode => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="w-48 space-y-8">
      <Checkbox
        isChecked={checked}
        onChange={setChecked}
        label="Label for checkbox"
        labelPosition="top"
      />
      <Checkbox
        isChecked={checked}
        onChange={setChecked}
        label="Label for checkbox"
        labelPosition="right"
      />
      <Checkbox
        isChecked={checked}
        onChange={setChecked}
        label="Label for checkbox"
        labelPosition="bottom"
      />
      <Checkbox
        isChecked={checked}
        onChange={setChecked}
        label="Label for checkbox"
        labelPosition="left"
      />
    </div>
  );
};
