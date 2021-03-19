import React from "react";
import TextArea from "./TextArea";
import "../../styles/index.css";
import { MdLabelOutline } from "react-icons/md";

export default {
  title: "FORMS/TextArea",
  component: TextArea,
};

export const Default = (props): React.ReactNode => (
  <TextArea
    label="TextArea"
    placeholder="This is a textarea"
    value=""
    {...props}
  />
);
export const WithIcon = (): React.ReactNode => (
  <TextArea
    label="TextArea"
    Icon={MdLabelOutline}
    placeholder="This is a textarea"
    value=""
  />
);
export const Error = (): React.ReactNode => (
  <TextArea
    label="TextArea"
    Icon={MdLabelOutline}
    placeholder="This is a textarea"
    error="Error"
  />
);
export const ErrorInLabel = (): React.ReactNode => (
  <TextArea
    label="TextArea"
    Icon={MdLabelOutline}
    placeholder="This is a textarea"
    error="Error"
    errorInLabel
  />
);
