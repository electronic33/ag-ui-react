import React from "react";
import classNames from "classnames";
import { MdCheckCircle } from "react-icons/md";

const SuccessToast = ({ message, className }) => {
  return (
    <div className={classNames("success-toast", className)}>
      <MdCheckCircle className="mr-2 text-lg min-w-5 flex-shrink-0" />
      {message}
    </div>
  );
};

export default SuccessToast;
