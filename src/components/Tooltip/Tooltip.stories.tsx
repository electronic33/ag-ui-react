import React from "react";
import Tooltip from "./Tootlip";
import "../../styles/index.css";
import Button from "../Button/Button";

export default {
  title: "OVERLAY/Tooltip",
  component: Tooltip,
};

export const Top = (): React.ReactNode => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Tooltip content="Hello, I'm a tooltip">
      <Button text="Button with tooltip">I&apos;m a button</Button>
    </Tooltip>
  </div>
);
export const Right = (): React.ReactNode => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Tooltip content="Hello, I'm a tooltip" direction="right">
      <Button text="Button with tooltip">I&apos;m a button</Button>
    </Tooltip>
  </div>
);
export const Left = (): React.ReactNode => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Tooltip content="Hello, I'm a tooltip" direction="left">
      <Button text="Button with tooltip">I&apos;m a button</Button>
    </Tooltip>
  </div>
);
export const Bottom = (): React.ReactNode => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Tooltip content="Hello, I'm a tooltip" direction="bottom">
      <Button text="Button with tooltip">I&apos;m a button</Button>
    </Tooltip>
  </div>
);
