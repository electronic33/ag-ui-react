import React from "react";
import SuccessToast from "./SuccessToast";
import "../../styles/index.css";

export default {
  title: "SuccessToast",
};

export const Default = (): React.ReactNode => (
  <SuccessToast message="Success toast!" />
);
