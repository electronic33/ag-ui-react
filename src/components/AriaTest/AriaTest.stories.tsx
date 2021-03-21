import React from "react";
import AriaTest from "./AriaTest";
import "../../styles/index.css";

export default {
  title: "OTHERS/AriaTest",
  component: AriaTest,
};

export const Default = (): React.ReactNode => (
  <AriaTest onPress={() => alert("AriaTest pressed!")}>Press me</AriaTest>
);
