import React from "react";
import Rate from "./Rate";
import "../../styles/index.css";
import { FaStar } from "react-icons/fa";

export default {
  title: "OTHERS/Rate",
  component: Rate,
};

export const Default = (): React.ReactNode => (
  <Rate
    numberOfStars={5}
    StarIcon={FaStar}
    activeClassName="text-yellow-500 "
    disabledClassName="text-gray-200 "
    labels={[
      "bruh",
      "hmm",
      "ok",
      "fasza",
      "zsir",
      "meno",
      "kiraly",
      "nagyon kiraly",
      "allat",
      "fantasztikus",
    ]}
  />
);
