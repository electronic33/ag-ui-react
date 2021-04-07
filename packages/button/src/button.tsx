import React, { ReactNode } from 'react';

// import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import classNames from 'classnames';

type ButtonProps = {
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  Icon?: React.ComponentType<{ className: string }>;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  /**
   sm(small), default(normal), or lg(large)
  */
  size?: 'sm' | 'default' | 'lg';
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event?: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event?: React.FocusEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  ariaProps?: {
    'aria-haspopup':
      | boolean
      | 'dialog'
      | 'menu'
      | 'false'
      | 'true'
      | 'listbox'
      | 'tree'
      | 'grid';
  };
};

export const Button = React.forwardRef<HTMLButtonElement | null, ButtonProps>(
  (
    {
      className,
      children,
      isDisabled,
      isLoading,
      Icon,
      iconPosition = 'left',
      type = 'button',
      size = 'default',
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ariaProps = {},
    },
    ref,
  ) => (
    <button
      ref={ref}
      // eslint-disable-next-line react/button-has-type
      type={type}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      className={classNames(
        {
          'btn-sm': size === 'sm',
        },
        {
          btn: size === 'default',
        },
        {
          'btn-lg': size === 'lg',
        },
        {
          'btn-disabled': isDisabled || isLoading,
        },
        'focus:ring-4 focus:ring-blue:500 focus:ring-opacity:50',
        className,
      )}
      {...ariaProps}
    >
      <>
        {/* {isLoading && !iconPosition && (
            <ButtonSpinner className={classNames("btn-icon-spinner-left")} />
          )} */}
        {!isLoading && Icon && iconPosition === 'left' && (
          <Icon className={classNames('btn-icon-spinner-left')} />
        )}
        {children}
        {!isLoading && Icon && iconPosition === 'right' && (
          <Icon className={classNames('btn-icon-spinner-right')} />
        )}
        {/* {isLoading && iconPosition === "right" && (
            <ButtonSpinner className={classNames("btn-icon-spinner-right")} />
          )} */}
      </>
    </button>
  ),
);
