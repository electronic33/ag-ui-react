/* eslint-disable react/display-name */
import React, { ReactNode } from "react";

import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import classNames from "classnames";

export interface ButtonProps {
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  Icon?: React.ComponentType<{ className: string }>;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  /**
   sm(small), default(normal), or lg(large)
  */
  size?: "sm" | "default" | "lg";
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event?: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event?: React.FocusEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  ariaProps?: {
    "aria-haspopup":
      | boolean
      | "dialog"
      | "menu"
      | "false"
      | "true"
      | "listbox"
      | "tree"
      | "grid";
  };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      isDisabled,
      isLoading,
      Icon,
      iconPosition = "left",
      type = "button",
      size = "default",
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ariaProps = {},
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        className={classNames(
          {
            "btn-sm": size === "sm",
          },
          {
            btn: size === "default",
          },
          {
            "btn-lg": size === "lg",
          },
          {
            "opacity-75 pointer-events-none": isDisabled || isLoading,
          },
          className,
        )}
        {...ariaProps}
      >
        <>
          {isLoading && !iconPosition && (
            <ButtonSpinner className={classNames("mr-2 flex-shrink-0")} />
          )}
          {!isLoading && Icon && iconPosition === "left" && (
            <Icon className={classNames("mr-2 flex-shrink-0")} />
          )}
          {children}
          {!isLoading && Icon && iconPosition === "right" && (
            <Icon className={classNames("ml-2 flex-shrink-0")} />
          )}
          {isLoading && iconPosition === "right" && (
            <ButtonSpinner className={classNames("ml-2 flex-shrink-0")} />
          )}
        </>
      </button>
    );
  },
);

export default Button;
