import React from "react";
import classNames from "classnames";

type BottomNavProps = {
  /**
   A component which redirects somewhere with the help of the 'to' property given in the items array
  */
  LinkComponent?: React.ComponentType<{
    className?: string;
    to: string;
    onClick?: () => void;
  }>;
  containerClassName?: string;
  /**
  className for each link
  */
  linkClassName?: string;
  /**
  className of the link determined by the given activeIndex
  */
  activeClassName?: string;
  /**
  An array that contains each item, which can have an icon, a label, and somewhere to redirect to
  */
  items: {
    Icon: React.ComponentType<{ className: string }>;
    label: string;
    to: string;
  }[];
  /**
  The index of the active item
  */
  activeIndex?: number | (() => number);
  onClick?: () => void;
};

const BottomNav = ({
  LinkComponent,
  containerClassName,
  linkClassName,
  activeClassName,
  items,
  activeIndex,
  onClick,
}: BottomNavProps): React.ReactElement => {
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
