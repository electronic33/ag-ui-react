import React, { useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import classNames from "classnames";

export interface BreadCrumbsTypes {
  /**
  An array that contains each item, which can have a name and somewhere to redirect to.
  */
  items: { name: string; to: string }[];
  /**
  A component which redirects somewhere with the help of the 'to' property given in the items array
  */
  LinkComponent?: React.ComponentType<{ className: string }>;
}

const BreadCrumbs = ({
  items,
  LinkComponent,
}: BreadCrumbsTypes): React.ReactElement => {
  return (
    <nav className="bread-crumbs" aria-label="breadcrumb">
      {items.map(({ name, to }, i) => (
        <div className="bread-crumb flex items-center mr-2" key={i}>
          {i ? (
            <FaChevronRight role="presentation" className="bread-crumb-icon" />
          ) : null}
          <LinkComponent
            className={classNames("", { "font-bold": i === items.length - 1 })}
            to={to}
          >
            <div aria-current={i === items.length - 1 ? "page" : undefined}>
              {name}
            </div>
          </LinkComponent>
        </div>
      ))}
    </nav>
  );
};

export default BreadCrumbs;
