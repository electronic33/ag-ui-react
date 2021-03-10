import React from "react";
import PropTypes from "prop-types";

export interface sdas {
  /**
  The display content of the button
  */
  label: string;
}

const Test = ({ label = "empty" }: sdas) => {
  return <div className="bg-blue-500 text-white">{label}</div>;
};

export default Test;
