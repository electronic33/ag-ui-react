import React from "react";
import Label from "./Label";
import "../../styles/index.css";

export default {
  title: "Label",
  component: Label,
};

export const Default = (props): React.ReactNode => (
  <Label labelText="Label" {...props}>
    Text
  </Label>
);
export const Error = (): React.ReactNode => (
  <Label labelText="Label" errorText="Error" />
);
