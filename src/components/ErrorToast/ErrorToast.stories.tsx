import React from "react";
import ErrorToast from "./ErrorToast";
import "../../styles/index.css";

export default {
  title: "ErrorToast",
};

export const Default = (): React.ReactNode => (
  <ErrorToast message="Error toast!" />
);
