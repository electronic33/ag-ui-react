import React from "react";
import Button from "./Button";
import "../../styles/index.css";
import { AiFillAudio } from "react-icons/ai";

export default {
  title: "Button",
  component: Button,
  argTypes: { onClick: { action: "clicked" } },
};

export const Default = ({ onClick, ...rest }): React.ReactNode => (
  <Button Icon={AiFillAudio} {...rest} text="Button" onClick={onClick} />
);

export const Small = (props): React.ReactNode => (
  <Button text="Button" {...props} Icon={AiFillAudio} sizeClass="btn-sm" />
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
    isLoading
    SpinnerClassName=""
  />
);
