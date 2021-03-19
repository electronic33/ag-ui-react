import React, {
  useRef,
  useMemo,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import Link from "../Link/Link";
import classNames from "classnames";
import { Transition } from "@headlessui/react";
import FocusLock from "../FocusTrap/FocusTrap";
import config, { useTransition, animated } from "react-spring";

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
  direction = "right",
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

  const right = direction === "right" ? true : false;
  const left = direction === "left" ? true : false;
  // const top = direction === "top" ? true : false;
  // const bottom = direction === "bottom" ? true : false;

  const ref = useRef<HTMLDivElement>();

  useMemo(() => {
    function handleClickOutside(event) {
      if (isOpen && ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <FocusLock isDisabled={!isOpen}>
      <div
        className={classNames({
          // "hidden ": !isOpen,
          // "block ": !isOpen,
        })}
      >
        {/* <Transition
          show={isOpen}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition ease-in duration-300"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0 s"
          className="fixed top-0 left-0 z-10 w-screen h-full bg-black bg-opacity-40 "
        ></Transition> */}

        <nav
          ref={ref}
          className={classNames(
            "drawer z-20",
            {
              [`${alternate}-0 -${direction}-full duration-300 ${
                alternate === "left" && "w-full "
              }`]: !isOpen && direction,

              [`${alternate}-0 ${direction}-0 duration-200  ${
                alternate === "left" && "w-full "
              }`]: isOpen && direction,
              //////
              "h-auto": alternate === "left",
            },
            drawerClassNames,
          )}
        >
          <ul className="drawer-ul ">
            <li
              className={classNames("drawer-li-1", {
                "justify-start": left,
                "justify-end": right,
              })}
            >
              <button
                className={classNames("close-button-container", {
                  "ml-8": left,
                  "mr-8": right,
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
                      className={classNames("drawer-link-icon", iconClassNames)}
                    />
                    <div className={classNames(textClassNames)}>{title}</div>
                  </Link>
                  {Component && Component}
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </FocusLock>
  );
};

export default Drawer;