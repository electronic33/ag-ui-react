import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import "../../styles/index.css";
import { FaChevronDown, FaChevronUp, FaChrome } from "react-icons/fa";

export default {
  title: "Accordion",
  component: Accordion,
  argTypes: { onClick: { action: "clicked" } },
};

export const Default = ({ onClick, ...rest }): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (arg) => {
    onClick(arg);
    setIsOpen(arg);
  };

  return (
    <Accordion
      text="Accordion Component"
      Icon={FaChrome}
      ArrowIcon={FaChevronDown}
      DropDownClassName="bg-red-500 "
      {...rest}
      open={isOpen}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center h-44">Hello!</div>
    </Accordion>
  );
};
export const textOnly = (): React.ReactNode => (
  <Accordion text="Accordion Component" DropDownClassName="bg-red-500 ">
    <div className="flex justify-center items-center h-44">Hello!</div>
  </Accordion>
);
export const TextAndArrow = (): React.ReactNode => (
  <Accordion
    text="Accordion Component"
    ArrowIcon={FaChevronDown}
    DropDownClassName="bg-red-500 "
  >
    <div className="flex justify-center items-center h-44">Hello!</div>
  </Accordion>
);
export const TextAndIcon = (): React.ReactNode => (
  <Accordion
    text="Accordion Component"
    Icon={FaChrome}
    DropDownClassName="bg-red-500 "
  >
    <div className="flex justify-center items-center h-44">Hello!</div>
  </Accordion>
);
