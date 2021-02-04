import React from "react";
import Tooltip from "./Tootlip";
import "../../styles/index.css";
import Button from "../Button/Button";

export default {
  title: "Tooltip",
};

export const Top = (): React.ReactNode => (
  <Tooltip content="Hello, I'm a tooltip" direction="top">
    <Button text="Button with tooltip">I'm a button</Button>
  </Tooltip>
);
export const Right = (): React.ReactNode => (
  <Tooltip content="Hello, I'm a tooltip" direction="right">
    <Button text="Button with tooltip">I'm a button</Button>
  </Tooltip>
);
export const Left = (): React.ReactNode => (
  <Tooltip content="Hello, I'm a tooltip" direction="left">
    <Button text="Button with tooltip">I'm a button</Button>
  </Tooltip>
);
export const Bottom = (): React.ReactNode => (
  <Tooltip content="Hello, I'm a tooltip" direction="bottom">
    <Button text="Button with tooltip">I'm a button</Button>
  </Tooltip>
);
