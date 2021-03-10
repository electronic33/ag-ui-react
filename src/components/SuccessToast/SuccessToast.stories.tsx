import React from "react";
import SuccessToast from "./SuccessToast";
import "../../styles/index.css";

export default {
  title: "SuccessToast",
  component: SuccessToast,
};

export const Default = (props): React.ReactNode => (
  <SuccessToast message="Success toast!" {...props} />
);
