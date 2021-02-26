import React from "react";
import { FaChevronRight } from "react-icons/fa";
import classNames from "classnames";

interface BreadCrumbsTypes {
  items: { name: string; to: string }[];
  LinkComponent?: React.ComponentType<{ className: string }>;
}

const BreadCrumbs = ({
  items,
  LinkComponent,
}: BreadCrumbsTypes): React.ReactElement => {
  return (
    <div className="bread-crumbs">
      {items.map(({ name, to }, i) => (
        <div className="bread-crumb flex items-center mr-2" key={i}>
          {i ? <FaChevronRight className="bread-crumb-icon" /> : null}
          <LinkComponent
            className={classNames("", { "font-bold": i === items.length - 1 })}
            to={to}
          >
            {name}
          </LinkComponent>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
