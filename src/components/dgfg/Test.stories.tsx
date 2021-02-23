import React from "react";
import Test from "./Test";
import "../../styles/index.css";

export default {
  title: "Test",
};

export const Default = (): React.ReactNode => (
  <Test
    menuItems={[
      { text: "Item One", href: "/page" },
      { text: "Item Two", href: "/page" },
      { text: "Item Three", href: "/page" },
      { text: "Item Four", href: "/page" },
      { text: "Item Five", href: "/page", disabled: true },
    ]}
  />
);
