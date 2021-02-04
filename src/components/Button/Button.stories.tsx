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
    text="Button"
    textClassName=""
    className=""
    Icon={AiFillAudio}
    IconClassName=""
    SpinnerClassName=""
  />
);
export const Small = (): React.ReactNode => (
  <Button
    text="Button"
    textClassName=""
    className=""
    Icon={AiFillAudio}
    IconClassName=""
    SpinnerClassName=""
    sizeClass="btn-sm"
  />
);
export const Large = (): React.ReactNode => (
  <Button
    text="Button"
    textClassName=""
    className=""
    Icon={AiFillAudio}
    IconClassName=""
    SpinnerClassName=""
    sizeClass="btn-lg"
  />
);
export const IconRight = (): React.ReactNode => (
  <Button
    text="Button"
    textClassName=""
    className=""
    Icon={AiFillAudio}
    IconClassName=""
    iconPositionRight
    SpinnerClassName=""
  />
);
export const Disabled = (): React.ReactNode => (
  <Button
    text="Button"
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
    text="Button"
    textClassName=""
    className=""
    Icon={AiFillAudio}
    IconClassName=""
    loading
    SpinnerClassName=""
  />
);
