import React from "react";
import classNames from "classnames";

interface BottomNavTypes {
  LinkComponent?: React.ComponentType;
  containerClassName?: string;
  linkClassName?: string;
  activeClassName?: string;
  items: {
    Icon: React.ComponentType<{ className: string }>;
    label: string;
    to: string;
  }[];
  activeIndex?: number | (() => number);
  onClick?: () => void;
}

const BottomNav = ({
  LinkComponent,
  containerClassName,
  linkClassName,
  activeClassName,
  items,
  activeIndex,
  onClick,
}: BottomNavTypes): React.ReactElement => {
  return (
    <div className={classNames("bottom-nav-container", containerClassName)}>
      {items.map(({ Icon, label, to }, index) => {
        return (
          <LinkComponent
            key={index}
            onClick={onClick}
            className={classNames(
              "bottom-nav-link",
              {
                [`${activeClassName}`]: index === activeIndex,
              },
              linkClassName,
            )}
            to={to}
          >
            <Icon className="bottom-nav-icon" />
            {label}
          </LinkComponent>
        );
      })}
    </div>
  );
};

export default BottomNav;
