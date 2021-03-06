import React, { useState } from 'react';
import classNames from 'classnames';
import { HamburgerMenu } from '@app-garage/hamburger-menu';
import { Link } from '@app-garage/link';

type NavLinkType = {
  label: string;
  href: string;
  Icon: React.ElementType<{ className?: string }>;
  className?: string;
};

type HeaderProps = {
  navLinks: NavLinkType[];
  restNavLinks?: NavLinkType[];
  alwaysShowingLinks?: NavLinkType[];
  hamburgerMenu?: {
    Icon: React.ElementType<{ className?: string }>;
    className?: string;
    text?: string;
    onClick?: () => void;
    to: string;
  };
  LogoComp?: { Icon: React.ElementType<{ className?: string }>; to: string };
  LinkComponent?: React.ElementType<{
    to: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
  }>;
  callToActionButton?: {
    text: string;
    to: string;
    Icon?: React.ElementType<{ className?: string }>;
    onClick?: () => void;
  };
};

export const Header = ({
  navLinks,
  restNavLinks,
  alwaysShowingLinks,
  LinkComponent = Link,
  LogoComp,
  callToActionButton,
  hamburgerMenu,
}: HeaderProps) => {
  const pathname = 'path/name/';
  const exactPath = pathname.split('/').pop();

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const onHamburgerClick = () => {
    setIsHamburgerOpen((prevState) => !prevState);
  };

  return (
    <header className="header flex items-center bg-gray-50 z-20 shadow-md top-0 fixed h-16 w-screen">
      <div
        className={classNames(
          'flex w-full items-center mx-4 640:mx-10',
          {
            'justify-between': LogoComp,
          },
          {
            'justify-end': !LogoComp,
          },
        )}
      >
        {LogoComp && (
          <LinkComponent to={LogoComp.to}>
            <LogoComp.Icon />
          </LinkComponent>
        )}

        <div className="flex ">
          <nav className="hidden 800:flex 800:items-center justify-end self-end mr-3">
            {alwaysShowingLinks?.map(({ href, Icon, label, className }) => (
              <LinkComponent
                key={href}
                to={href}
                className={classNames(
                  'flex items-center flex-shrink-0 justify-center text-lg px-1 py-3 mr-2 transition-color duration-500 hover:text-blue-500',
                  {
                    'text-blue-500': exactPath === href.slice(1),
                  },
                  className,
                )}
              >
                {Icon && <Icon className="mr-2" />}
                {label}
              </LinkComponent>
            ))}
            <div className="hidden 1410:flex">
              {restNavLinks?.map(({ href, Icon, label, className }) => (
                <LinkComponent
                  key={href}
                  to={href}
                  className={classNames(
                    'flex items-center flex-shrink-0 justify-center text-lg px-1 py-3 mr-2 transition-color duration-500 hover:text-blue-500',
                    {
                      'text-blue-500': exactPath === href.slice(1),
                    },
                    className,
                  )}
                >
                  {Icon && <Icon className="mr-2" />}
                  {label}
                </LinkComponent>
              ))}
            </div>
            {callToActionButton && (
              <LinkComponent
                to={callToActionButton.to}
                className="flex flex-shrink-0 items-center justify-center text-xl max-w-lg border bg-blue-600 text-gray-50 border-solid border-gray-500 rounded-md shadow px-3 py-2 transition-color duration-700 hover:bg-blue-500"
              >
                {callToActionButton.Icon && <callToActionButton.Icon className="mr-2" />}
                {callToActionButton.text}
              </LinkComponent>
            )}
          </nav>
          <HamburgerMenu
            isOpen={isHamburgerOpen}
            onHamburgerClick={onHamburgerClick}
            navLinks={navLinks}
          />
          {hamburgerMenu && (
            <button
              type="button"
              onClick={onHamburgerClick}
              style={{ height: 46 }}
              className={classNames(
                'relative self-center bg-gray-200 text-gray-800 flex-shrink-0 rounded-md flex justify-center items-center cursor-pointer transition-all duration-500 ease-in-out px-3 py-2 1410:hidden',
                hamburgerMenu.className,
              )}
            >
              <hamburgerMenu.Icon className="mr-2" />
              <span className="font-bold mr-4 text-xl">{hamburgerMenu.text}</span>
              <div
                className={classNames('hamburger', {
                  'hamburger-open': isHamburgerOpen,
                })}
              />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
