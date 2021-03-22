import React, { useState } from "react";
import { Switch } from "../src";

export default {
  title: "FORMS/Switch",
  component: Switch,
};

export const Default = (props): React.ReactNode => {
  const [active, setActive] = useState(false);

  return (
    <Switch
      notActiveBackGroundColorClass="bg-gray-200"
      activeBackGroundColorClass="bg-blue-400"
      notActiveDotBackgroundColorClass="bg-gray-100"
      activeDotBackgroundColorClass="bg-blue-600"
      active={active}
      setActive={setActive}
      {...props}
    />
  );
};
