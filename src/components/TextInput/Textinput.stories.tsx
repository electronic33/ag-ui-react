import React from "react";
import TextInput from "./TextInput";
import "../../styles/index.css";
import { MdLabelOutline } from "react-icons/md";

export default {
  title: "TextInput",
};

export const Default = (): React.ReactNode => (
  <TextInput
    label="Textinput"
    placeholder="This is a textinput"
    onBlur={true}
    value=""
  />
);
export const WithIcon = (): React.ReactNode => (
  <TextInput
    label="Textinput"
    Icon={MdLabelOutline}
    placeholder="This is a textinput"
    onBlur={true}
    value=""
  />
);
export const Error = (): React.ReactNode => (
  <TextInput
    label="Textinput"
    Icon={MdLabelOutline}
    placeholder="This is a textinput"
    onBlur={true}
    error="Error"
  />
);
export const ErrorInLabel = (): React.ReactNode => (
  <TextInput
    label="Textinput"
    Icon={MdLabelOutline}
    placeholder="This is a textinput"
    error="Error"
    errorInLabel
  />
);
