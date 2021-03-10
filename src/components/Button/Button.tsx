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
  Icon?: React.ComponentType<{ className: string }>;
  IconClassName?: string;
  iconPositionRight?: boolean;
  loadingText?: string;
  SpinnerClassName?: string;
  noLoadingSpinner?: boolean;
  sizeClass?: string;
  onClick: () => void;
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
  sizeClass = "btn",
  onClick,
}) => {
  return (
    <button
      className={classNames(
        `${sizeClass}`,
        {
          "bg-opacity-75 cursor-default": disabled || loading,
        },
        className,
      )}
      onClick={() => onClick("AAAAARG")}
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
