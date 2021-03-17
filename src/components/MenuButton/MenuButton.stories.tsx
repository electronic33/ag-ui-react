import React, { useRef } from "react";
import MenuButton from "./MenuButton";
import "../../styles/index.css";
import Button from "../Button/Button";

export default {
  title: "MenuButton",
  component: MenuButton,
};

export const Default = (props): React.ReactNode => {
  return (
    <div className="w-screen h-48 flex justify-center items-center space-x-3">
      <Button className="bg-yellow-400" text="Button with tooltip">
        I&apos;m a button
      </Button>
      <MenuButton
        headerText="Header"
        content={
          <div className="flex space-x-3">
            <Button text="button 1" className="my-5 bg-gray-500" />
            <Button text="button 2" className="my-5 bg-gray-500" />
            <Button text="button 3" className="my-5 bg-gray-500" />
          </div>
        }
      >
        <Button className="bg-green-500" text="Button with tooltip">
          Menu
        </Button>
      </MenuButton>
      <Button className="bg-yellow-400" text="Button with tooltip">
        I&apos;m a button
      </Button>
    </div>
  );
};
