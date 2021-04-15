import React from 'react';
import classNames from 'classnames';

export const ErrorMessage = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}): React.ReactElement => (
  <div className={classNames('error-message', className)}>
    <svg
      className="mr-2 text-lg min-w-5 flex-shrink-0"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
    </svg>
    <span>{children}</span>
  </div>
);
