/* eslint-disable react/prop-types */
import React, { FunctionComponent } from "react";

import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import classNames from "classnames";

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
  textClassName?: string;
  Icon?: unknown;
  IconClassName?: string;
  iconPositionRight?: boolean;
  loadingText?: string;
  SpinnerClassName?: string;
  noLoadingSpinner?: boolean;
};

const Button: FunctionComponent<ButtonProps> = ({
  className,
  disabled,
  loading,
  text,
  Icon,
  IconClassName,
  iconPositionRight,
  loadingText,
  noLoadingSpinner = false,
  SpinnerClassName,
  textClassName,
}) => {
  return (
    <button
      className={classNames(
        "btn",
        {
          "bg-opacity-75 cursor-default": disabled || loading,
        },
        className,
      )}
    >
      {loading && !noLoadingSpinner && !iconPositionRight && (
        <ButtonSpinner
          className={classNames("mr-2 flex-shrink-0", SpinnerClassName)}
        />
      )}
      {!loading && Icon && !iconPositionRight && (
        <Icon className={classNames("mr-2 flex-shrink-0", IconClassName)} />
      )}
      {loading && loadingText ? (
        loadingText
      ) : (
        <p className={textClassName}>{text}</p>
      )}
      {!loading && Icon && iconPositionRight && (
        <Icon className={classNames("ml-2 flex-shrink-0", IconClassName)} />
      )}
      {loading && !noLoadingSpinner && iconPositionRight && (
        <ButtonSpinner
          className={classNames("ml-2 flex-shrink-0", SpinnerClassName)}
        />
      )}
    </button>
  );
};

export default Button;
