/* eslint-disable react/prop-types */
import React, { FunctionComponent } from "react";

import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import classNames from "classnames";

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  text?: string;
  textClassName?: string;
  Icon?: React.ComponentType<{ className: string }>;
  IconClassName?: string;
  iconPositionRight?: boolean;
  loadingText?: string;
  SpinnerClassName?: string;
  showLoadingSpinner?: boolean;
  /**
   sm(small), default(normal), or lg(large)
  */
  sizeClass?: string;
  onClick?: () => void;
};

const Button: FunctionComponent<ButtonProps> = ({
  className,
  children,
  disabled,
  isLoading,
  text,
  Icon,
  IconClassName,
  iconPositionRight,
  loadingText,
  showLoadingSpinner = true,
  SpinnerClassName,
  textClassName,
  sizeClass = "default",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}) => {
  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      className={classNames(
        `${sizeClass}`,
        {
          "btn-sm": sizeClass === "sm",
        },
        {
          "btn ": sizeClass === "default",
        },
        {
          "btn-lg": sizeClass === "lg",
        },
        {
          "opacity-75 pointer-events-none": disabled || isLoading,
        },
        className,
      )}
    >
      {children ? (
        children
      ) : (
        <>
          {isLoading && showLoadingSpinner && !iconPositionRight && (
            <ButtonSpinner
              className={classNames("mr-2 flex-shrink-0", SpinnerClassName)}
            />
          )}
          {!isLoading && Icon && !iconPositionRight && (
            <Icon className={classNames("mr-2 flex-shrink-0", IconClassName)} />
          )}
          {isLoading && loadingText ? (
            loadingText
          ) : (
            <p className={textClassName}>{text}</p>
          )}
          {!isLoading && Icon && iconPositionRight && (
            <Icon className={classNames("ml-2 flex-shrink-0", IconClassName)} />
          )}
          {isLoading && showLoadingSpinner && iconPositionRight && (
            <ButtonSpinner
              className={classNames("ml-2 flex-shrink-0", SpinnerClassName)}
            />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
