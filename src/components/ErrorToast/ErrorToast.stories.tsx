import React from "react";
import ErrorToast from "./ErrorToast";
import "../../styles/index.css";

export default {
  title: "ErrorToast",
  component: ErrorToast,
};

export const Default = (props): React.ReactNode => (
  <ErrorToast message="Error toast!" {...props} />
);
