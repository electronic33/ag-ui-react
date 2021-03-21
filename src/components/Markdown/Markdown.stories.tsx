import React, { useState } from "react";
import Markdown from "./Markdown";
import "../../styles/index.css";

export default {
  title: "OTHERS/Markdown",
  component: Markdown,
};

export const Default = (props): React.ReactNode => {
  const [value, setValue] = useState("");
  return (
    <Markdown
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
};
