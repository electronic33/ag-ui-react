import React from "react";
import BreadCrumbs from "./BreadCrumbs";
import "../../styles/index.css";
import Link from "../Link/Link";

export default {
  title: "BreadCrumbs",
  component: BreadCrumbs,
};
const paths = [
  { name: "Főoldal", to: "/" },
  { name: "Rendelések", to: "/comenzi" },
];

export const Default = (props): React.ReactNode => (
  <BreadCrumbs LinkComponent={Link} items={paths} {...props} />
);
