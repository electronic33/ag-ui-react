import React, { useState } from "react";
import { FaAccessibleIcon, FaAccusoft, FaChrome, FaFire } from "react-icons/fa";
import { Tabs } from "../src";
import { ButtonSpinner } from "@app-garage/button-spinner";
import { Button } from "@app-garage/button";

export default {
  title: "DISCLOSURE/Tabs",
  component: Tabs,
};

export const Error = (props): React.ReactNode => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Tabs
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      tabs={[
        { title: "Tab 1", Icon: FaChrome, content: Button },
        { title: "Tab 2", Icon: FaFire, content: ButtonSpinner },
        { title: "Tab 3", Icon: FaAccessibleIcon, content: Button },
        { title: "Tab 4", Icon: FaAccusoft, content: ButtonSpinner },
      ]}
      {...props}
    />
  );
};
