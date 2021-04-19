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
            'w-4 h-4 mr-2': size === 'sm',
            'w-7 h-7 mr-3': size === 'md',
            'w-9 h-9 mr-4': size === 'lg',
            'w-11 h-11 mr-5': size === 'xl',
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
            'w-4 h-4 ml-2': size === 'sm',
            'w-7 h-7 ml-3': size === 'md',
            'w-9 h-9 ml-4': size === 'lg',
            'w-11 h-11 ml-5': size === 'xl',
          })}
        />
      )}
    </button>
  ),
);
