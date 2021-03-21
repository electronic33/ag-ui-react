import React, { useRef } from "react";
import Popover from "./Popover";
import "../../styles/index.css";
import Button from "../Button/Button";

export default {
  title: "OVERLAY/Popover",
  component: Popover,
};

export const Default = (props): React.ReactNode => {
  const trigger = "click";
  return (
    <div className="w-screen h-screen flex justify-center items-center space-x-3">
      <Button className="bg-yellow-400" text="Button with tooltip">
        I&apos;m a button
      </Button>
      <Popover
        headerText="Header"
        trigger={`${trigger}`}
        content={
          <div className="flex space-x-3">
            <Button text="button 1" className="my-5 bg-gray-500" />
            <Button text="button 2" className="my-5 bg-gray-500" />
            <Button text="button 3" className="my-5 bg-gray-500" />
          </div>
        }
      >
        <Button className="bg-green-500" text="Button with tooltip">
          {trigger} me
        </Button>
      </Popover>
      <Button className="bg-yellow-400" text="Button with tooltip">
        I&apos;m a button
      </Button>
    </div>
  );
};
