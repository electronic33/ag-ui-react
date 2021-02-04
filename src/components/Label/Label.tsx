import React, { FC } from "react";
import classNames from "classnames";

interface LabelProps {
  secondaryText?: string;
  className?: string;
  required?: boolean;
  children?: unknown;
  errorText?: string;
  htmlFor?: string;
}

const Label: FC<LabelProps> = ({
  secondaryText,
  className,
  required = false,
  children,
  errorText,
  htmlFor,
}) => {
  return (
    <label htmlFor={htmlFor} className={classNames("label", className)}>
      {children}
      {required && (
        <span className="ml-px self-start text-xs font-thin text-red-600">
          *
        </span>
      )}
      {secondaryText && (
        <span
          className={classNames("text-sm text-gray-400", {
            "ml-1": required,
            "ml-2": !required,
          })}
        >
          {secondaryText}
        </span>
      )}
      {errorText && (
        <span className="ml-1 text-red-600 text-sm">- {errorText}</span>
      )}
    </label>
  );
};

export default Label;
