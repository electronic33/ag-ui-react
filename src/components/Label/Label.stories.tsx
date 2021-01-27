import React from "react";
import Label from "./Label";
import "../../styles/index.css";

export default {
  title: "Label",
};

export const Default = (): React.ReactNode => <Label secondaryText="Label" />;
export const Error = (): React.ReactNode => (
  <Label secondaryText="Label" errorText="Error" />
);
