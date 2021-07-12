import React from 'react';

type LinkProps = {
  className?: string;
  to: string | undefined;
  children: React.ReactNode;
  onClick?: () => void;
  target?: string;
};

export const Link = ({
  to,
  children,
  className,
  onClick,
  target,
}: LinkProps): React.ReactElement => (
  <a className={className} href={to} target={target} onClick={onClick}>
    {children}
  </a>
);
