import React from "react";
import Button from "./Button";
import "../../styles/index.css";
import { AiFillAudio } from "react-icons/ai";

export default {
  title: "FORMS/Button",
  component: Button,
  argTypes: { onClick: { action: "clicked" } },
};

export const Default = ({ onClick, ...rest }): React.ReactNode => (
  <Button Icon={AiFillAudio} {...rest} onClick={onClick}>
    Button
  </Button>
);

export const Small = (props): React.ReactNode => (
  <Button {...props} Icon={AiFillAudio} size="sm">
    Button
  </Button>
);

export const Large = (): React.ReactNode => (
  <Button Icon={AiFillAudio} size="lg">
    Button
  </Button>
);

export const Loading = (): React.ReactNode => (
  <Button Icon={AiFillAudio} isLoading>
    Button
  </Button>
);
