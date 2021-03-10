import React from "react";
import ErrorMessage from "./ErrorMessage";
import "../../styles/index.css";

export default {
  title: "ErrorMessage",
  component: ErrorMessage,
};

export const Default = (props): React.ReactNode => (
  <ErrorMessage {...props}>
    <p>An error occured!</p>
  </ErrorMessage>
);
