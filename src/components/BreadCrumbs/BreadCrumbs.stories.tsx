import React from "react";
import BreadCrumbs from "./BreadCrumbs";
import "../../styles/index.css";
import Link from "../Link/Link";

export default {
  title: "NAVIGATION/Breadcrumbs",
  component: BreadCrumbs,
};

const paths = [
  { label: "App" },
  { label: "Főoldal", to: "/" },
  { label: "Rendelések", to: "/comenzi" },
];

export const Default = (): React.ReactNode => (
  <BreadCrumbs LinkComponent={Link} items={paths} />
);
