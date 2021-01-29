import React from "react";
import Button from "./Button";
import "../../styles/index.css";
import { AiFillAudio } from "react-icons/ai";

export default {
  title: "Button",
  component: Button,
};

export const Default = (): React.ReactNode => (
  <Button
    text="Az alma kerek"
    textClassName=""
    className=""
    Icon={AiFillAudio}
    IconClassName=""
    // iconPositionRight
    // disabled
    // loading
    // noLoadingSpinner={false}
    SpinnerClassName=""
  />
);
export const IconRight = (): React.ReactNode => (
  <Button
    text="Az alma kerek"
    textClassName=""
    className="bg-red-500"
    Icon={AiFillAudio}
    IconClassName=""
    iconPositionRight
    SpinnerClassName=""
  />
);
export const Disabled = (): React.ReactNode => (
  <Button
    text="Az alma kerek"
    textClassName=""
    className=""
    Icon={AiFillAudio}
    IconClassName=""
    SpinnerClassName=""
    disabled
  />
);
export const Loading = (): React.ReactNode => (
  <Button
    text="Az alma kerek"
    textClassName=""
    className=""
    Icon={AiFillAudio}
    IconClassName=""
    loading
    SpinnerClassName=""
  />
);
