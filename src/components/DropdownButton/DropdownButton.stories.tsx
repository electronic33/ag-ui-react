import React from "react";
import DropdownButton from "./DropdownButton";
import "../../styles/index.css";

export default {
  title: "DropdownButton",
  component: DropdownButton,
};

export const Default = (): React.ReactNode => (
  <DropdownButton
    menuItems={[
      { text: "Item One", href: "/page" },
      { text: "Item Two", href: "/page" },
      { text: "Item Three", href: "/page" },
      { text: "Item Four", href: "/page" },
      { text: "Item Five", href: "/page", disabled: true },
      { text: "Item One", href: "/page" },
      { text: "Item Two", href: "/page" },
      { text: "Item Three", href: "/page" },
      { text: "Item Four", href: "/page" },
      { text: "Item Five", href: "/page", disabled: true },
    ]}
  />
);