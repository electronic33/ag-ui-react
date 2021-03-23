import React, { useEffect, useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ReactScrollLock from "react-scrolllock";
import classNames from "classnames";
import { Link } from "@app-garage/link";
import { FocusLock } from "@app-garage/focus-trap";
import { useStopPropagation } from "@app-garage/utils";
import { useTransition, animated, config } from "react-spring";
import { Button } from "@app-garage/button";

type DrawerTypes = {
  /**
   An array of objects, each object can have a title, an Icon, and somewhere to redirect to. It can also have a component property, in which case the component will be displayed as an item.
  */
  sidebarData?: {
    title?: string;
    to?: string;
    Icon?: React.ComponentType<{ className: string }>;
    Component?: React.ReactNode;
  }[];
  /**
   A component that will be displayed in the drawer. 
  */
  SidebarComponent?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  direction?: "top" | "right" | "bottom" | "left";
  iconClassName?: string;
  textClassName?: string;
  drawerClassNames?: string;
  linkClassNames?: string;
};

export const Drawer = ({
  sidebarData,
  SidebarComponent,
  direction = "left",
  isOpen,
  onClose,
  iconClassName,
  textClassName,
  drawerClassNames,
  linkClassNames,
}: DrawerTypes) => {
  const stopPropagation = useStopPropagation();

  useEffect(() => {
    const handleSpacebarPress = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleSpacebarPress);
    return () => document.removeEventListener("keydown", handleSpacebarPress);
  }, [isOpen]);

  const springConfig = useMemo(() => {
    switch (direction) {
      case "top":
        return {
          from: {
            opacity: "0",
            top: "-100%",
            left: "0%",
          },
          enter: {
            opacity: "1",
            left: "0%",
            top: "0%",
          },
          leave: {
            opacity: "0",
            left: "0%",
            top: "-100%",
          },
          unique: true,
          config: config.default,
        };
      case "right":
        return {
          from: {
            opacity: "0",
            top: "0%",
            right: "-100%",
          },
          enter: {
            opacity: "1",
            right: "-0%",
            top: "0%",
          },
          leave: {
            opacity: "0",
            right: "-100%",
            top: "0%",
          },
          unique: true,
          config: config.default,
        };
      case "bottom":
        return {
          from: {
            opacity: "0",
            bottom: "-100%",
            left: "0%",
          },
          enter: {
            opacity: "1",
            left: "0%",
            bottom: "0%",
          },
          leave: {
            opacity: "0",
            left: "0%",
            bottom: "-100%",
          },
          unique: true,
          config: config.default,
        };
      case "left":
        return {
          from: {
            opacity: "0",
            top: "0%",
            left: "-100%",
          },
          enter: {
            opacity: "1",
            left: "-0%",
            top: "0%",
          },
          leave: {
            opacity: "0",
            left: "-100%",
            top: "0%",
          },
          unique: true,
          config: config.default,
        };
    }
  }, []);

  const transitions = useTransition(isOpen, null, springConfig);

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <FocusLock key={key} isDisabled={!isOpen} restoreFocus>
              <ReactScrollLock>
                <animated.div
                  className="fixed top-0 left-0 z-10 w-screen h-screen bg-black bg-opacity-40"
                  onClick={onClose}
                  style={{ opacity: props.opacity }}
                >
                  <animated.nav
                    style={{ ...props, opacity: 1 }}
                    onClick={stopPropagation}
                    className={classNames(
                      "drawer",
                      {
                        "drawer-vertical":
                          direction === "left" || direction === "right",
                        "drawer-horizontal":
                          direction === "top" || direction === "bottom",
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
                        <Button
                          className={classNames("close-button-container", {
                            "pl-8": direction === "left",
                            "pr-8": direction === "right",
                          })}
                          onClick={onClose}
                        >
                          <AiOutlineClose />
                        </Button>
                      </li>
                      {SidebarComponent}
                      {sidebarData &&
                        sidebarData.map(
                          ({ title, Icon, to, Component }, index) => (
                            <li key={index} className="">
                              <Link
                                className={classNames(
                                  "drawer-link",
                                  linkClassNames,
                                )}
                                to={to}
                              >
                                <Icon
                                  className={classNames(
                                    "drawer-link-icon",
                                    iconClassName,
                                  )}
                                />
                                <div className={classNames(textClassName)}>
                                  {title}
                                </div>
                              </Link>
                              {Component}
                            </li>
                          ),
                        )}
                    </ul>
                  </animated.nav>
                </animated.div>
              </ReactScrollLock>
            </FocusLock>
          ),
      )}
    </>
  );
};
