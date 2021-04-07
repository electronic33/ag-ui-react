import React from 'react';

type LinkProps = {
  className?: string;
  to: string | undefined;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Link = ({
  to,
  children,
  className,
  onClick,
}: LinkProps): React.ReactElement => (
  <a
    className={className}
    href={to}
    target="_blank"
    rel="noreferrer"
    onClick={onClick}
  >
    {children}
  </a>
);
