import React from "react";
import Link from "./Link";
import "../../styles/index.css";

export default {
  title: "Link",
};

export const Default = (): React.ReactNode => (
  <Link
    linkType="a"
    linkAttribute="href"
    to="google.com"
    text="this is a link"
  />
);
