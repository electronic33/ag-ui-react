import React from "react";
import classNames from "classnames";
import { MdCancel } from "react-icons/md";

export const ErrorToast = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}): React.ReactElement => {
  return (
    <div className={classNames("error-toast", className)}>
      <MdCancel
        className={classNames("mr-2 text-lg min-w-5 flex-shrink-0", className)}
      />
      {message}
    </div>
  );
};


