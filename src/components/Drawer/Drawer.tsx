import React, { useRef, useMemo, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Link from "../Link/Link";
import classNames from "classnames";
import { Transition } from "@headlessui/react";
import FocusLock from "../FocusTrap/FocusTrap";
import { useTransition, animated, config } from "react-spring";

export interface DrawerTypes {
  /**
   An array of objects, each object can have a title, an Icon, and somewhere to redirect to. It can also have a component property, in which case the component will be displayed as an item.
  */
  sidebarData?: {
    title?: string;
    to?: string;
    Icon?: React.ComponentType<{ className: string }>;
    Component?: React.ComponentType;
  }[];
  /**
   A component that will be displayed in the drawer. 
  */
  SidebarComponent?: React.ComponentType;
  isOpen: boolean;
  setIsOpen: (state: boolean | ((prevState: boolean) => boolean)) => void;
  direction?: string;
  iconClassNames?: string;
  textClassNames?: string;
  drawerClassNames?: string;
  linkClassNames?: string;
}

const Drawer = ({
  sidebarData,
  SidebarComponent,
  direction = "f",
  isOpen,
  setIsOpen,
  iconClassNames,
  textClassNames,
  drawerClassNames,
  linkClassNames,
}: DrawerTypes): React.ReactElement => {
  let alternate;
  if (direction === "left" || direction === "right") alternate = "top";
  if (direction === "top" || direction === "bottom") alternate = "left";

  useEffect(() => {
    const handleSpacebarPress = (e) => {
      if (e.code === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleSpacebarPress);
    return () => document.removeEventListener("keydown", handleSpacebarPress);
  }, [isOpen]);

  const leftD = {
    from: {
      top: "0%",
      left: "-100%",
    },
    enter: {
      left: "-0%",
      top: "0%",
    },
    leave: {
      left: "-100%",
      top: "0%",
    },
    unique: true,
    config: config.default,
  };

  const rightD = {
    from: {
      top: "0%",
      right: "-100%",
    },
    enter: {
      right: "-0%",
      top: "0%",
    },
    leave: {
      right: "-100%",
      top: "0%",
    },
    unique: true,
    config: config.default,
  };
  const topD = {
    from: {
      top: "-100%",
      left: "0%",
    },
    enter: {
      left: "0%",
      top: "0%",
    },
    leave: {
      left: "0%",
      top: "-100%",
    },
    unique: true,
    config: config.default,
  };

  const bottomD = {
    from: {
      bottom: "-100%",
      left: "0%",
    },
    enter: {
      left: "0%",
      bottom: "0%",
    },
    leave: {
      left: "0%",
      bottom: "-100%",
    },
    unique: true,
    config: config.default,
  };

  const selector = () => {
    if (direction === "top") return topD;
    if (direction === "bottom") return bottomD;
    if (direction === "left") return leftD;
    if (direction === "right") return rightD;
  };

  const transition = useTransition(isOpen, null, selector());

  return (
    <FocusLock isDisabled={!isOpen} restoreFocus={true}>
      <div className="w-screen h-screen">
        <Transition
          show={isOpen}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition ease-in duration-300"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0 s"
          className="fixed top-0 left-0 z-10 w-screen h-full bg-black bg-opacity-40"
          onClick={() => setIsOpen(false)}
        ></Transition>

        {transition.map(
          ({ item, key, props }) =>
            item && (
              <animated.nav
                key={key}
                style={props}
                className={classNames(
                  "drawer z-20",
                  {
                    "h-auto w-full ": alternate === "left",
                  },
                  drawerClassNames,
                )}
              >
                <ul className="drawer-ul ">
                  <li
                    className={classNames("drawer-li-1", {
                      "justify-start": direction === "left",
                      "justify-end": direction === "right",
                    })}
                  >
                    <button
                      className={classNames("close-button-container", {
                        "pl-8": direction === "left",
                        "pr-8": direction === "right",
                      })}
                      onClick={() => setIsOpen((prevState) => !prevState)}
                    >
                      <AiOutlineClose />
                    </button>
                  </li>
                  {SidebarComponent && SidebarComponent}
                  {sidebarData &&
                    sidebarData.map(({ title, Icon, to, Component }, index) => (
                      <li key={index} className="">
                        <Link
                          onClick={() => setIsOpen((prevState) => !prevState)}
                          className={classNames(
                            "drawer-link",
                            {
                              // "ml-5": left,
                              // "mr-5": right,
                            },
                            linkClassNames,
                          )}
                          to={to}
                        >
                          <Icon
                            className={classNames(
                              "drawer-link-icon",
                              iconClassNames,
                            )}
                          />
                          <div className={classNames(textClassNames)}>
                            {title}
                          </div>
                        </Link>
                        {Component && Component}
                      </li>
                    ))}
                </ul>
              </animated.nav>
            ),
        )}
      </div>
    </FocusLock>
  );
};

export default Drawer;
