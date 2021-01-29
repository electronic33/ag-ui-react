import React, { useState } from "react";
import Tabs from "./Tabs";
import "../../styles/index.css";
import { FaAccessibleIcon, FaAccusoft, FaChrome, FaFire } from "react-icons/fa";
import TextArea from "../TextArea/TextArea";
import Footer from "../Footer/Footer";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import Button from "../Button/Button";

export default {
  title: "Tabs",
};

export const Error = (): React.ReactNode => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Tabs
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      tabs={[
        { title: "Tab 1", Icon: FaChrome, content: TextArea },
        { title: "Tab 2", Icon: FaFire, content: Footer },
        { title: "Tab 3", Icon: FaAccessibleIcon, content: Button },
        { title: "Tab 4", Icon: FaAccusoft, content: ButtonSpinner },
      ]}
    />
  );
};
