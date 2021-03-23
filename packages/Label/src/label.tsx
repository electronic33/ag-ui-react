import React from "react";
import classNames from "classnames";

type LabelProps = {
  secondaryText?: string;
  className?: string;
  required?: boolean;
  errorText?: string;
  htmlFor?: string;
  children?: React.ReactNode;
  as?: "label" | "span";
}

export const Label = ({
  secondaryText,
  className,
  required = false,
  children,
  errorText,
  htmlFor,
  as = "label",
}: LabelProps): React.ReactElement => {
  const content = (
    <>
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
    </>
  );

  const wrapperProps = {
    className: classNames("label", className),
  };

  if (as === "span") {
    return <span {...wrapperProps}>{content}</span>;
  }

  return (
    <label htmlFor={htmlFor} {...wrapperProps}>
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
