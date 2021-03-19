/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from "react";
import Accordion from "./Accordion";
import "../../styles/index.css";
import { FaChevronDown, FaChrome } from "react-icons/fa";

export default {
  title: "DISCLOSURE/Accordion",
  component: Accordion,
  argTypes: { onChange: { action: "changed" } },
};

export const Default = ({ onChange }): React.ReactNode => {
  const handleChange = (arg: boolean) => {
    onChange(arg);
  };

  return (
    <Accordion
      Icon={FaChrome}
      ArrowIcon={FaChevronDown}
      onChange={handleChange}
      containerClassName="shadow-lg"
      buttonClassName="bg-gray-50 hover:bg-gray-100"
      contentClassName="text-center text-lg font-semibold bg-gray-50"
      content={"Hello!"}
    >
      {({ isOpen }) => (isOpen ? "Close me!" : "Open me!")}
    </Accordion>
  );
};

export const Controlled = ({ onChange }): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (arg: boolean) => {
    setIsOpen((prevState) => !prevState);
    onChange(arg);
  };

  return (
    <Accordion
      Icon={FaChrome}
      ArrowIcon={FaChevronDown}
      onChange={handleChange}
      isControlled
      isOpen={isOpen}
      containerClassName="shadow-lg"
      buttonClassName="bg-gray-50 hover:bg-gray-100"
      contentClassName="text-center text-lg font-semibold bg-gray-50"
      content={"Hello!"}
    >
      {isOpen ? "Close me!" : "Open me!"}
    </Accordion>
  );
};
