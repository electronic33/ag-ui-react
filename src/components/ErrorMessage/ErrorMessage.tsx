import React from "react";
import classNames from "classnames";
import { MdCancel } from "react-icons/md";

const ErrorMessage = ({ className, children }) => {
  return (
    <div className={classNames("error-message", className)}>
      <MdCancel className="mr-2 text-lg min-w-5 flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
};

export default ErrorMessage;
