import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
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
          <FaChevronRight role="presentation" className="bread-crumb-icon" />
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
