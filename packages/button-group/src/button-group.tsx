import React from 'react';
import classNames from 'classnames';

type ButtonGroupTypes = {
  className?: string;
  children: React.ReactNodeArray;
  vertical?: boolean;
  color?: string;
  variant?: string;
};

export const ButtonGroup = ({ className, children, vertical, color, variant }: ButtonGroupTypes) =>
  children && (
    <div
      className={classNames(
        'flex',
        {
          'flex-col': vertical,
        },
        className,
      )}
    >
      {React.Children.map(
        children,
        (child, index) =>
          React.isValidElement(child) &&
          React.cloneElement(child, {
            ...child.props,
            className: classNames(`transition-all duration-300`, {
              [`rounded-none ${
                !vertical ? 'border-r' : 'border-b'
              } border-gray-800 bg-${color}-500 hover:bg-${color}-700  hover:shadow-md`]: !variant,
              [`rounded-none border border-${color}-500 bg-transparent hover:bg-gray-100 text-${color}-500`]:
                variant === 'outline',
              [`rounded-none border-r border-${color}-500 shadow-none bg-transparent hover:bg-gray-100 text-${color}-500`]:
                variant === 'no-border',
              [`${!vertical ? 'rounded-l-md rounded-r-none' : 'rounded-t-md rounded-b-none'}`]:
                index === 0,
              [`
${!vertical ? 'rounded-r-md rounded-l-none' : 'rounded-b-md rounded-t-none'} ${
                variant !== 'outline' && 'border-none'
              }`]: index === children.length - 1,
            }),
          }),
      )}
    </div>
  );

export default ButtonGroup;
