import React from "react";

interface LinkProps {
  className?: string;
  to: string;
  children?: React.ReactNode;
}

const Link = ({ to, children, className }: LinkProps): React.ReactElement => {
  return (
    <a className={className} href={to} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default Link;
