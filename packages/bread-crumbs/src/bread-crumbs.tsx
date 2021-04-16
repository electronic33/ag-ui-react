import React from 'react';
import classNames from 'classnames';

type BreadCrumbsTypes = {
  /**
  An array that contains each item, which can have a name and somewhere to redirect to.
  */
  items: { label: string; to?: string; onClick?: () => void }[];
  /**
  A component which redirects somewhere with the help of the 'to' property given in the items array
  */
  LinkComponent: React.ElementType<{
    className?: string;
    to: string;
    onClick?: () => void;
    children: React.ReactNode;
  }>;
};

export const BreadCrumbs = ({ items, LinkComponent }: BreadCrumbsTypes) => (
  // TODO: add menu ... when overflow

  <nav className="bread-crumbs" aria-label="breadcrumb">
    {items.map(({ label, to, onClick }, i) => (
      <div className="bread-crumb" key={label}>
        {i ? (
          <svg
            role="presentation"
            className="bread-crumb-icon"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 320 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
          </svg>
        ) : null}
        {to ? (
          <LinkComponent
            className={classNames({ 'font-bold': i === items.length - 1 })}
            to={to}
            onClick={onClick}
          >
            <div aria-current={i === items.length - 1 ? 'page' : undefined}>
              {label}
            </div>
          </LinkComponent>
        ) : (
          <div aria-current={i === items.length - 1 ? 'page' : undefined}>
            {label}
          </div>
        )}
      </div>
    ))}
  </nav>
);
