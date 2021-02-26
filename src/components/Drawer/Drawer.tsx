import React, { useRef, useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Link from "../Link/Link";
import classNames from "classnames";
import { Transition } from "@headlessui/react";

interface DrawerTypes {
  sidebarData?: {
    title?: string;
    to?: string;
    Icon?: React.ComponentType<{ className: string }>;
    Component?: React.ComponentType;
  }[];
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
    <div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-300"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
        className="fixed top-0  z-10 w-full h-full bg-black bg-opacity-40  "
      >
        {/* <div className={classNames("", {})}></div> */}
      </Transition>
      <nav
        ref={ref}
        className={classNames(
          "drawer z-20",
          {
            // "top-0 -left-full duration-300": !isOpen && left,
            // "top-0 -right-full duration-300": !isOpen && right,
            // "left-0 -top-full duration-300 w-full h-64": !isOpen && top,
            // "left-0 -bottom-full duration-300 w-full h-64": !isOpen && bottom,
            [`${alternate}-0 -${direction}-full duration-300 ${
              alternate === "left" && "w-full "
            }`]: !isOpen && direction,
            // "top-0 left-0 duration-200": isOpen && left,
            // "top-0 right-0 duration-200": isOpen && right,
            // "left-0 top-0 duration-200 w-full h-64": isOpen && top,
            // "left-0 bottom-0 duration-200 w-full h-64": isOpen && bottom,
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
            <div
              className={classNames("close-button-container", {
                "ml-8": left,
                "mr-8": right,
              })}
              onClick={() => setIsOpen((prevState) => !prevState)}
            >
              <AiOutlineClose />
            </div>
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
  );
};

export default Drawer;
