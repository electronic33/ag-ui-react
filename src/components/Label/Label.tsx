import React from "react";
import classNames from "classnames";

export interface LabelProps {
  labelText?: string;
  className?: string;
  required?: boolean;
  errorText?: string;
  htmlFor?: string;
  children?: React.ReactNode;
}

const Label = ({
  labelText,
  className,
  required = false,
  children,
  errorText,
  htmlFor,
}: LabelProps): React.ReactElement => {
  return (
    <label htmlFor={htmlFor} className={classNames("label", className)}>
      {children}
      {required && (
        <span className="ml-px self-start text-xs font-thin text-red-600">
          *
        </span>
      )}
      {labelText && (
        <span
          className={classNames("text-sm text-gray-400", {
            "ml-1": required,
            "ml-2": !required,
          })}
        >
          {labelText}
        </span>
      )}
      {errorText && (
        <span className="ml-1 text-red-600 text-sm">- {errorText}</span>
      )}
    </label>
  );
};

export default Label;
