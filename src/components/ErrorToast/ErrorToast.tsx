import React from "react";
import classNames from "classnames";
import { MdCancel } from "react-icons/md";

const ErrorToast = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}): React.ReactElement => {
  return (
    <div className={classNames("error-toast", className)}>
      <MdCancel className="mr-2 text-lg min-w-5 flex-shrink-0" />
      {message}
    </div>
  );
};

export default ErrorToast;
