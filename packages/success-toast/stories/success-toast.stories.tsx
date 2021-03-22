import React from "react";
import { SuccessToast } from "../src";

export default {
  title: "FEEDBACK/SuccessToast",
  component: SuccessToast,
};

export const Default = (props): React.ReactNode => (
  <SuccessToast message="Success toast!" {...props} />
);
