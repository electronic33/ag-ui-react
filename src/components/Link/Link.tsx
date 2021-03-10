import React from "react";

export interface LinkProps {
  className?: string;
  to?: string;
  children?: React.ReactNode;
  onClick: () => void;
}

const Link = ({
  to,
  children,
  className,
  onClick,
}: LinkProps): React.ReactElement => {
  return (
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
};

export default Link;
