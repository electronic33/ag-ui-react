import React from "react";
import ErrorMessage from "./ErrorMessage";
import "../../styles/index.css";

export default {
  title: "ErrorMessage",
};

export const Default = (): React.ReactNode => (
  <ErrorMessage>
    <p>An error occured!</p>
  </ErrorMessage>
);
