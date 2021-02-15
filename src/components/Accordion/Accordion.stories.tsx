import React from "react";
import Accordion from "./Accordion";
import "../../styles/index.css";
import { FaChevronDown, FaChrome } from "react-icons/fa";

export default {
  title: "Accordion",
};

export const Default = (): React.ReactNode => (
  <Accordion
    text="Accordion Component"
    Icon={FaChrome}
    ArrowIcon={FaChevronDown}
    DropDownClassName="bg-red-500 "
  >
    <div className="flex justify-center items-center h-44">Hello!</div>
  </Accordion>
);
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
