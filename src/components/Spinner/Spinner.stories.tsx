import React, { useState } from "react";
import Spinner from "./Spinner";
import "../../styles/index.css";

export default {
  title: "FEEDBACK/Spinner",
  component: Spinner,
};

export const Top = (): React.ReactNode => {
  return <Spinner></Spinner>;
};
