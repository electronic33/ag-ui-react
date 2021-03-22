import React from "react";
// import { useLocation } from "@reach/router";
import classNames from "classnames";
import { AiOutlineCalendar } from "react-icons/ai";
import { Link } from "@app-garage/link";

type navLinkType = {
  label: string;
  href: string;
  Icon: React.ComponentType;
}
type HamburgerProps = {
  isOpen: boolean;
  originalPath?: string;
  onHamburgerClick?: () => void;
  navLinks?: navLinkType[];
  restNavLinks?: navLinkType[];
  alwaysShowingLinks?: navLinkType[];
  href?: string;
  length?: unknown;
  LinkComponent?: React.ComponentType<{
    to: string;
    className?: string;
    onClick?: () => void;
  }>;
}

export const HamburgerMenu = ({
  isOpen,
  onHamburgerClick,
  navLinks,
  LinkComponent = Link,
}: HamburgerProps): React.ReactElement => {
  // const { pathname } = useLocation();
  const pathname = "path/name/";
  const exactPath = pathname.split("/").pop();
  const navLinksLength = navLinks.length;
  return (
    <div
      className={classNames(
        "1410:hidden bg-gray-50 flex justify-center fixed top-16 w-screen left-0 overflow-hidden transition-all duration-500",
        {
          "h-0": !isOpen,
          "h-screen": isOpen,
        },
      )}
    >
      <nav className="flex flex-shrink-0 flex-col items-center text-center w-full h-full overflow-y-auto">
        <div className="flex flex-col w-full items-center">
          <LinkComponent
            onClick={onHamburgerClick}
            to="/rezervare"
            className="flex flex-shrink-0 items-center justify-center text-2xl max-w-lg border bg-blue-600 text-gray-50 border-solid border-gray-500 rounded-md shadow px-6 py-3 mr-2 transition-color duration-700 hover:bg-blue-500 mb-5"
          >
            <AiOutlineCalendar className="mr-2 flex-shrink-0" />
            make_a_reservation
          </LinkComponent>
          <div className="flex flex-col items-center justify-center w-auto 640:flex-row 640:w-full">
            <div className="flex flex-col w-full 640:w-64">
              {navLinks.map(
                (
                  {
                    href,
                    label,
                    Icon,
                  }: {
                    href: string;
                    label: string;
                    Icon: React.ComponentType<{ className?: string }>;
                  },
                  index,
                ) => (
                  <div key={index} className="flex mr-5">
                    {index < 4 && (
                      <LinkComponent
                        key={href}
                        onClick={onHamburgerClick}
                        to={href}
                        className={classNames(
                          "flex flex-shrink-0 items-center text-2xl max-w-lg border-b border-solid border-gray-500 px-6 py-3 mr-2 transition-color duration-700 hover:text-blue-500 w-full",
                          {
                            "text-blue-500": exactPath === href.slice(1),
                            "640:mb-16 640:border-none":
                              index === navLinksLength - 5,
                          },
                        )}
                      >
                        <Icon className="mr-2" />
                        {label}
                      </LinkComponent>
                    )}
                  </div>
                ),
              )}
            </div>
            <div className="flex flex-col w-full 640:w-64">
              {navLinks.map(
                (
                  {
                    href,
                    label,
                    Icon,
                  }: {
                    href: string;
                    label: string;
                    Icon: React.ComponentType<{ className?: string }>;
                  },
                  index,
                ) => (
                  <div key={index} className="flex mr-5">
                    {index >= 4 && (
                      <LinkComponent
                        key={href}
                        onClick={onHamburgerClick}
                        to={href}
                        className={classNames(
                          "flex flex-shrink-0 items-center text-2xl max-w-lg border-b border-solid border-gray-500 px-6 py-3 mr-2 transition-color duration-700 hover:text-blue-500 w-full",
                          {
                            "text-blue-500": exactPath === href.slice(1),
                            "mb-16 border-none": index === navLinksLength - 1,
                          },
                        )}
                      >
                        <Icon className="mr-2" />
                        {label}
                      </LinkComponent>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

