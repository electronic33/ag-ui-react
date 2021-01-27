import React, { FC } from "react";

interface LinkProps {
  className: string;
  to: string;
  text: string;
}

const Link: FC<LinkProps> = ({ to, children, className }) => {
  return (
    <a className={className} href={to} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default Link;
