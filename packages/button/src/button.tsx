import React, { ReactNode } from 'react';

import classNames from 'classnames';
import { Spinner } from '@app-garage/spinner';

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
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event?: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event?: React.FocusEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  ariaProps?: {
    'aria-haspopup': boolean | 'dialog' | 'menu' | 'false' | 'true' | 'listbox' | 'tree' | 'grid';
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
      size = 'md',
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
          'btn-md': size === 'md',
        },
        {
          'btn-lg': size === 'lg',
        },
        {
          'btn-xl': size === 'xl',
        },
        {
          'btn-disabled': isDisabled || isLoading,
        },
        'focus:ring-4 focus:ring-blue:500 focus:ring-opacity:50',
        className,
      )}
      {...ariaProps}
    >
      {isLoading && iconPosition === 'left' && (
        <Spinner
          fill="rgba(255, 255, 255, 1)"
          stroke="rgba(255, 255, 255, 1)"
          className={classNames('btn-icon-spinner-left', {
            'btn-spinner-left-sm': size === 'sm',
            'btn-spinner-left-md': size === 'md',
            'btn-spinner-left-lg': size === 'lg',
            'btn-spinner-left-xl': size === 'xl',
          })}
        />
      )}
      {!isLoading && Icon && iconPosition === 'left' && (
        <Icon className={classNames('btn-icon-spinner-left')} />
      )}
      {children}
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className={classNames('btn-icon-spinner-right')} />
      )}
      {isLoading && iconPosition === 'right' && (
        <Spinner
          fill="rgba(255, 255, 255, 1)"
          stroke="rgba(255, 255, 255, 1)"
          className={classNames('btn-icon-spinner-right', {
            'btn-spinner-right-sm': size === 'sm',
            'btn-spinner-right-md': size === 'md',
            'btn-spinner-right-lg': size === 'lg',
            'btn-spinner-right-xl': size === 'xl',
          })}
        />
      )}
    </button>
  ),
);
