import React, { useState } from "react";
import Switch from "./Switch";
import "../../styles/index.css";

export default {
  title: "Switch",
};

export const Default = (): React.ReactNode => {
  const [value, setValue] = useState(false);

  return (
    <Switch
      notActiveBackGroundColorClass="bg-gray-200"
      activeBackGroundColorClass="bg-blue-400"
      notActiveDotBackgroundColorClass="bg-gray-100"
      activeDotBackgroundColorClass="bg-blue-600"
      value={value}
      setValue={setValue}
    />
  );
};
